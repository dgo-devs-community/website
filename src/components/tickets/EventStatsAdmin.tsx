"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getAllTickets } from "@/lib/ticket-service";
import { TrendingUp, Target, Users, DollarSign, Share2 } from "lucide-react";
import { shouldShowTicketGoals } from "@/lib/feature-flags";

interface TicketStats {
  totalTickets: number;
  totalRevenue: number;
  completedGoals: number;
  nextGoal: {
    name: string;
    current: number;
    target: number;
    remaining: number;
  } | null;
  growthRate: number;
  estimatedCompletion: string;
}

const eventGoals = [
  { name: "Norteño", target: 50 },
  { name: "DJ Set", target: 100 },
  { name: "Banda Viva", target: 150 },
  { name: "Sorpresa", target: 200 },
  { name: "Premium", target: 250 },
  { name: "Legendaria", target: 300 },
];

export default function EventStatsAdmin() {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // Actualizar cada 5 minutos
    const interval = setInterval(loadStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const tickets = await getAllTickets();
      const paidTickets = tickets.filter(
        (t) => t.status === "paid" || t.status === "used"
      );
      const totalTickets = paidTickets.reduce(
        (sum, ticket) => sum + ticket.quantity,
        0
      );
      const totalRevenue = paidTickets.reduce(
        (sum, ticket) => sum + ticket.quantity * 200,
        0
      );

      let completedGoals = 0;
      let nextGoal = null;

      // Only calculate goals if feature is enabled
      if (shouldShowTicketGoals()) {
        // Calcular metas completadas
        completedGoals = eventGoals.filter(
          (goal) => totalTickets >= goal.target
        ).length;

        // Encontrar próxima meta
        nextGoal = eventGoals.find((goal) => totalTickets < goal.target);
      }

      // Calcular tasa de crecimiento (simulada por ahora)
      const growthRate = Math.random() * 10 + 5; // 5-15% simulado

      // Estimar tiempo de completación
      let estimatedCompletion = "Próximamente";
      if (nextGoal && growthRate > 0) {
        const daysToComplete = Math.ceil(
          (nextGoal.target - totalTickets) / (growthRate * 0.1)
        );
        estimatedCompletion = `${daysToComplete} días`;
      }

      setStats({
        totalTickets,
        totalRevenue,
        completedGoals,
        nextGoal: nextGoal
          ? {
              name: nextGoal.name,
              current: totalTickets,
              target: nextGoal.target,
              remaining: nextGoal.target - totalTickets,
            }
          : null,
        growthRate,
        estimatedCompletion,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateShareableMessage = () => {
    if (!stats) return "";

    let message = `🔥 DgoTecHub Fest 2025 🔥\n\n📊 ${stats.totalTickets} boletos vendidos\n`;

    // Only include goals information if feature is enabled
    if (shouldShowTicketGoals()) {
      const completedText =
        stats.completedGoals > 0
          ? `¡Ya desbloqueamos ${stats.completedGoals} sorpresas! 🎉`
          : "¡Ayúdanos a desbloquear las primeras sorpresas! 🎯";

      message += `${completedText}\n\n${
        stats.nextGoal
          ? `🎯 Próxima meta: ${stats.nextGoal.name} (${stats.nextGoal.remaining} boletos más)`
          : "¡Todas las metas desbloqueadas!"
      }\n\n`;
    }

    message += "¡No te quedes sin el tuyo! 🎫";
    return message;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) {
    return <div>Error cargando estadísticas</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {/* Total de boletos */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Boletos</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalTickets}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Ingresos totales */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Ingresos</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.totalRevenue.toLocaleString()} MXN
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Metas completadas - only show if feature is enabled */}
      {shouldShowTicketGoals() && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Metas Completadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.completedGoals}/{eventGoals.length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      )}

      {/* Próxima meta - only show if feature is enabled */}
      {shouldShowTicketGoals() && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Próxima Meta</p>
              <p className="text-lg font-bold text-gray-900">
                {stats.nextGoal ? stats.nextGoal.name : "¡Completado!"}
              </p>
              {stats.nextGoal && (
                <p className="text-sm text-gray-500">
                  {stats.nextGoal.remaining} boletos más
                </p>
              )}
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      )}

      {/* Progreso de la próxima meta - only show if feature is enabled */}
      {shouldShowTicketGoals() && stats.nextGoal && (
        <Card className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Progreso: {stats.nextGoal.name}
            </h3>
            <span className="text-sm text-gray-500">
              {Math.round(
                (stats.nextGoal.current / stats.nextGoal.target) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${
                  (stats.nextGoal.current / stats.nextGoal.target) * 100
                }%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {stats.nextGoal.current} / {stats.nextGoal.target} boletos
          </p>
        </Card>
      )}

      {/* Herramientas de compartir */}
      <Card className="p-4 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Herramientas de Promoción
          </h3>
          <Share2 className="h-5 w-5 text-gray-500" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              const text = generateShareableMessage();
              navigator.clipboard.writeText(text);
              alert("Mensaje copiado al portapapeles!");
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            📋 Copiar mensaje promocional
          </button>

          <button
            onClick={() => {
              const text = generateShareableMessage();
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
              )}`;
              window.open(url, "_blank");
            }}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            📱 Compartir en Twitter
          </button>
        </div>
      </Card>
    </div>
  );
}
