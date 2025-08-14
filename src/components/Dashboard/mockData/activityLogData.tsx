import React from "react";

export const activityLogData = [
  {
    icon: (
      <svg
        className="h-4 w-4 text-[var(--info-color)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBgColor: "bg-[var(--info-bg)]",
    title: "Nova consulta agendada",
    subtitle: "Maria Silva — 14:30",
    timestamp: "Há 10 minutos",
  },
  {
    icon: (
      <svg
        className="h-4 w-4 text-[var(--success-color)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    iconBgColor: "bg-[var(--success-bg)]",
    title: "Consulta confirmada",
    subtitle: "João Pereira — 15:00",
    timestamp: "Há 25 minutos",
  },
  {
    icon: (
      <svg
        className="h-4 w-4 text-[var(--payment-color)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    iconBgColor: "bg-[var(--payment-bg)]",
    title: "Pagamento recebido",
    subtitle: "R$ 350,00 — Convênio ABC",
    timestamp: "Há 1 hora",
  },
  {
    icon: (
      <svg
        className="h-4 w-4 text-[var(--danger-color)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    iconBgColor: "bg-[var(--danger-bg)]",
    title: "Consulta cancelada",
    subtitle: "Ana Oliveira — 09:00",
    timestamp: "Há 2 horas",
  },
];
