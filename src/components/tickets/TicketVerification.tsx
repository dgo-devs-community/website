"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getTicketByCode,
  useTicket as markTicketUsed,
} from "@/lib/ticket-service";
import { partyConfig } from "@/lib/party-config";
import { Ticket } from "@/types/tickets";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin,
  Hash,
} from "lucide-react";

export default function TicketVerification() {
  const [code, setCode] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUsing, setIsUsing] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Ingresa un código de boleto");
      return;
    }

    setIsLoading(true);
    setError("");
    setTicket(null);

    try {
      const foundTicket = await getTicketByCode(code.trim());

      if (!foundTicket) {
        setError("Boleto no encontrado");
      } else {
        setTicket(foundTicket);
      }
    } catch (err) {
      setError("Error al buscar el boleto");
      console.error("Error searching ticket:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseTicket = async () => {
    if (!ticket) return;

    setIsUsing(true);
    try {
      await markTicketUsed(ticket.code);
      setTicket({ ...ticket, status: "used" });
    } catch (err) {
      setError("Error al marcar el boleto como usado");
      console.error("Error using ticket:", err);
    } finally {
      setIsUsing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "used":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Válido";
      case "used":
        return "Ya usado";
      case "pending":
        return "Pago pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconocido";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "used":
        return <XCircle className="h-5 w-5 text-gray-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Verificación de Boletos</h2>
          <p className="text-gray-600">
            Verifica la validez de un boleto ingresando su código
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Código del boleto (ej: ABC12345)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center"
                maxLength={10}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isLoading ? "Buscando..." : "Verificar"}
            </Button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {ticket && (
          <div className="space-y-4">
            {/* Estado del boleto */}
            <div
              className={`p-4 rounded-lg border ${getStatusColor(
                ticket.status
              )}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(ticket.status)}
                <span className="font-semibold">
                  Estado: {getStatusText(ticket.status)}
                </span>
              </div>
              {ticket.status === "paid" && (
                <p className="text-sm">Este boleto es válido para el evento</p>
              )}
              {ticket.status === "used" && (
                <p className="text-sm">Este boleto ya fue utilizado</p>
              )}
              {ticket.status === "pending" && (
                <p className="text-sm">Este boleto está pendiente de pago</p>
              )}
            </div>

            {/* Información del evento */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Información del Evento
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Evento:</strong> {partyConfig.name}
                </p>
                <p>
                  <strong>Fecha:</strong> {partyConfig.date}
                </p>
                <p>
                  <strong>Hora:</strong> {partyConfig.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {partyConfig.location}
                </p>
              </div>
            </div>

            {/* Información del boleto */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Información del Boleto
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Código:</strong>{" "}
                  <span className="font-mono">{ticket.code}</span>
                </p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <strong>Titular:</strong> {ticket.name}
                </p>
                <p>
                  <strong>Email:</strong> {ticket.email}
                </p>
                <p>
                  <strong>Cantidad:</strong> {ticket.quantity} boleto
                  {ticket.quantity > 1 ? "s" : ""}
                </p>
                <p>
                  <strong>Generado:</strong>{" "}
                  {new Date(ticket.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Acciones */}
            {ticket.status === "paid" && (
              <div className="text-center">
                <Button
                  onClick={handleUseTicket}
                  disabled={isUsing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isUsing ? "Marcando como usado..." : "Marcar como Usado"}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Solo marca como usado cuando el titular ingrese al evento
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Instrucciones:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Ingresa el código del boleto (8 caracteres)</li>
            <li>• Verifica que el estado sea &ldquo;Válido&rdquo;</li>
            <li>• Confirma que el nombre coincida con la identificación</li>
            <li>
              • Marca como &ldquo;Usado&rdquo; solo al momento del ingreso
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
