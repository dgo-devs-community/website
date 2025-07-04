"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getAllTickets } from "@/lib/ticket-service";
import {
  Music,
  Users,
  Sparkles,
  Trophy,
  PartyPopper,
  Volume2,
} from "lucide-react";

interface EventGoal {
  id: string;
  name: string;
  description: string;
  targetTickets: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  celebration: string;
}

const eventGoals: EventGoal[] = [
  {
    id: "norteño",
    name: "¡Hora de Norteño!",
    description: "Conjunto norteño confirmado",
    targetTickets: 50,
    icon: <Music className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    celebration: "🎵 ¡Ya tenemos norteño asegurado! 🎵",
  },
  {
    id: "dj",
    name: "DJ Set Completo",
    description: "DJ profesional toda la noche",
    targetTickets: 100,
    icon: <Volume2 className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    celebration: "🎧 ¡DJ confirmado para toda la noche! 🎧",
  },
  {
    id: "banda",
    name: "Banda en Vivo",
    description: "Banda local de rock/pop",
    targetTickets: 150,
    icon: <Users className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    celebration: "🎸 ¡Banda en vivo confirmada! 🎸",
  },
  {
    id: "surpresa",
    name: "Sorpresa Especial",
    description: "Artista invitado sorpresa",
    targetTickets: 200,
    icon: <Sparkles className="h-6 w-6" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    celebration: "✨ ¡Sorpresa especial desbloqueada! ✨",
  },
  {
    id: "premium",
    name: "Experiencia Premium",
    description: "Barra premium y decoración extra",
    targetTickets: 250,
    icon: <Trophy className="h-6 w-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    celebration: "🏆 ¡Experiencia premium activada! 🏆",
  },
  {
    id: "legendary",
    name: "Fiesta Legendaria",
    description: "¡Todo desbloqueado!",
    targetTickets: 300,
    icon: <PartyPopper className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    celebration: "🎉 ¡FIESTA LEGENDARIA DESBLOQUEADA! 🎉",
  },
];

export default function EventProgressMeter() {
  const [ticketsSold, setTicketsSold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);

  useEffect(() => {
    loadTicketStats();
  }, []);

  const loadTicketStats = async () => {
    try {
      const tickets = await getAllTickets();
      const paidTickets = tickets.filter(
        (t) => t.status === "paid" || t.status === "used"
      );
      const totalTickets = paidTickets.reduce(
        (sum, ticket) => sum + ticket.quantity,
        0
      );

      setTicketsSold(totalTickets);

      // Determinar qué metas se han completado
      const completed = eventGoals
        .filter((goal) => totalTickets >= goal.targetTickets)
        .map((goal) => goal.id);

      setCompletedGoals(completed);
    } catch (error) {
      console.error("Error loading ticket stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = (targetTickets: number) => {
    return Math.min((ticketsSold / targetTickets) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Desbloqueemos la Fiesta Juntos!
        </h2>
        <p className="text-lg text-gray-600">
          {ticketsSold} boletos vendidos - ¡Sigamos creciendo!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {eventGoals.map((goal) => {
          const progress = getProgressPercentage(goal.targetTickets);
          const isCompleted = completedGoals.includes(goal.id);

          return (
            <Card
              key={goal.id}
              className={`p-6 transition-all duration-300 ${
                isCompleted ? "ring-2 ring-green-500 shadow-lg" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${goal.bgColor}`}>
                  <div className={goal.color}>{goal.icon}</div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {ticketsSold} / {goal.targetTickets}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {Math.round(progress)}%
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {goal.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{goal.description}</p>

              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                      progress
                    )}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {isCompleted && (
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600 animate-pulse">
                      {goal.celebration}
                    </p>
                  </div>
                )}

                {!isCompleted && (
                  <p className="text-xs text-gray-500 text-center">
                    {goal.targetTickets - ticketsSold} boletos más para
                    desbloquear
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sección de compartir */}
      <div className="mt-8 text-center">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Comparte el progreso!
          </h3>
          <p className="text-gray-600 mb-4">
            Ayuda a tus amigos a ver lo increíble que va a estar la fiesta
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                const text = `🎉 ¡Ya vendimos ${ticketsSold} boletos para DgoTecHub Fest! ${
                  completedGoals.length > 0
                    ? `Ya desbloqueamos: ${completedGoals.length} sorpresas 🎊`
                    : "¡Ayúdanos a desbloquear más sorpresas!"
                } #DgoTecHubFest`;
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  text
                )}`;
                window.open(url, "_blank");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📱 Compartir en Twitter
            </button>
            <button
              onClick={() => {
                const text = `🎉 ¡Ya vendimos ${ticketsSold} boletos para DgoTecHub Fest! ${
                  completedGoals.length > 0
                    ? `Ya desbloqueamos: ${completedGoals.length} sorpresas 🎊`
                    : "¡Ayúdanos a desbloquear más sorpresas!"
                } ¡No te quedes sin el tuyo!`;
                if (navigator.share) {
                  navigator.share({
                    title: "DgoTecHub Fest 2025",
                    text: text,
                    url: window.location.origin,
                  });
                } else {
                  navigator.clipboard.writeText(
                    text + " " + window.location.origin
                  );
                  alert("¡Mensaje copiado al portapapeles!");
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋 Copiar mensaje
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
