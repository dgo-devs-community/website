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
        status: "pending",
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

    // Si hay comprobante, subirlo
    if (formData.receipt) {
      receiptUrl = await uploadReceipt(formData.receipt, ticketData.code);

      // Actualizar el boleto con la URL del comprobante y marcar como pagado
      const { error: updateError } = await supabase
        .from("tickets")
        .update({
          receipt_url: receiptUrl,
          status: "paid",
        })
        .eq("id", ticketData.id);

      if (updateError) {
        throw new Error(`Error al actualizar boleto: ${updateError.message}`);
      }
    }

    return {
      ...ticketData,
      receipt_url: receiptUrl,
      status: formData.receipt ? "paid" : "pending",
    };
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
