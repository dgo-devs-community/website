"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllTickets, updateTicketStatus } from "@/lib/ticket-service";
import { Ticket } from "@/types/tickets";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  Download,
  Check,
  X,
} from "lucide-react";

export default function TicketAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTicket, setUpdatingTicket] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "paid" | "used" | "pending" | "cancelled"
  >("all");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const stats = {
    total: tickets.length,
    paid: tickets.filter((t) => t.status === "paid").length,
    used: tickets.filter((t) => t.status === "used").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    cancelled: tickets.filter((t) => t.status === "cancelled").length,
    totalRevenue: tickets
      .filter((t) => t.status === "paid" || t.status === "used")
      .reduce((sum, t) => sum + t.quantity * 150, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "used":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "cancelled":
        return <Ban className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Código", "Nombre", "Email", "Cantidad", "Estado", "Fecha"],
      ...filteredTickets.map((ticket) => [
        ticket.code,
        ticket.name,
        ticket.email,
        ticket.quantity.toString(),
        ticket.status,
        new Date(ticket.created_at).toLocaleDateString("es-ES"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `boletos-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleStatusChange = async (
    ticketId: string,
    newStatus: "pending" | "paid" | "used" | "cancelled"
  ) => {
    if (!confirm(`¿Estás seguro de cambiar el estado a "${newStatus}"?`)) {
      return;
    }

    setUpdatingTicket(ticketId);
    try {
      await updateTicketStatus(ticketId, newStatus);
      // Recargar los boletos para mostrar el cambio
      await loadTickets();
      alert(`Estado actualizado exitosamente a: ${newStatus}`);
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert(
        `Error al actualizar boleto: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setUpdatingTicket(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona todos los boletos del evento</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Boletos</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pagados</p>
              <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usados</p>
              <p className="text-2xl font-bold text-gray-600">{stats.used}</p>
            </div>
            <XCircle className="h-8 w-8 text-gray-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelados</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.cancelled}
              </p>
            </div>
            <Ban className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Estadísticas financieras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Ingresos Totales
              </p>
              <p className="text-2xl font-bold text-green-600">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">MXN</p>
            </div>
            <div className="text-green-500 text-2xl">💰</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Personas Confirmadas
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {tickets
                  .filter((t) => t.status === "paid" || t.status === "used")
                  .reduce((sum, t) => sum + t.quantity, 0)}
              </p>
              <p className="text-xs text-gray-500">Asistentes</p>
            </div>
            <div className="text-blue-500 text-2xl">👥</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Precio Promedio
              </p>
              <p className="text-2xl font-bold text-purple-600">$150</p>
              <p className="text-xs text-gray-500">MXN por boleto</p>
            </div>
            <div className="text-purple-500 text-2xl">🎫</div>
          </div>
        </Card>
      </div>

      {/* Filtros y exportar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            Todos ({stats.total})
          </Button>
          <Button
            variant={filter === "paid" ? "default" : "outline"}
            onClick={() => setFilter("paid")}
            size="sm"
          >
            Pagados ({stats.paid})
          </Button>
          <Button
            variant={filter === "used" ? "default" : "outline"}
            onClick={() => setFilter("used")}
            size="sm"
          >
            Usados ({stats.used})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Pendientes ({stats.pending})
          </Button>
          <Button
            variant={filter === "cancelled" ? "default" : "outline"}
            onClick={() => setFilter("cancelled")}
            size="sm"
          >
            Cancelados ({stats.cancelled})
          </Button>
        </div>

        <Button
          onClick={exportToCSV}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Lista de boletos */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nombre</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Cantidad</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-left p-4">Fecha</th>
                <th className="text-left p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono">{ticket.code}</td>
                  <td className="p-4">{ticket.name}</td>
                  <td className="p-4">{ticket.email}</td>
                  <td className="p-4">{ticket.quantity}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className="capitalize">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {new Date(ticket.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      {ticket.receipt_url && (
                        <a
                          href={ticket.receipt_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm block"
                        >
                          📎 Ver comprobante
                        </a>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {/* Mostrar botones según el estado actual */}
                        {ticket.status === "pending" && (
                          <>
                            <Button
                              onClick={() =>
                                handleStatusChange(ticket.id, "paid")
                              }
                              variant="outline"
                              size="sm"
                              disabled={updatingTicket === ticket.id}
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              {updatingTicket === ticket.id ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-500"></div>
                              ) : (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Aprobar
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() =>
                                handleStatusChange(ticket.id, "cancelled")
                              }
                              variant="outline"
                              size="sm"
                              disabled={updatingTicket === ticket.id}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              {updatingTicket === ticket.id ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                              ) : (
                                <>
                                  <X className="h-3 w-3 mr-1" />
                                  Rechazar
                                </>
                              )}
                            </Button>
                          </>
                        )}

                        {ticket.status === "paid" && (
                          <>
                            <Button
                              onClick={() =>
                                handleStatusChange(ticket.id, "used")
                              }
                              variant="outline"
                              size="sm"
                              disabled={updatingTicket === ticket.id}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              {updatingTicket === ticket.id ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                              ) : (
                                "Marcar usado"
                              )}
                            </Button>
                            <Button
                              onClick={() =>
                                handleStatusChange(ticket.id, "pending")
                              }
                              variant="outline"
                              size="sm"
                              disabled={updatingTicket === ticket.id}
                              className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                            >
                              Revertir a pendiente
                            </Button>
                          </>
                        )}

                        {ticket.status === "used" && (
                          <Button
                            onClick={() =>
                              handleStatusChange(ticket.id, "paid")
                            }
                            variant="outline"
                            size="sm"
                            disabled={updatingTicket === ticket.id}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            Reactivar boleto
                          </Button>
                        )}

                        {ticket.status === "cancelled" && (
                          <Button
                            onClick={() =>
                              handleStatusChange(ticket.id, "pending")
                            }
                            variant="outline"
                            size="sm"
                            disabled={updatingTicket === ticket.id}
                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            Reactivar
                          </Button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No se encontraron boletos con los filtros seleccionados
          </p>
        </div>
      )}
    </div>
  );
}
