import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Ticket } from "@/types/tickets";

async function sendDownloadLinkEmail(ticket: Ticket): Promise<void> {
  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/download-ticket/${ticket.code}`;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: ticket.email,
          subject: `🎫 Descarga tu boleto - ${ticket.code}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0; font-size: 24px;">🎫 Tu Boleto DgoTecHub</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 20px 0;">
                <h2 style="margin: 0 0 10px 0; font-size: 20px;">¡Hola ${ticket.name}!</h2>
                <p style="margin: 0; opacity: 0.9;">Aquí tienes tu boleto para descargar</p>
              </div>

              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Código del boleto:</strong> <span style="font-family: monospace; background-color: #e2e8f0; padding: 4px 8px; border-radius: 4px;">${ticket.code}</span></p>
                <p style="margin: 0 0 10px 0;"><strong>Cantidad:</strong> ${ticket.quantity} ${ticket.quantity === 1 ? "boleto" : "boletos"}</p>
                <p style="margin: 0 0 10px 0;"><strong>Estado:</strong> <span style="color: ${ticket.status === "paid" ? "#16a34a" : ticket.status === "pending" ? "#ea580c" : "#6b7280"};">${
                  ticket.status === "paid"
                    ? "✅ Pagado"
                    : ticket.status === "pending"
                      ? "⏳ Pendiente"
                      : ticket.status === "used"
                        ? "🎫 Usado"
                        : "❌ Cancelado"
                }</span></p>
              </div>

              ${
                ticket.status === "paid"
                  ? `
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${downloadUrl}" 
                     style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                    🎫 Descargar Mi Boleto
                  </a>
                </div>
                
                <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #065f46; font-size: 14px;">
                    <strong>💡 Importante:</strong> Guarda este enlace. Podrás usarlo siempre que necesites descargar tu boleto nuevamente.
                  </p>
                </div>
              `
                  : `
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #92400e; font-size: 14px;">
                    <strong>⏳ Tu boleto está en revisión</strong><br>
                    Una vez que confirmemos tu pago, podrás descargarlo usando este mismo enlace.
                  </p>
                </div>
              `
              }

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                  ¿Perdiste este email? Puedes solicitar el enlace nuevamente en:
                </p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/download-ticket" 
                   style="color: #3b82f6; text-decoration: none; font-size: 14px;">
                  Recuperar mi boleto
                </a>
              </div>

              <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                  DgoTecHub - El evento tech más innovador de Durango<br>
                  Si tienes problemas, contáctanos en dgotechub@gmail.com
                </p>
              </div>
            </div>
          </div>
        `,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error sending download link email");
    }
  } catch (error) {
    console.error("Error sending download link email:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Buscar tickets por email - SOLO los que estén pagados
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("status", "paid")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error searching tickets:", error);
      return NextResponse.json(
        { error: "Error al buscar boletos" },
        { status: 500 }
      );
    }

    if (!tickets || tickets.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron boletos pagados asociados a este email" },
        { status: 404 }
      );
    }

    // Enviar email con los enlaces de descarga para cada ticket PAGADO
    for (const ticket of tickets) {
      await sendDownloadLinkEmail(ticket);
    }

    return NextResponse.json({
      success: true,
      message: `Se enviaron ${tickets.length} ${tickets.length === 1 ? "enlace de descarga" : "enlaces de descarga"} a ${email}`,
      ticketCount: tickets.length,
    });
  } catch (error) {
    console.error("Error sending download links:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
