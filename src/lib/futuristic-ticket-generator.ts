import { Ticket } from "@/types/tickets";
import html2canvas from "html2canvas-pro";

// Función auxiliar para generar imagen usando html2canvas pro
const generateFuturisticTicketImage = async (
  ticketElement: HTMLElement
): Promise<string> => {
  try {
    // Configurar opciones para html2canvas-pro
    const canvas = await html2canvas(ticketElement, {
      backgroundColor: "transparent",
      // scale: 2, // Mayor resolución
      // useCORS: true,
      // allowTaint: true,
      // logging: false,
      // width: ticketElement.offsetWidth,
      // height: ticketElement.offsetHeight,
      // // Opciones específicas de html2canvas-pro
      // removeContainer: true,
      // ignoreElements: (element) => {
      //   // Ignorar elementos que podrían causar problemas
      //   return element.classList?.contains("ignore-screenshot") || false;
      // },
    });

    // Convertir canvas a data URL con alta calidad
    return canvas.toDataURL("image/png", 1.0);
  } catch (error) {
    console.error("Error generating ticket image:", error);
    throw new Error("No se pudo generar la imagen del boleto");
  }
};

// Método principal para descargar boleto
export const downloadFuturisticTicket = async (
  ticketElement: HTMLElement,
  ticket: Ticket
): Promise<void> => {
  try {
    // Generar la imagen del boleto usando html2canvas-pro
    const imageDataUrl = await generateFuturisticTicketImage(ticketElement);

    // Crear un enlace de descarga temporal
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `DgoTecHub-Ticket-${ticket.code}.png`;
    link.style.display = "none";

    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Boleto ${ticket.code} descargado exitosamente`);
  } catch (error) {
    console.error("Error downloading ticket:", error);
    throw new Error("No se pudo descargar el boleto");
  }
};

// Función para compartir el boleto
export const shareFuturisticTicket = async (
  ticketElement: HTMLElement,
  ticket: Ticket
): Promise<void> => {
  try {
    const imageDataUrl = await generateFuturisticTicketImage(ticketElement);

    // Convertir data URL a blob
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    if (navigator.share && navigator.canShare) {
      const file = new File([blob], `DgoTecHub-Ticket-${ticket.code}.png`, {
        type: "image/png",
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Mi boleto para DgoTecHub Fest 2025",
          text: "¡Mira mi boleto futurista para el evento más tech de Durango!",
          files: [file],
        });
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        alert("¡Boleto copiado al portapapeles!");
      }
    } else {
      // Fallback: descargar
      await downloadFuturisticTicket(ticketElement, ticket);
    }
  } catch (error) {
    console.error("Error sharing ticket:", error);
    throw new Error("Error al compartir el boleto");
  }
};
