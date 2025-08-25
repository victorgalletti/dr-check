"use client";

import React, { useState, useRef, useEffect } from "react";
import { add, sub } from "date-fns";

type ViewKey = "Dia" | "Semana" | "Mês" | "Agenda";

interface CalendarControlsProps {
  date: Date;
  view: string;
  onView: (view: string) => void;
  onNavigate: (newDate: Date) => void;
  onNewAppointment: () => void;
  viewMap: { [key: string]: string };
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  date,
  view,
  onView,
  onNavigate,
  onNewAppointment,
  viewMap,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentViewLabel =
    Object.keys(viewMap).find((key) => viewMap[key] === view) || "Semana";

  const handleNavigation = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "TODAY") {
      onNavigate(new Date());
      return;
    }
    const duration =
      view === "timeGridDay"
        ? { days: 1 }
        : view === "timeGridWeek"
        ? { weeks: 1 }
        : { months: 1 };
    const newDate =
      action === "PREV" ? sub(date, duration) : add(date, duration);
    onNavigate(newDate);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayDate = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  })
    .format(date)
    .replace(" de ", " de ");

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-3 sm:p-4 border border-[var(--card-border)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNavigation("TODAY")}
            className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--card-border)] text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
          >
            Hoje
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleNavigation("PREV")}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation("NEXT")}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
            {displayDate}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--card-border)] text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 flex items-center"
            >
              {currentViewLabel}
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-10">
                {(Object.keys(viewMap) as ViewKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onView(viewMap[key]);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {key}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onNewAppointment}
            className="px-3 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md text-sm font-medium flex items-center shadow-sm hover:opacity-90 transition-opacity"
          >
            <svg
              className="h-4 w-4 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Nova Consulta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
// ...existing code...
