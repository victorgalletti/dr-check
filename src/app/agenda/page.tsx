// src/app/agenda/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import { Views, type View } from "react-big-calendar";
import Header from "@/components/header/header";
import CalendarControls from "@/app/agenda/modules/calendarControls";
import CalendarGrid from "@/app/agenda/modules/calendarGrid";
import AppointmentTable from "@/app/agenda/modules/appointmentTable";
import {
  mockAppointments,
  mockCalendarEvents,
} from "@/app/agenda/mockData/mockData";
import CrudAppointment, { AppointmentData } from "./modules/crudAppointment";
import { CalendarEvent } from "./types/types";

const viewMap: { [key: string]: View } = {
  Dia: Views.DAY,
  Semana: Views.WEEK,
  Mês: Views.MONTH,
  Agenda: Views.AGENDA,
};

const AgendaPage: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const [isCrudOpen, setIsCrudOpen] = useState(false);
  const [crudInitialData, setCrudInitialData] =
    useState<AppointmentData | null>(null);

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleView = useCallback((newView: View) => {
    setView(newView);
  }, []);

  // Abre o modal para um NOVO agendamento
  const handleNewAppointment = (slotInfo?: { start: Date; end: Date }) => {
    const initialData: AppointmentData = {
      patientName: "",
      date: (slotInfo?.start || new Date()).toISOString().slice(0, 10),
      time: (slotInfo?.start || new Date()).toISOString().slice(11, 16),
      duration: 30,
      notes: "",
    };
    setCrudInitialData(initialData);
    setIsCrudOpen(true);
  };

  // ADICIONADO: Restaura a função de abrir o modal ao clicar em um evento existente
  const handleSelectEvent = (event: { resource: CalendarEvent }) => {
    const { resource } = event;
    const initialData: AppointmentData = {
      id: resource.id,
      patientName: resource.patient,
      date: resource.date,
      time: resource.startTime,
      // Duração pode ser calculada ou vir de um campo 'duration' se existir
      duration: 60,
      notes: `Consulta de ${resource.status}`,
    };
    setCrudInitialData(initialData);
    setIsCrudOpen(true);
  };

  const handleSubmitAppointment = async (data: AppointmentData) => {
    console.log("Salvando consulta:", data);
    // Lógica para salvar na API
    setIsCrudOpen(false);
  };

  const todayDate = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="min-h-screen">
        <div className="md:pl-[var(--sidebar-w,16rem)] transition-[padding] duration-300 ease-in-out">
          <Header title="Agenda" />

          <main className="p-4 sm:p-6 md:p-8">
            <div className="max-w-full mx-auto">
              <CalendarControls
                date={date}
                view={view}
                onView={handleView}
                onNavigate={handleNavigate}
                onNewAppointment={() => handleNewAppointment()}
                viewMap={viewMap}
              />

              <div className="mt-6">
                <div className="mb-6">
                  <CalendarGrid
                    date={date}
                    view={view}
                    events={mockCalendarEvents}
                    onNavigate={handleNavigate}
                    onView={handleView}
                    onSelectSlot={handleNewAppointment}
                    onSelectEvent={handleSelectEvent} // Passando a nova função
                  />
                </div>

                <AppointmentTable
                  appointments={mockAppointments}
                  date={todayDate}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <CrudAppointment
        open={isCrudOpen}
        onClose={() => setIsCrudOpen(false)}
        onSubmit={handleSubmitAppointment}
        initialData={crudInitialData}
      />
    </>
  );
};

export default AgendaPage;
