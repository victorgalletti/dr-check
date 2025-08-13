"use client";

import React from "react";

// Tipos para os dados do evento. O ideal é que fiquem num ficheiro partilhado.
import { CalendarEvent } from "@/app/agenda/types/types";

interface CalendarGridProps {
  events?: CalendarEvent[];
  currentWeek?: Date[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events = [],
  currentWeek,
}) => {
  const safeCurrentWeek = currentWeek || [];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  // Função para retornar um objeto com as classes de estilo
  const getStatusClasses = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "Cancelada":
        return {
          container: "bg-red-100",
          title: "text-red-800",
          subtitle: "text-red-600",
        };
      case "Confirmada":
        return {
          container: "bg-green-100",
          title: "text-green-800",
          subtitle: "text-green-600",
        };
      case "Retorno":
        return {
          container: "bg-purple-100",
          title: "text-purple-800",
          subtitle: "text-purple-600",
        };
      case "Aguardando":
        return {
          container: "bg-yellow-100",
          title: "text-yellow-800",
          subtitle: "text-yellow-600",
        };
      case "Primeira Consulta":
        return {
          container: "bg-blue-100",
          title: "text-blue-800",
          subtitle: "text-blue-600",
        };
      default:
        return {
          container: "bg-gray-100",
          title: "text-gray-800",
          subtitle: "text-gray-600",
        };
    }
  };

  // Função para encontrar o evento para uma determinada hora e dia
  const getEventForTimeAndDay = (time: string, day: Date) => {
    if (!day || typeof day.toISOString !== "function") {
      return null;
    }
    const eventDate = day.toISOString().split("T")[0];
    return events.find(
      (event) => event.startTime === time && event.date === eventDate
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* Cabeçalho do Calendário com divisórias verticais */}
      <div className="grid grid-cols-8 divide-x divide-gray-200 border-b border-gray-200">
        <div className="py-2 px-2 text-center text-gray-500 text-sm font-medium">
          Horário
        </div>
        {weekDays.map((day, index) => (
          <div
            key={day}
            className="py-2 px-2 text-center text-gray-500 text-sm font-medium"
          >
            <div>{day}</div>
            <div className="text-gray-900 font-semibold">
              {safeCurrentWeek[index]?.getDate() || ""}
            </div>
          </div>
        ))}
      </div>

      {/* Corpo do Calendário com divisórias horizontais */}
      <div className="divide-y divide-gray-200">
        {timeSlots.map((time) => (
          // Cada linha de tempo tem divisórias verticais
          <div
            key={time}
            className="grid grid-cols-8 divide-x divide-gray-200 min-h-[50px]"
          >
            <div className="py-3 px-2 text-center text-gray-500 text-sm font-medium">
              {time}
            </div>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const day = safeCurrentWeek[dayIndex];
              const event = day ? getEventForTimeAndDay(time, day) : null;
              const statusClasses = event
                ? getStatusClasses(event.status)
                : null;
              return (
                <div key={dayIndex} className="py-1 px-1 relative">
                  {event && statusClasses && (
                    <div
                      className={`absolute inset-0 m-1 rounded p-1 text-xs ${statusClasses.container}`}
                    >
                      <div className={`font-medium ${statusClasses.title}`}>
                        {event.patient}
                      </div>
                      <div className={statusClasses.subtitle}>
                        {event.status}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
