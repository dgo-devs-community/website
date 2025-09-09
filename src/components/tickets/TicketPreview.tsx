"use client";

import React from "react";
import { Ticket } from "@/types/tickets";
import { partyConfig } from "@/lib/party-config";

interface TicketPreviewProps {
  ticket: Ticket;
}

export default function TicketPreview({ ticket }: TicketPreviewProps) {
  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 rounded-2xl p-6 text-white shadow-2xl border border-purple-500/30">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-sm text-cyan-300 mb-1">DgoTecHub</div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          {partyConfig.name}
        </h2>
        <div className="text-sm text-gray-300">{partyConfig.date}</div>
      </div>

      {/* Ticket Info */}
      <div className="space-y-4 mb-6">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">NOMBRE</div>
          <div className="font-bold text-lg">{ticket.name}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">CÓDIGO</div>
            <div className="font-mono font-bold text-cyan-300">
              {ticket.code}
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">CANTIDAD</div>
            <div className="font-bold">{ticket.quantity}</div>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">ESTADO</div>
          <div
            className={`font-bold text-sm ${
              ticket.status === "paid"
                ? "text-green-400"
                : ticket.status === "pending"
                  ? "text-yellow-400"
                  : ticket.status === "used"
                    ? "text-blue-400"
                    : "text-red-400"
            }`}
          >
            {ticket.status === "paid"
              ? "✅ PAGADO"
              : ticket.status === "pending"
                ? "⏳ PENDIENTE"
                : ticket.status === "used"
                  ? "🎫 USADO"
                  : "❌ CANCELADO"}
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">UBICACIÓN</div>
          <div className="text-sm">{partyConfig.location}</div>
        </div>
      </div>

      {/* QR Code Area */}
      <div className="text-center bg-white rounded-lg p-4 mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
          <span className="text-gray-500 text-xs">QR Code</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">Código: {ticket.code}</div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400">
        <div>DgoTecHub Fest 2025</div>
        <div>El evento tech más innovador de Durango</div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
      <div className="absolute top-1/2 left-0 w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
      <div className="absolute top-1/2 right-0 w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500"></div>
    </div>
  );
}
