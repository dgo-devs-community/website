"use client";

import { useState, useRef } from "react";
import { Ticket } from "@/types/tickets";
import FuturisticTicket from "./FuturisticTicket";
import {
  downloadFuturisticTicket,
  shareFuturisticTicket,
} from "@/lib/futuristic-ticket-generator";
import { Download, Share2, Eye, EyeOff } from "lucide-react";

interface FuturisticTicketPreviewProps {
  ticket: Ticket;
}

export default function FuturisticTicketPreview({
  ticket,
}: FuturisticTicketPreviewProps) {
  const [showQR, setShowQR] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);
    try {
      await downloadFuturisticTicket(ticketRef.current, ticket);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Error al descargar el boleto. Por favor intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!ticketRef.current) return;

    setIsSharing(true);
    try {
      await shareFuturisticTicket(ticketRef.current, ticket);
    } catch (error) {
      console.error("Error sharing ticket:", error);
      alert("Error al compartir el boleto. Por favor intenta de nuevo.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Ticket Display */}
      <div className="flex justify-center mb-6">
        <FuturisticTicket ref={ticketRef} ticket={ticket} showQR={showQR} />
      </div>

      {/* Controls */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">Mostrar código QR</span>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
          >
            {showQR ? <EyeOff size={16} /> : <Eye size={16} />}
            {showQR ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-medium"
          >
            <Download size={16} />
            {isDownloading ? "Descargando..." : "Descargar"}
          </button>

          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-medium"
          >
            <Share2 size={16} />
            {isSharing ? "Compartiendo..." : "Compartir"}
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>✨ Diseño futurista para tu evento tech</p>
          <p>🎫 Boleto #{ticket.code}</p>
        </div>
      </div>
    </div>
  );
}
