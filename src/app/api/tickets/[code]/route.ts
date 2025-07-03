import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { action } = await request.json();

    if (action === "use") {
      // Marcar boleto como usado
      const { data, error } = await supabaseAdmin
        .from("tickets")
        .update({ status: "used" })
        .eq("code", params.code.toUpperCase())
        .eq("status", "paid")
        .select()
        .single();

      if (error) {
        console.error("Error updating ticket:", error);
        return NextResponse.json(
          { error: "Error al marcar boleto como usado" },
          { status: 500 }
        );
      }

      if (!data) {
        return NextResponse.json(
          { error: "Boleto no válido o ya usado" },
          { status: 400 }
        );
      }

      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
