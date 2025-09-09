import { NextRequest, NextResponse } from "next/server";
import { getTicketByCode } from "@/lib/ticket-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Código de boleto requerido" },
        { status: 400 }
      );
    }

    // Buscar el ticket por código
    const ticket = await getTicketByCode(code);

    if (!ticket) {
      return NextResponse.json(
        { error: "Boleto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket: ticket,
    });
  } catch (error) {
    console.error("Error getting ticket for download:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
