import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendTicketApprovedNotification } from "@/lib/ticket-service";

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    // Validar datos
    if (!id || !status) {
      return NextResponse.json(
        { error: "Faltan datos requeridos (id, status)" },
        { status: 400 }
      );
    }

    // Validar que el status es válido
    const validStatuses = ["pending", "paid", "used", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Estado inválido. Debe ser: pending, paid, used, o cancelled",
        },
        { status: 400 }
      );
    }

    // Actualizar el boleto
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating ticket:", error);
      return NextResponse.json(
        { error: "Error al actualizar boleto" },
        { status: 500 }
      );
    }

    // Enviar notificación por email al usuario cuando se aprueba
    if (status === "paid") {
      try {
        await sendTicketApprovedNotification(data);
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
        // No fallar la actualización si el email falla
      }
    }

    return NextResponse.json({
      success: true,
      data,
      message: `Boleto actualizado a estado: ${status}`,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
