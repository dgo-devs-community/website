"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Ticket } from "@/types/tickets";
import FuturisticTicket from "@/components/tickets/FuturisticTicket";
import { shareFuturisticTicket } from "@/lib/futuristic-ticket-generator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DownloadTicketByCodePage() {
  const params = useParams();
  const code = params.code as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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

    // Abrir el ticket completo en una nueva ventana para descarga
    const ticketUrl = `/tickets/${ticket.code}`;
    window.open(ticketUrl, "_blank");
  };

  const handleShare = async () => {
    if (!ticket) return;

    setIsSharing(true);
    try {
      const ticketElement = document.getElementById("ticket-preview");
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando boleto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button
              onClick={() => (window.location.href = "/download-ticket")}
              className="w-full"
            >
              🔄 Intentar de Nuevo
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              🎫 Boleto no encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              No se pudo encontrar el boleto con el código proporcionado.
            </p>
            <Button
              onClick={() => (window.location.href = "/download-ticket")}
              className="w-full"
            >
              🔍 Buscar mi Boleto
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (ticket.status !== "paid") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-6 text-center">
            <h1 className="text-2xl font-bold text-orange-600 mb-4">
              ⏳ Boleto Pendiente
            </h1>
            <div className="space-y-4 text-left">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Código:</strong> {ticket.code}
                </p>
                <p>
                  <strong>Nombre:</strong> {ticket.name}
                </p>
                <p>
                  <strong>Estado:</strong>
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                    {ticket.status === "pending"
                      ? "Pendiente de revisión"
                      : ticket.status === "cancelled"
                        ? "Cancelado"
                        : "Usado"}
                  </span>
                </p>
              </div>
              <p className="text-gray-600 text-center">
                {ticket.status === "pending"
                  ? "Tu boleto está en proceso de verificación. Una vez que confirmemos tu pago, podrás descargarlo."
                  : "Este boleto no está disponible para descarga."}
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/tickets")}
              className="w-full mt-6"
            >
              🎫 Comprar Nuevo Boleto
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎫 Tu Boleto DgoTecHub
          </h1>
          <p className="text-gray-600">
            Código: <span className="font-mono font-bold">{ticket.code}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview del boleto */}
          <div className="order-2 lg:order-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Vista Previa</h2>
              <div
                id="ticket-preview"
                className="bg-white rounded-lg flex justify-center"
              >
                <FuturisticTicket ticket={ticket} />
              </div>
            </Card>
          </div>

          {/* Información y acciones */}
          <div className="order-1 lg:order-2">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Información del Boleto</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium">{ticket.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{ticket.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cantidad:</span>
                  <span className="font-medium">{ticket.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    ✅ Pagado
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Acciones</h2>
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  📱 Descargar Boleto
                </Button>

                <Button
                  onClick={handleShare}
                  disabled={isSharing}
                  variant="outline"
                  className="w-full"
                >
                  {isSharing ? "Compartiendo..." : "📤 Compartir Boleto"}
                </Button>

                <Button
                  onClick={() => (window.location.href = "/download-ticket")}
                  variant="ghost"
                  className="w-full"
                >
                  🔍 Buscar Otro Boleto
                </Button>
              </div>
            </Card>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Consejo:</strong> Guarda este enlace en tus
                marcadores. Podrás usarlo siempre que necesites descargar tu
                boleto nuevamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
