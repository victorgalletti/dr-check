// src/app/agenda/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import CalendarControls from "@/components/Agenda/modules/calendarControls";
import CalendarGrid from "@/components/Agenda/modules/calendarGrid";
import AppointmentTable from "@/components/Agenda/modules/appointmentTable";
import {
  mockAppointments,
  mockCalendarEvents,
} from "@/components/Agenda/mockData/mockData";
import CrudAppointment, {
  AppointmentData,
} from "@/components/Agenda/modules/crudAppointment";
import { CalendarEvent } from "@/components/Agenda/types/types";

const viewMap: { [key: string]: string } = {
  Dia: "timeGridDay",
  Semana: "timeGridWeek",
  Mês: "dayGridMonth",
  Agenda: "listWeek",
};

const AgendaPage: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<string>("timeGridWeek");
  const [isCrudOpen, setIsCrudOpen] = useState(false);
  const [crudInitialData, setCrudInitialData] =
    useState<AppointmentData | null>(null);

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleView = useCallback((newView: string) => {
    setView(newView);
  }, []);

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

  const handleSelectEvent = (eventClickInfo: any) => {
    const { event } = eventClickInfo;
    const resource = event.extendedProps as CalendarEvent;
    const initialData: AppointmentData = {
      id: resource.id,
      patientName: resource.patient,
      date: resource.date,
      time: resource.startTime,
      duration: 60,
      notes: `Consulta de ${resource.status}`,
    };
    setCrudInitialData(initialData);
    setIsCrudOpen(true);
  };

  const handleSubmitAppointment = async (data: AppointmentData) => {
    console.log("Salvando consulta:", data);
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
        <Sidebar />
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
                    onSelectEvent={handleSelectEvent}
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
