// src/app/agenda/modules/CalendarGrid.tsx
"use client";

import React, { useMemo } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type EventPropGetter,
  type View,
  type HeaderProps,
} from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  startOfDay,
  setHours,
  setMinutes,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarEvent } from "@/app/agenda/types/types";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarGrid.css";

const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarGridProps {
  events?: CalendarEvent[];
  date: Date;
  view: View;
  onView: (view: View) => void;
  onNavigate: (newDate: Date) => void;
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: any) => void;
}

type RbcEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: CalendarEvent;
};

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

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events = [],
  date,
  view,
  onView,
  onNavigate,
  onSelectSlot,
  onSelectEvent,
}) => {
  const handleDrillDown = (newDate: Date) => {
    onNavigate(newDate);
    onView(Views.DAY);
  };

  const { components, eventStyleGetter, rbcEvents, min, max } = useMemo(() => {
    const rbcEvents: RbcEvent[] = events.map((e) => ({
      title: e.title || e.patient,
      start: new Date(`${e.date}T${e.startTime}:00`),
      end: new Date(`${e.date}T${e.endTime}:00`),
      allDay: false,
      resource: e,
    }));

    // sobrescrevendo o header sem criar div extra
    const CustomHeader = ({ date }: HeaderProps) => {
      const dayName = format(date, "EEE", { locale: ptBR });
      const dayNumber = format(date, "d");
      const isCurrentDay = isToday(date);
      return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center py-2">
          <span className="text-xs uppercase text-[var(--text-secondary)]">
            {dayName}
          </span>
          <div
            className={`mt-1 flex items-center justify-center h-7 w-7 rounded-full text-sm font-medium ${
              isCurrentDay
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-primary)]"
            }`}
          >
            {dayNumber}
          </div>
        </div>
      );
    };

    const CustomEvent = ({ event }: { event: RbcEvent }) => {
      const { resource, start, end } = event;
      const status = resource?.status;
      const conf = STATUS_MAP[status] || STATUS_MAP.Default;
      const startTime = format(start, "HH:mm");
      const endTime = format(end, "HH:mm");

      return (
        <div className="w-full h-full overflow-hidden flex flex-col justify-start p-1">
          <div className="flex items-start justify-between w-full">
            <p className="font-medium truncate shrink min-w-0 text-sm text-[var(--text-primary)] leading-tight">
              {resource?.patient || event.title}
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
            {startTime} - {endTime}
          </p>
        </div>
      );
    };

    const eventStyleGetter: EventPropGetter<RbcEvent> = (event) => {
      const status = event.resource?.status;
      const conf = STATUS_MAP[status] || STATUS_MAP.Default;
      return {
        style: {
          borderLeft: `4px solid ${conf.border}`,
          backgroundColor: "var(--card-bg)",
          borderRadius: "4px",
          padding: "2px 4px",
          fontSize: "12px",
          cursor: "pointer",
          color: "var(--text-primary)",
        },
      };
    };

    const todayForMinMax = new Date();
    const min = setMinutes(setHours(startOfDay(todayForMinMax), 8), 0);
    const max = setMinutes(setHours(startOfDay(todayForMinMax), 18), 0);

    return {
      components: {
        event: CustomEvent,
        timeGutterHeader: () => null, // remove div extra
        week: { header: CustomHeader },
        day: { header: CustomHeader },
      },
      eventStyleGetter,
      rbcEvents,
      min,
      max,
    };
  }, [events]);

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--card-border)]">
      <div className="h-[75vh] calendar-container">
        <Calendar
          localizer={localizer}
          events={rbcEvents}
          date={date}
          view={view}
          onNavigate={(newDate) => onNavigate(newDate)}
          onView={onView}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          onDrillDown={handleDrillDown}
          selectable
          culture="pt-BR"
          step={30}
          timeslots={2}
          min={min}
          max={max}
          toolbar={false}
          eventPropGetter={eventStyleGetter}
          components={components}
          messages={{
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            today: "Hoje",
            previous: "Anterior",
            next: "Próximo",
            noEventsInRange: "Não há consultas neste período.",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarGrid;
