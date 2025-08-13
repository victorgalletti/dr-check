"use client";

import React, { useState } from "react";
import SummaryCard, {
  PlusIcon,
  MinusIcon,
  BalanceIcon,
  DueIcon,
} from "./modules/summaryCard";
import FilterButtons from "./modules/filterButtons";
import DataTable, { ColumnDefinition } from "./modules/dataTable";
import StatusBadge from "./modules/statusBadge";
import BillingByInsuranceTable from "./modules/billingByInsurance";

// Componente para navegação por abas
const TabsNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { name: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => (
  <div className="border-b border-gray-200">
    <nav className="flex -mb-px">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          className={`${
            activeTab === tab.name
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  </div>
);

const FinanceiroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Lançamentos");
  const [activeFilter, setActiveFilter] = useState("Mensal");

  // Dados de exemplo para lançamentos
  const financialEntries = [
    {
      date: "21/04/2025",
      description: "Consulta - João Pereira",
      category: "Consultas",
      value: "350,00",
      status: "Pago",
    },
    {
      date: "20/04/2025",
      description: "Aluguel da Clínica",
      category: "Despesas Fixas",
      value: "3.500,00",
      status: "Pago",
      isExpense: true,
    },
    {
      date: "19/04/2025",
      description: "Convênio ABC - Faturamento Mensal",
      category: "Convênios",
      value: "12.450,00",
      status: "A Receber",
    },
    {
      date: "18/04/2025",
      description: "Compra de Material de Escritório",
      category: "Materiais",
      value: "450,00",
      status: "Pago",
      isExpense: true,
    },
  ];

  // Dados de exemplo para convênios
  const insuranceData = [
    { agreement: "Convênio ABC", value: "R$ 18.450,00", percentage: "42%" },
    { agreement: "Convênio XYZ", value: "R$ 12.300,00", percentage: "28%" },
    { agreement: "Particular", value: "R$ 8.750,00", percentage: "20%" },
    { agreement: "Outros", value: "R$ 4.350,00", percentage: "10%" },
  ];

  // Definição das colunas da tabela de lançamentos
  const columns: ColumnDefinition<any>[] = [
    { key: "date", header: "Data" },
    { key: "description", header: "Descrição" },
    { key: "category", header: "Categoria" },
    {
      key: "value",
      header: "Valor",
      render: (item) => (
        <span
          className={`font-medium ${
            item.isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          R$ {item.value}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Ações",
      render: () => (
        <div className="flex space-x-2">
          <button className="text-indigo-600 hover:text-indigo-900">
            Detalhes
          </button>
          <button className="text-gray-600 hover:text-gray-900">Editar</button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Resumo Financeiro */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
              Resumo Financeiro - Abril 2025
            </h3>
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <SummaryCard
              title="Receitas"
              value="R$ 45.850,00"
              icon={<PlusIcon />}
              bgColor="bg-green-50"
              borderColor="border-green-200"
              iconBgColor="bg-green-500"
            />
            <SummaryCard
              title="Despesas"
              value="R$ 28.320,00"
              icon={<MinusIcon />}
              bgColor="bg-red-50"
              borderColor="border-red-200"
              iconBgColor="bg-red-500"
            />
            <SummaryCard
              title="Saldo"
              value="R$ 17.530,00"
              icon={<BalanceIcon />}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
              iconBgColor="bg-blue-500"
            />
            <SummaryCard
              title="A Receber"
              value="R$ 12.450,00"
              icon={<DueIcon />}
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
              iconBgColor="bg-purple-500"
            />
          </div>
        </div>

        {/* Gráfico Financeiro */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Desempenho Financeiro
          </h3>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Gráfico de Desempenho Financeiro</p>
          </div>
        </div>

        {/* Abas e Conteúdo */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <TabsNavigation
            tabs={[
              { name: "Lançamentos" },
              { name: "Faturamento" },
              { name: "Comissões" },
              { name: "Relatórios" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {activeTab === "Lançamentos" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Lançamentos Recentes
                </h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium flex items-center">
                  <PlusIcon />
                  <span className="ml-1">Novo Lançamento</span>
                </button>
              </div>
              <DataTable columns={columns} data={financialEntries} />
            </div>
          )}
        </div>

        {/* Faturamento por Convênio */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Faturamento por Convênio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">
                Gráfico de Faturamento por Convênio
              </p>
            </div>
            <BillingByInsuranceTable data={insuranceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroPage;
