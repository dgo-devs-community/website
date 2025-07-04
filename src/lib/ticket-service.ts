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
    const response = await fetch("/api/send-email", {
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

    if (!response.ok) {
      console.error("Error sending email notification");
    }
  } catch (error) {
    console.error("Error sending ticket notification:", error);
    // No queremos que el error de email rompa la creación del ticket
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
