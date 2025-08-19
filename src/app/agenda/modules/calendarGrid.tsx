// src/app/agenda/modules/CalendarGrid.tsx
"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventContentArg, DayHeaderContentArg } from "@fullcalendar/core";
import { CalendarEvent } from "@/app/agenda/types/types";

// Seus estilos personalizados para o calendário.
import "./calendarGrid.css";

interface CalendarGridProps {
  events?: CalendarEvent[];
  date: Date;
  view: string;
  onView: (view: string) => void;
  onNavigate: (newDate: Date) => void;
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: any) => void;
}

const STATUS_MAP: Record<
  string,
  { border: string; badgeBg: string; badgeText: string; bg: string }
> = {
  Cancelada: {
    border: "var(--danger-color)",
    bg: "var(--danger-bg)",
    badgeBg: "rgba(239,68,68,0.18)",
    badgeText: "#fca5a5",
  },
  Confirmada: {
    border: "var(--success-color)",
    bg: "var(--success-bg)",
    badgeBg: "rgba(16,185,129,0.18)",
    badgeText: "#6ee7b7",
  },
  Retorno: {
    border: "var(--payment-color)",
    bg: "var(--payment-bg)",
    badgeBg: "rgba(139,92,246,0.18)",
    badgeText: "#c4b5fd",
  },
  Aguardando: {
    border: "#d97706",
    bg: "rgba(251,191,36,0.1)",
    badgeBg: "rgba(251,191,36,0.25)",
    badgeText: "#fcd34d",
  },
  "Primeira Consulta": {
    border: "var(--info-color)",
    bg: "var(--info-bg)",
    badgeBg: "rgba(59,130,246,0.20)",
    badgeText: "#93c5fd",
  },
  Default: {
    border: "rgba(107,114,128,0.6)",
    bg: "rgba(107,114,128,0.05)",
    badgeBg: "rgba(107,114,128,0.15)",
    badgeText: "rgba(209,213,219,1)",
  },
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const { event } = eventInfo;
  const status = event.extendedProps.status;
  const conf = STATUS_MAP[status] || STATUS_MAP.Default;

  return (
    <div
      className="w-full h-full overflow-hidden flex flex-col justify-start p-1"
      style={{
        borderLeft: `4px solid ${conf.border}`,
        backgroundColor: "var(--card-bg)",
      }}
    >
      <div className="flex items-start justify-between w-full">
        <p className="font-medium truncate shrink min-w-0 text-sm text-[var(--text-primary)] leading-tight">
          {event.title}
        </p>
        {status && (
          <span
            style={{
              backgroundColor: conf.badgeBg,
              color: conf.badgeText,
            }}
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ml-2 flex-shrink-0"
          >
            {status}
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
        {eventInfo.timeText}
      </p>
    </div>
  );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events = [],
  date,
  view,
  onView,
  onNavigate,
  onSelectSlot,
  onSelectEvent,
}) => {
  const renderDayHeader = (arg: DayHeaderContentArg) => {
    const dayOfWeek = arg.date.toLocaleDateString("pt-BR", {
      weekday: "short",
    });
    const dayNumber = arg.date.getDate();
    const formattedDayOfWeek = dayOfWeek.endsWith(".")
      ? dayOfWeek
      : `${dayOfWeek}.`;

    const handleHeaderClick = () => {
      onNavigate(arg.date); // Navega para a data clicada
      onView("timeGridDay"); // Muda a visualização para "dia"
    };

    return (
      <div
        className="fc-custom-day-header"
        onClick={handleHeaderClick}
        style={{ cursor: "pointer" }}
      >
        <span className="fc-day-of-week">{formattedDayOfWeek}</span>
        <span className="fc-day-number">{dayNumber}</span>
      </div>
    );
  };
  const fcEvents = events.map((e) => ({
    id: e.id,
    title: e.title || e.patient,
    start: `${e.date}T${e.startTime}:00`,
    end: `${e.date}T${e.endTime}:00`,
    allDay: false,
    extendedProps: { ...e }, // Passa o evento original para uso no renderEventContent
  }));

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--card-border)]">
      <div className="h-[75vh] calendar-container">
        <FullCalendar
          key={`${view}-${date.toISOString()}`}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={view}
          initialDate={date}
          events={fcEvents}
          headerToolbar={false}
          locale="pt-br"
          selectable={true}
          select={onSelectSlot}
          eventClick={onSelectEvent}
          eventContent={renderEventContent}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          height="100%"
          dayHeaderFormat={{
            weekday: "short",
            day: "numeric",
            omitCommas: true,
          }}
          dayHeaderContent={renderDayHeader}
        />
      </div>
    </div>
  );
};

export default CalendarGrid;
