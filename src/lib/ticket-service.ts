import { supabase } from "@/lib/supabase";
import { Ticket, TicketFormData } from "@/types/tickets";

/**
 * Subir comprobante de pago a Supabase Storage
 */
export async function uploadReceipt(
  file: File,
  ticketCode: string
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${ticketCode}-${Date.now()}.${fileExt}`;
  const filePath = `receipts/${fileName}`;

  const { error } = await supabase.storage
    .from("comprobantes")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Error al subir comprobante: ${error.message}`);
  }

  // Obtener URL pública del archivo
  const {
    data: { publicUrl },
  } = supabase.storage.from("comprobantes").getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Generar código único para el boleto
 */
async function generateUniqueCode(): Promise<string> {
  const generateCode = () => {
    // Generar código de 8 caracteres alfanuméricos
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Intentar hasta 5 veces para encontrar un código único
  for (let i = 0; i < 5; i++) {
    const code = generateCode();

    // Verificar si el código ya existe
    const { data: existingTicket } = await supabase
      .from("tickets")
      .select("id")
      .eq("code", code)
      .single();

    if (!existingTicket) {
      return code;
    }
  }

  throw new Error("No se pudo generar un código único");
}

/**
 * Enviar notificación de nuevo boleto por email
 */
async function sendTicketNotification(ticket: Ticket): Promise<void> {
  try {
    // Email para el administrador (notificación interna)
    const adminResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "dgotechub@gmail.com",
        subject: `🎫 Nuevo boleto generado - ${ticket.code}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🎫 Nuevo Boleto Generado</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Código:</strong> ${ticket.code}</p>
              <p><strong>Nombre:</strong> ${ticket.name}</p>
              <p><strong>Email:</strong> ${ticket.email}</p>
              <p><strong>Cantidad:</strong> ${ticket.quantity}</p>
              <p><strong>Estado:</strong> ${ticket.status}</p>
              <p><strong>Fecha:</strong> ${new Date(ticket.created_at).toLocaleString()}</p>
              ${ticket.receipt_url ? `<p><strong>Comprobante:</strong> <a href="${ticket.receipt_url}" target="_blank">Ver comprobante</a></p>` : ""}
            </div>
            <p>Revisa la transferencia y cambia el estado del boleto en el panel de administración.</p>
          </div>
        `,
      }),
    });

    if (!adminResponse.ok) {
      console.error("Error sending admin email notification");
    }

    // Email para el usuario con información del boleto y link de descarga
    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/download-ticket/${ticket.code}`;

    const userResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ticket.email,
        subject: `🎫 Tu boleto DgoTecHub - ${ticket.code}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0; font-size: 24px;">🎫 ¡Gracias por tu compra!</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 20px 0;">
                <h2 style="margin: 0 0 10px 0; font-size: 20px;">¡Hola ${ticket.name}!</h2>
                <p style="margin: 0; opacity: 0.9;">Tu boleto ha sido registrado exitosamente</p>
              </div>

              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Código del boleto:</strong> <span style="font-family: monospace; background-color: #e2e8f0; padding: 4px 8px; border-radius: 4px;">${ticket.code}</span></p>
                <p style="margin: 0 0 10px 0;"><strong>Cantidad:</strong> ${ticket.quantity} ${ticket.quantity === 1 ? "boleto" : "boletos"}</p>
                <p style="margin: 0 0 10px 0;"><strong>Estado:</strong> <span style="color: #ea580c;">⏳ Pendiente de revisión</span></p>
              </div>

              <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>📋 Próximos pasos:</strong><br>
                  1. Estamos revisando tu comprobante de pago<br>
                  2. Una vez confirmado, recibirás otro email<br>
                  3. Podrás descargar tu boleto usando el enlace de abajo
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${downloadUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);">
                  🎫 Ver Estado del Boleto
                </a>
              </div>
              
              <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                  <strong>💡 Importante:</strong> Guarda este enlace. Una vez que aprobemos tu pago, podrás descargar tu boleto las veces que necesites.
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                  ¿Perdiste este email? Puedes recuperar tu boleto en:
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
    });

    if (!userResponse.ok) {
      console.error("Error sending user email notification");
    }
  } catch (error) {
    console.error("Error sending ticket notification:", error);
    // No queremos que el error de email rompa la creación del ticket
  }
}

/**
 * Enviar email de confirmación cuando un boleto es aprobado
 */
export async function sendTicketApprovedNotification(
  ticket: Ticket
): Promise<void> {
  try {
    const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/download-ticket/${ticket.code}`;

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ticket.email,
        subject: `🎉 ¡Tu boleto está listo! - ${ticket.code}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #059669; margin: 0; font-size: 24px;">🎉 ¡Tu boleto está aprobado!</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 20px 0;">
                <h2 style="margin: 0 0 10px 0; font-size: 20px;">¡Hola ${ticket.name}!</h2>
                <p style="margin: 0; opacity: 0.9;">Tu pago ha sido confirmado y tu boleto está listo para descargar</p>
              </div>

              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Código del boleto:</strong> <span style="font-family: monospace; background-color: #e2e8f0; padding: 4px 8px; border-radius: 4px;">${ticket.code}</span></p>
                <p style="margin: 0 0 10px 0;"><strong>Cantidad:</strong> ${ticket.quantity} ${ticket.quantity === 1 ? "boleto" : "boletos"}</p>
                <p style="margin: 0 0 10px 0;"><strong>Estado:</strong> <span style="color: #16a34a;">✅ Pagado y aprobado</span></p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${downloadUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                  🎫 Descargar Mi Boleto
                </a>
              </div>
              
              <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                  <strong>💡 Recuerda:</strong> 
                  <br>• Puedes descargar tu boleto las veces que necesites
                  <br>• Guarda este enlace en tus marcadores
                  <br>• Lleva tu boleto (impreso o digital) el día del evento
                  <br>• El código ${ticket.code} es único e intransferible
                </p>
              </div>

              <div style="background-color: #dbeafe; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  <strong>📅 Información del evento:</strong><br>
                  DgoTecHub Fest 2025 - El evento tech más innovador de Durango<br>
                  ¡Nos vemos pronto!
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                  ¿Necesitas ayuda? Contáctanos en:
                </p>
                <a href="mailto:dgotechub@gmail.com" 
                   style="color: #3b82f6; text-decoration: none; font-size: 14px;">
                  dgotechub@gmail.com
                </a>
              </div>

              <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                  DgoTecHub - El evento tech más innovador de Durango<br>
                  Gracias por ser parte de nuestra comunidad tech
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error("Error sending ticket approved email notification");
    }
  } catch (error) {
    console.error("Error sending ticket approved notification:", error);
    // No queremos que el error de email rompa la actualización del ticket
  }
}

/**
 * Crear un nuevo boleto en la base de datos
 */
export async function createTicket(formData: TicketFormData): Promise<Ticket> {
  try {
    // Generar código único
    const uniqueCode = await generateUniqueCode();

    // Primero crear el registro para obtener el código
    const { data: ticketData, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        name: formData.name,
        email: formData.email,
        quantity: formData.quantity,
        status: "pending", // SIEMPRE pending hasta revisión manual
        code: uniqueCode,
      })
      .select()
      .single();

    if (ticketError) {
      throw new Error(`Error al crear boleto: ${ticketError.message}`);
    }

    // Verificar que el código fue generado
    if (!ticketData.code) {
      throw new Error("No se pudo generar el código del boleto");
    }

    let receiptUrl = "";

    // Si hay comprobante, subirlo PERO mantener estado pending
    if (formData.receipt) {
      receiptUrl = await uploadReceipt(formData.receipt, ticketData.code);

      // Actualizar el boleto con la URL del comprobante PERO mantener pending
      const { error: updateError } = await supabase
        .from("tickets")
        .update({
          receipt_url: receiptUrl,
          // NO cambiar status aquí - se mantiene pending
        })
        .eq("id", ticketData.id);

      if (updateError) {
        throw new Error(`Error al actualizar boleto: ${updateError.message}`);
      }
    }

    const finalTicket = {
      ...ticketData,
      receipt_url: receiptUrl,
      status: "pending", // SIEMPRE pending
    };

    // Enviar notificación por email (sin bloquear si falla)
    sendTicketNotification(finalTicket).catch(console.error);

    return finalTicket;
  } catch (error) {
    console.error("Error in createTicket:", error);
    throw error;
  }
}

/**
 * Obtener un boleto por código
 */
export async function getTicketByCode(code: string): Promise<Ticket | null> {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No encontrado
    }
    throw new Error(`Error al buscar boleto: ${error.message}`);
  }

  return data;
}

/**
 * Marcar boleto como usado
 */
export async function useTicket(code: string): Promise<boolean> {
  const { error } = await supabase
    .from("tickets")
    .update({ status: "used" })
    .eq("code", code.toUpperCase())
    .eq("status", "paid");

  if (error) {
    throw new Error(`Error al marcar boleto como usado: ${error.message}`);
  }

  return true;
}

/**
 * Obtener todos los boletos (para administración)
 */
export async function getAllTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener boletos: ${error.message}`);
  }

  return data || [];
}

/**
 * Actualizar el estado de un boleto (para administración)
 */
export async function updateTicketStatus(
  id: string,
  status: "pending" | "paid" | "used" | "cancelled"
): Promise<Ticket> {
  try {
    const response = await fetch("/api/tickets/update-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al actualizar boleto");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error updating ticket status:", error);
    throw error;
  }
}
