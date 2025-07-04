import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializar Resend con la API key del ambiente
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    // Validar datos requeridos
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Faltan datos requeridos (to, subject, html)" },
        { status: 400 }
      );
    }

    // Validar que tengamos la API key
    if (!process.env.RESEND_API_KEY) {
      console.log(
        "⚠️ RESEND_API_KEY no configurada, solo loguearemos el email"
      );
      console.log("📧 Email que se enviaría:", {
        to,
        subject,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Email logueado (RESEND_API_KEY no configurada)",
        logged: true,
      });
    }

    try {
      // Enviar email usando Resend
      const data = await resend.emails.send({
        from: "DgoTecHub <notificaciones@dgotechub.org>", // Cambiar por tu dominio verificado
        to: [to],
        subject: subject,
        html: html,
      });

      console.log("✅ Email enviado exitosamente:", data);

      return NextResponse.json({
        success: true,
        message: "Email enviado correctamente",
        data: data,
      });
    } catch (resendError: unknown) {
      console.error("❌ Error de Resend:", resendError);

      // Si Resend falla, al menos logueamos el email
      console.log("📧 Fallback - Email que se intentó enviar:", {
        to,
        subject,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Email logueado (error en Resend)",
        logged: true,
        error:
          resendError instanceof Error
            ? resendError.message
            : "Error desconocido",
      });
    }
  } catch (error) {
    console.error("Error general sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar email" },
      { status: 500 }
    );
  }
}
