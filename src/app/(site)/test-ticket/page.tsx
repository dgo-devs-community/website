"use client";

import { useState } from "react";
import FuturisticTicket from "@/components/tickets/FuturisticTicket";
import FuturisticTicketPreview from "@/components/tickets/FuturisticTicketPreview";
import { Ticket } from "@/types/tickets";

export default function TestTicketPage() {
  const [selectedOption, setSelectedOption] = useState<"simple" | "preview">(
    "simple"
  );

  // Ticket de prueba
  const testTicket: Ticket = {
    id: "test-123",
    code: "DGOTEC-2025-001",
    name: "Juan Pérez",
    email: "juan@example.com",
    quantity: 2,
    status: "paid",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Boleto Futurista - DgoTecHub Fest 2025
          </h1>
          <p className="text-gray-400 text-lg">
            Inspirado en el diseño que compartiste - ¡Completamente
            personalizado para tu evento!
          </p>
        </div>

        {/* Selector de vista */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedOption("simple")}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedOption === "simple"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Vista Simple
            </button>
            <button
              onClick={() => setSelectedOption("preview")}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedOption === "preview"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Vista Completa
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex justify-center">
          {selectedOption === "simple" ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Boleto Simple
                </h3>
                <p className="text-gray-400">Solo el diseño del boleto</p>
              </div>
              <FuturisticTicket ticket={testTicket} showQR={true} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Vista Completa
                </h3>
                <p className="text-gray-400">
                  Con controles de descarga y compartir
                </p>
              </div>
              <FuturisticTicketPreview ticket={testTicket} />
            </div>
          )}
        </div>

        {/* Información del diseño */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              ✨ Características del Diseño
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  🎨 Efectos Visuales
                </h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Efectos de aurora/nebula animados</li>
                  <li>• Texto con brillo neón</li>
                  <li>• Bordes holográficos</li>
                  <li>• Animaciones de partículas</li>
                  <li>• Efectos de escaneo cyber</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  🔧 Funcionalidades
                </h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Generación de QR code</li>
                  <li>• Descarga en alta calidad</li>
                  <li>• Compartir nativo</li>
                  <li>• Responsive design</li>
                  <li>• Datos del evento dinámicos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
