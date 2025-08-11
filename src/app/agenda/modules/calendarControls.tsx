"use client";

import React from "react";

// Interface de props atualizada para incluir o estado da visualização ativa
interface CalendarControlsProps {
  currentMonth: string;
  currentYear: number;
  activeView: "Dia" | "Semana" | "Mês";
  onViewChange: (view: "Dia" | "Semana" | "Mês") => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onNewAppointment: () => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  currentMonth,
  currentYear,
  activeView,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onNewAppointment,
}) => {
  const viewOptions: ("Dia" | "Semana" | "Mês")[] = ["Dia", "Semana", "Mês"];

  return (
    // Aplicando o wrapper de "card" do agenda.html
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Estrutura flex responsiva do agenda.html */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Navegação de Mês/Ano */}
        <div className="flex items-center mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-gray-800">
            {currentMonth} {currentYear}
          </h3>
          <div className="ml-4 flex space-x-2">
            <button
              onClick={onPrevMonth}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Mês anterior"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={onNextMonth}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Próximo mês"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Seletores de Visualização e Botão de Nova Consulta */}
        <div className="flex space-x-2">
          {viewOptions.map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              // Lógica de classes para corresponder ao estilo ativo/inativo do HTML
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeView === view
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {view}
            </button>
          ))}

          {/* Botão Nova Consulta com estilo e ícone do HTML */}
          <button
            onClick={onNewAppointment}
            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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
