"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getAllTickets } from "@/lib/ticket-service";
import {
  eventGoals,
  renderGoalIcon,
  getGoalProgress,
  isGoalCompleted,
} from "@/lib/event-goals";

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
        <p className="text-sm text-gray-600">
          {ticketsSold} personas asistiran
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {eventGoals.map((goal) => {
          const progress = getGoalProgress(goal, ticketsSold);
          const isCompleted = isGoalCompleted(goal, ticketsSold);

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
                  <div className={goal.color}>{renderGoalIcon(goal, "sm")}</div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {Math.max(ticketsSold, goal.startTickets)}/
                    {goal.targetTickets}
                  </p>
                </div>
              </div>

              <h4 className="text-xs font-medium text-gray-900 mb-1">
                {goal.shortName}
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
