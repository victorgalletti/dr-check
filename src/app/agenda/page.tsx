"use client";

import React, { useState } from "react";
import Header from "@/components/header/header";
import CalendarControls from "@/app/agenda/modules/calendarControls";
import CalendarGrid from "@/app/agenda/modules/calendarGrid";
import AppointmentTable from "@/app/agenda/modules/appointmentTable";
import {
  mockAppointments,
  mockCalendarEvents,
} from "@/app/agenda/modules/mockData";

const AgendaPage: React.FC = () => {
  const [activeView, setActiveView] = useState<"Dia" | "Semana" | "Mês">(
    "Semana"
  );
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<string>(
    monthNames[today.getMonth()]
  );
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const handleViewChange = (view: "Dia" | "Semana" | "Mês") => {
    setActiveView(view);
  };

  const handlePrevMonth = () => {
    console.log("Previous month");
  };

  const handleNextMonth = () => {
    console.log("Next month");
  };

  const handleNewAppointment = () => {
    console.log("New appointment");
  };

  // Calcula os dias da semana atual (domingo a sábado) como array de Date
  const getCurrentWeek = () => {
    const curr = new Date();
    const week = [];
    // Pega o domingo da semana atual
    const first = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(new Date(day));
    }
    return week;
  };
  const currentWeek: Date[] = getCurrentWeek();

  // Data de hoje no formato dd/mm/yyyy
  const todayDate = (() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  })();

  return (
    <div className="min-h-screen flex bg-white shadow-sm z-10">
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Agenda" />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <CalendarControls
              currentMonth={currentMonth}
              currentYear={currentYear}
              activeView={activeView}
              onViewChange={handleViewChange}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onNewAppointment={handleNewAppointment}
            />

            <div className="mb-6">
              <CalendarGrid
                events={mockCalendarEvents}
                currentWeek={currentWeek}
              />
            </div>

            <AppointmentTable
              appointments={mockAppointments}
              date={todayDate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgendaPage;
