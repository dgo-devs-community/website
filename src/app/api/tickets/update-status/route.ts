import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

    // Enviar notificación por email al usuario (opcional)
    if (status === "paid") {
      try {
        await fetch(`${request.nextUrl.origin}/api/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: data.email,
            subject: `✅ Tu boleto ${data.code} ha sido aprobado - DgoTecHub Fest`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #059669;">✅ ¡Tu boleto ha sido aprobado!</h2>
                <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
                  <p>¡Hola <strong>${data.name}</strong>!</p>
                  <p>Tu boleto con código <strong>${data.code}</strong> ha sido verificado y aprobado.</p>
                  <p><strong>Estado:</strong> Pagado ✅</p>
                  <p><strong>Cantidad:</strong> ${data.quantity} persona(s)</p>
                  <p>Ya puedes usar tu boleto para ingresar al evento.</p>
                </div>
                <p>¡Nos vemos en DgoTecHub Fest!</p>
                <p style="color: #6b7280; font-size: 12px;">Si tienes dudas, contáctanos.</p>
              </div>
            `,
          }),
        });
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
