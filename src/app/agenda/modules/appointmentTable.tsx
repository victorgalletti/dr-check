"use client";

import React from "react";

// Tipos para os dados da consulta. O ideal é que fiquem num ficheiro partilhado, como 'src/types.ts'
export interface Appointment {
  id: number;
  time: string;
  type: string;
  status: "Confirmada" | "Cancelada" | "Aguardando";
  patient: {
    name: string;
    email: string;
    initials: string;
  };
}

interface AppointmentTableProps {
  // A propriedade appointments agora é opcional
  appointments?: Appointment[];
  date: string;
}

// Adicionado um valor por defeito ([]) para a propriedade appointments
const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = [],
  date,
}) => {
  // Função para determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelada":
        return "bg-red-100 text-red-800";
      case "Confirmada":
        return "bg-green-100 text-green-800";
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // Wrapper com sombra e padding
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Consultas de Hoje ({date})
      </h3>

      {/* O wrapper da tabela agora usa overflow-hidden */}
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Paciente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Horário
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Adicionada uma verificação para exibir uma mensagem se não houver consultas */}
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {appointment.patient.initials}
                      </div>
                      {/* A margem foi movida para este div, como no novo layout */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.patient.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Texto envolvido por um div, como no novo layout */}
                    <div className="text-sm text-gray-900">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Texto envolvido por um div */}
                    <div className="text-sm text-gray-900">
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
                  {/* Célula de ações com as classes e botões atualizados */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Detalhes
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Reagendar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Mensagem a ser exibida se a lista de consultas estiver vazia
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
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
