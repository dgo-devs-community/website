/**
 * Funciones de prueba para el sistema de boletos
 */
import {
  createTicket,
  getTicketByCode,
  useTicket as markTicketAsUsed,
  getAllTickets,
} from "./ticket-service";
import { TicketFormData } from "@/types/tickets";

/**
 * Probar creación de boleto sin comprobante
 */
export async function testCreateTicketWithoutReceipt() {
  console.log("🧪 Probando creación de boleto sin comprobante...");

  const formData: TicketFormData = {
    name: "Usuario Test",
    email: "test@example.com",
    quantity: 1,
    receipt: null,
  };

  try {
    const ticket = await createTicket(formData);
    console.log("✅ Boleto creado exitosamente:", ticket);
    return ticket;
  } catch (error) {
    console.error("❌ Error al crear boleto:", error);
    throw error;
  }
}

/**
 * Probar búsqueda de boleto por código
 */
export async function testGetTicketByCode(code: string) {
  console.log(`🧪 Probando búsqueda de boleto con código: ${code}...`);

  try {
    const ticket = await getTicketByCode(code);
    if (ticket) {
      console.log("✅ Boleto encontrado:", ticket);
    } else {
      console.log("ℹ️  Boleto no encontrado");
    }
    return ticket;
  } catch (error) {
    console.error("❌ Error al buscar boleto:", error);
    throw error;
  }
}

/**
 * Probar todas las funciones del sistema
 */
export async function runAllTests() {
  console.log("🚀 Iniciando pruebas del sistema de boletos...");

  try {
    // Prueba 1: Crear boleto
    const ticket = await testCreateTicketWithoutReceipt();

    // Prueba 2: Buscar boleto
    await testGetTicketByCode(ticket.code);

    // Prueba 3: Obtener todos los boletos
    console.log("🧪 Probando obtención de todos los boletos...");
    const allTickets = await getAllTickets();
    console.log(`✅ Se encontraron ${allTickets.length} boletos`);

    // Prueba 4: Marcar como usado
    console.log("🧪 Probando marcar boleto como usado...");
    await markTicketAsUsed(ticket.code);
    console.log("✅ Boleto marcado como usado");

    // Verificar estado final
    const finalTicket = await getTicketByCode(ticket.code);
    console.log("✅ Estado final del boleto:", finalTicket?.status);

    console.log("🎉 Todas las pruebas completadas exitosamente!");
  } catch (error) {
    console.error("❌ Error en las pruebas:", error);
    throw error;
  }
}

// Función para ejecutar desde la consola del navegador
if (typeof window !== "undefined") {
  interface WindowWithTests extends Window {
    testTicketSystem: typeof runAllTests;
    testCreateTicket: typeof testCreateTicketWithoutReceipt;
    testGetTicket: typeof testGetTicketByCode;
  }

  const windowWithTests = window as unknown as WindowWithTests;
  windowWithTests.testTicketSystem = runAllTests;
  windowWithTests.testCreateTicket = testCreateTicketWithoutReceipt;
  windowWithTests.testGetTicket = testGetTicketByCode;
}
