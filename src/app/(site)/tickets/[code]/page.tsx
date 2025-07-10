"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Ticket } from "@/types/tickets";
import FuturisticTicket from "@/components/tickets/FuturisticTicket";
import {
  downloadFuturisticTicket,
  shareFuturisticTicket,
} from "@/lib/futuristic-ticket-generator";
import { Button } from "@/components/ui/button";

export default function TicketViewPage() {
  const params = useParams();
  const code = params.code as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const fetchTicket = useCallback(async () => {
    try {
      const response = await fetch(`/api/tickets/download/${code}`);
      const data = await response.json();

      if (response.ok) {
        setTicket(data.ticket);
      } else {
        setError(data.error || "Error al cargar el boleto");
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (code) {
      fetchTicket();
    }
  }, [code, fetchTicket]);

  const handleDownload = async () => {
    if (!ticket) return;

    setIsDownloading(true);
    try {
      const ticketElement = document.getElementById("futuristic-ticket");
      if (ticketElement) {
        await downloadFuturisticTicket(ticketElement, ticket);
      }
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Error al descargar el boleto. Intenta nuevamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!ticket) return;

    setIsSharing(true);
    try {
      const ticketElement = document.getElementById("futuristic-ticket");
      if (ticketElement) {
        await shareFuturisticTicket(ticketElement, ticket);
      }
    } catch (error) {
      console.error("Error sharing ticket:", error);
      alert("Error al compartir el boleto. Intenta nuevamente.");
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Cargando boleto...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-red-400 mb-4">❌ Error</h1>
          <p className="text-gray-300 mb-6">
            {error || "Boleto no encontrado"}
          </p>
          <Button
            onClick={() => window.close()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  if (ticket.status !== "paid") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <h1 className="text-2xl font-bold text-orange-400 mb-4">
            ⏳ Boleto Pendiente
          </h1>
          <p className="text-gray-300 mb-6">
            Este boleto no está disponible para descarga porque aún no ha sido
            aprobado.
          </p>
          <Button
            onClick={() => window.close()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con acciones */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">🎫 Tu Boleto DgoTecHub</h1>
          <p className="text-gray-300 mb-6">
            Código:{" "}
            <span className="font-mono font-bold text-cyan-400">
              {ticket.code}
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isDownloading ? "Descargando..." : "📱 Descargar Boleto"}
            </Button>

            <Button
              onClick={handleShare}
              disabled={isSharing}
              variant="outline"
              className="border-gray-400 text-gray-300 hover:bg-gray-700"
            >
              {isSharing ? "Compartiendo..." : "📤 Compartir"}
            </Button>

            <Button
              onClick={() => window.close()}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              ✕ Cerrar
            </Button>
          </div>
        </div>

        {/* Ticket */}
        <div className="flex justify-center">
          <div id="futuristic-ticket">
            <FuturisticTicket ticket={ticket} />
          </div>
        </div>

        {/* Footer con instrucciones */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>
            💡 Haz clic en &ldquo;Descargar Boleto&rdquo; para guardar una
            imagen en tu dispositivo
          </p>
          <p className="mt-2">
            📱 También puedes hacer captura de pantalla a este boleto
          </p>
        </div>
      </div>
    </div>
  );
}
