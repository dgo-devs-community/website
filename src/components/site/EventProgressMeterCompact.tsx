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
  targetTickets: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const eventGoals: EventGoal[] = [
  {
    id: "norteño",
    name: "Norteño",
    targetTickets: 50,
    icon: <Music className="h-4 w-4" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "dj",
    name: "DJ Set",
    targetTickets: 100,
    icon: <Volume2 className="h-4 w-4" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "banda",
    name: "Banda Viva",
    targetTickets: 150,
    icon: <Users className="h-4 w-4" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "surpresa",
    name: "Sorpresa",
    targetTickets: 200,
    icon: <Sparkles className="h-4 w-4" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: "premium",
    name: "Premium",
    targetTickets: 250,
    icon: <Trophy className="h-4 w-4" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    id: "legendary",
    name: "Legendaria",
    targetTickets: 300,
    icon: <PartyPopper className="h-4 w-4" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

export default function EventProgressMeterCompact() {
  const [ticketsSold, setTicketsSold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          ¡Desbloqueemos la Fiesta!
        </h3>
        <p className="text-sm text-gray-600">{ticketsSold} boletos vendidos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {eventGoals.map((goal) => {
          const progress = getProgressPercentage(goal.targetTickets);
          const isCompleted = progress >= 100;

          return (
            <div
              key={goal.id}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                isCompleted
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-full ${goal.bgColor}`}>
                  <div className={goal.color}>{goal.icon}</div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {ticketsSold}/{goal.targetTickets}
                  </p>
                </div>
              </div>

              <h4 className="text-xs font-medium text-gray-900 mb-1">
                {goal.name}
              </h4>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
                    progress
                  )}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {isCompleted && (
                <p className="text-xs text-green-600 font-medium mt-1 text-center">
                  ¡Desbloqueado!
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          ¡Compra tu boleto y ayuda a desbloquear más sorpresas!
        </p>
      </div>
    </Card>
  );
}
