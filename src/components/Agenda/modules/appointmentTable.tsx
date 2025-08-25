"use client";

import React from "react";
import { Appointment } from "../types/types";

interface AppointmentTableProps {
  appointments?: Appointment[];
  date: string;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = [],
  date,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelada":
        return "bg-[var(--danger-bg)] text-[var(--danger-color)]";
      case "Confirmada":
        return "bg-[var(--success-bg)] text-[var(--success-color)]";
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-black/5 text-[var(--text-secondary)]";
    }
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-4 sm:p-6 border border-[var(--card-border)]">
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4">
        Consultas de Hoje ({date})
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--card-border)]">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Paciente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Horário
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--card-border)]">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[var(--text-primary)] font-medium">
                        {appointment.patient.initials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[var(--text-primary)]">
                          {appointment.patient.name}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {appointment.patient.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--text-primary)]">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--text-primary)]">
                      {appointment.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center space-x-4">
                      <button className="text-[var(--accent)] hover:opacity-75 transition-opacity">
                        Detalhes
                      </button>
                      <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        Reagendar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-[var(--text-secondary)]"
                >
                  Nenhuma consulta para hoje.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
// ...existing code...
