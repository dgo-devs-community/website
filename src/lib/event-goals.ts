import React from "react";
import {
  Music,
  Users,
  Sparkles,
  Trophy,
  PartyPopper,
  Volume2,
} from "lucide-react";

export interface EventGoal {
  id: string;
  name: string;
  description: string;
  targetTickets: number;
  startTickets: number; // Tickets donde empieza este objetivo
  iconComponent: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  celebration: string;
  shortName: string; // Para la versión compacta
}

export const eventGoals: EventGoal[] = [
  {
    id: "lugar",
    name: "Lugar Confirmado",
    shortName: "Lugar",
    description: "Lugar confirmado para el evento",
    startTickets: 0,
    targetTickets: 10,
    iconComponent: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    celebration: "� ¡Lugar confirmado para el evento! �",
  },
  {
    id: "norteño",
    name: "¡Hora de Norteño!",
    shortName: "Norteño",
    description: "Conjunto norteño confirmado",
    startTickets: 10,
    targetTickets: 25,
    iconComponent: Music,
    color: "text-green-600",
    bgColor: "bg-green-100",
    celebration: "🎵 ¡Ya tenemos norteño asegurado! 🎵",
  },
  {
    id: "dj",
    name: "DJ Set Completo",
    shortName: "DJ Set",
    description: "DJ profesional toda la noche",
    startTickets: 25,
    targetTickets: 50,
    iconComponent: Volume2,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    celebration: "🎧 ¡DJ confirmado para toda la noche! 🎧",
  },
  {
    id: "surpresa",
    name: "Sorpresa Especial",
    shortName: "Sorpresa",
    description: "Artista invitado sorpresa",
    startTickets: 50,
    targetTickets: 100,
    iconComponent: Sparkles,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    celebration: "✨ ¡Sorpresa especial desbloqueada! ✨",
  },
  {
    id: "premium",
    name: "Experiencia Premium",
    shortName: "Premium",
    description: "Barra premium y decoración extra",
    startTickets: 100,
    targetTickets: 200,
    iconComponent: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    celebration: "🏆 ¡Experiencia premium activada! 🏆",
  },
  {
    id: "legendary",
    name: "Fiesta Legendaria tipo proyecto X",
    shortName: "Legendaria",
    description: "¡Todo desbloqueado!",
    startTickets: 200,
    targetTickets: 300,
    iconComponent: PartyPopper,
    color: "text-red-600",
    bgColor: "bg-red-100",
    celebration: "🎉 ¡FIESTA LEGENDARIA DESBLOQUEADA! 🎉",
  },
];

// Función utilitaria para renderizar iconos con diferentes tamaños
export const renderGoalIcon = (
  goal: EventGoal,
  size: "sm" | "md" | "lg" = "md"
) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const IconComponent = goal.iconComponent;
  return React.createElement(IconComponent, {
    className: sizeClasses[size],
  });
};

// Función para calcular el progreso de un objetivo específico
export const getGoalProgress = (goal: EventGoal, totalTickets: number) => {
  // Si no hemos alcanzado el inicio del objetivo, progreso es 0%
  if (totalTickets < goal.startTickets) {
    return 0;
  }

  // Si ya pasamos el objetivo, progreso es 100%
  if (totalTickets >= goal.targetTickets) {
    return 100;
  }

  // Calculamos el progreso dentro del rango del objetivo
  const progressInRange = totalTickets - goal.startTickets;
  const rangeSize = goal.targetTickets - goal.startTickets;
  return Math.round((progressInRange / rangeSize) * 100);
};

// Función para verificar si un objetivo está completado
export const isGoalCompleted = (goal: EventGoal, totalTickets: number) => {
  return totalTickets >= goal.targetTickets;
};

// Función para obtener los tickets restantes para completar un objetivo
export const getTicketsRemaining = (goal: EventGoal, totalTickets: number) => {
  if (totalTickets >= goal.targetTickets) {
    return 0;
  }

  // Si no hemos llegado al inicio del objetivo, mostramos desde el inicio
  const effectiveStart = Math.max(totalTickets, goal.startTickets);
  return goal.targetTickets - effectiveStart;
};
