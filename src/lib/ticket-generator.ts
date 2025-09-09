import QRCode from "qrcode";
import { Ticket } from "@/types/tickets";
import { partyConfig } from "@/lib/party-config";

/**
 * Generar imagen de boleto como canvas (LEGACY - Ahora se usa FuturisticTicket)
 * @deprecated Usa downloadFuturisticTicket desde futuristic-ticket-generator.ts
 */
export async function generateTicketImage(ticket: Ticket): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("No se pudo crear el contexto del canvas"));
      return;
    }

    // Configurar dimensiones del boleto
    canvas.width = 800;
    canvas.height = 600;

    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1e3a8a"); // blue-800
    gradient.addColorStop(1, "#312e81"); // purple-800
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Configurar texto
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    // Título del evento
    ctx.font = "bold 36px Arial";
    ctx.fillText(partyConfig.name, canvas.width / 2, 80);

    // Detalles del evento
    ctx.font = "24px Arial";
    ctx.fillText(partyConfig.date, canvas.width / 2, 130);
    ctx.fillText(partyConfig.time, canvas.width / 2, 160);
    ctx.fillText(partyConfig.location, canvas.width / 2, 190);

    // Información del boleto
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Boleto: ${ticket.code}`, canvas.width / 2, 250);

    ctx.font = "20px Arial";
    ctx.fillText(`Titular: ${ticket.name}`, canvas.width / 2, 290);
    ctx.fillText(
      `Cantidad: ${ticket.quantity} ${
        ticket.quantity === 1 ? "boleto" : "boletos"
      }`,
      canvas.width / 2,
      320
    );

    // Generar QR Code
    QRCode.toCanvas(
      ticket.code,
      {
        width: 150,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      (error, qrCanvas) => {
        if (error) {
          reject(error);
          return;
        }

        // Añadir QR al boleto
        const qrX = (canvas.width - 150) / 2;
        const qrY = 370;

        // Fondo blanco para el QR
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(qrX - 10, qrY - 10, 170, 170);

        // Dibujar QR
        ctx.drawImage(qrCanvas, qrX, qrY, 150, 150);

        // Texto del QR
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.fillText("Escanea este código en el evento", canvas.width / 2, 560);

        // Convertir a data URL
        resolve(canvas.toDataURL("image/png"));
      }
    );
  });
}

/**
 * Descargar imagen del boleto
 */
export function downloadTicketImage(imageDataUrl: string, ticketCode: string) {
  const link = document.createElement("a");
  link.download = `boleto-${ticketCode}.png`;
  link.href = imageDataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Compartir boleto en redes sociales
 */
export function shareTicket() {
  const shareText = `¡Conseguí mi boleto para ${partyConfig.name}! 🎉\n${partyConfig.date} - ${partyConfig.time}\n${partyConfig.location}`;

  // Detectar si es móvil para usar Web Share API
  if (navigator.share) {
    navigator.share({
      title: partyConfig.name,
      text: shareText,
      url: window.location.origin,
    });
  } else {
    // Fallback para desktop
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.origin
      )}&quote=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    };

    return urls;
  }
}
