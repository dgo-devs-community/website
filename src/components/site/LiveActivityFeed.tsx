"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getAllTickets } from "@/lib/ticket-service";
import { Ticket } from "@/types/tickets";
import { Clock, User, CheckCircle, Sparkles } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "ticket_sold" | "goal_achieved" | "milestone";
  message: string;
  timestamp: Date;
  highlight: boolean;
}

const eventGoals = [
  { name: "¡Norteño Confirmado!", target: 50, emoji: "🎵" },
  { name: "¡DJ Set Completo!", target: 100, emoji: "🎧" },
  { name: "¡Banda en Vivo!", target: 150, emoji: "🎸" },
  { name: "¡Sorpresa Especial!", target: 200, emoji: "✨" },
  { name: "¡Experiencia Premium!", target: 250, emoji: "🏆" },
  { name: "¡Fiesta Legendaria!", target: 300, emoji: "🎉" },
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [currentTickets, setCurrentTickets] = useState(0);
  const [lastTicketCount, setLastTicketCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tickets = await getAllTickets();
        const paidTickets = tickets.filter(
          (t) => t.status === "paid" || t.status === "used"
        );
        const totalTickets = paidTickets.reduce(
          (sum, ticket) => sum + ticket.quantity,
          0
        );

        setCurrentTickets(totalTickets);
        setLastTicketCount(totalTickets);

        // Generate initial activities
        const initialActivities = generateInitialActivities(paidTickets);
        setActivities(initialActivities);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkUpdates = async () => {
      try {
        const tickets = await getAllTickets();
        const paidTickets = tickets.filter(
          (t) => t.status === "paid" || t.status === "used"
        );
        const totalTickets = paidTickets.reduce(
          (sum, ticket) => sum + ticket.quantity,
          0
        );

        if (totalTickets > lastTicketCount) {
          const newTickets = totalTickets - lastTicketCount;
          const newActivity: ActivityItem = {
            id: `ticket-${Date.now()}`,
            type: "ticket_sold",
            message: `¡${newTickets} ${
              newTickets === 1 ? "boleto vendido" : "boletos vendidos"
            }! 🎫`,
            timestamp: new Date(),
            highlight: true,
          };

          setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);

          // Check for goal achievements
          const achievedGoals = eventGoals.filter(
            (goal) =>
              lastTicketCount < goal.target && totalTickets >= goal.target
          );

          achievedGoals.forEach((goal) => {
            const goalActivity: ActivityItem = {
              id: `goal-${goal.target}-${Date.now()}`,
              type: "goal_achieved",
              message: `${goal.emoji} ${goal.name} ¡DESBLOQUEADO!`,
              timestamp: new Date(),
              highlight: true,
            };

            setActivities((prev) => [goalActivity, ...prev.slice(0, 9)]);
          });

          setLastTicketCount(totalTickets);
        }

        setCurrentTickets(totalTickets);
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    loadData();
    const interval = setInterval(checkUpdates, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [lastTicketCount]);

  const generateInitialActivities = (tickets: Ticket[]): ActivityItem[] => {
    const recentTickets = tickets
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5);

    const activities: ActivityItem[] = [];

    // Add recent ticket sales
    recentTickets.forEach((ticket, index) => {
      activities.push({
        id: `initial-${ticket.id}`,
        type: "ticket_sold",
        message: `${ticket.name} compró ${ticket.quantity} ${
          ticket.quantity === 1 ? "boleto" : "boletos"
        } 🎫`,
        timestamp: new Date(ticket.created_at),
        highlight: index < 2,
      });
    });

    // Add milestone messages
    const totalTickets = tickets.reduce(
      (sum, ticket) => sum + ticket.quantity,
      0
    );
    const achievedGoals = eventGoals.filter(
      (goal) => totalTickets >= goal.target
    );

    achievedGoals.forEach((goal) => {
      activities.push({
        id: `milestone-${goal.target}`,
        type: "goal_achieved",
        message: `${goal.emoji} ${goal.name} ¡DESBLOQUEADO!`,
        timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24h
        highlight: false,
      });
    });

    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "ahora";
    if (diffMins < 60) return `hace ${diffMins}min`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    return `hace ${diffDays}d`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ticket_sold":
        return <User className="h-4 w-4" />;
      case "goal_achieved":
        return <Sparkles className="h-4 w-4" />;
      case "milestone":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "ticket_sold":
        return "text-blue-600 bg-blue-100";
      case "goal_achieved":
        return "text-green-600 bg-green-100";
      case "milestone":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🔴 Actividad en Vivo
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          En directo
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No hay actividad reciente
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 ${
                activity.highlight
                  ? "bg-yellow-50 border-2 border-yellow-200"
                  : "bg-gray-50"
              }`}
            >
              <div
                className={`p-2 rounded-full ${getActivityColor(
                  activity.type
                )}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Total de boletos vendidos</p>
          <p className="text-lg font-bold text-gray-900">{currentTickets}</p>
        </div>
      </div>
    </Card>
  );
}
