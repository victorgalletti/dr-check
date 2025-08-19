"use client";

import React from "react";
import Header from "@/components/header/header";
import { MdWarning } from "react-icons/md";

// ==== Início: StatCard
type StatCardProps = {
  icon: React.ReactNode;
  bgColor?: string;
  title: string;
  value: string | number;
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  bgColor = "bg-[var(--accent)]", // Cor padrão agora usa uma variável
  title,
  value,
}) => {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:translate-y-px transition border border-[var(--card-border)]">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {title}
        </span>
        <span className="text-2xl font-bold text-[var(--text-primary)]">
          {value}
        </span>
      </div>
    </div>
  );
};
// ==== Fim: StatCard

// ==== Início: ActivityItem
type ActivityItemProps = {
  icon: React.ReactNode;
  iconBgColor?: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBgColor = "bg-[var(--hover-bg)]",
  title,
  subtitle,
  timestamp,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconBgColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {title}
        </p>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        )}
        {timestamp && (
          <p className="text-xs text-[var(--text-secondary)] opacity-75 mt-1">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};
// ==== Fim: ActivityItem

// ==== Início: AlertNotice
type AlertNoticeProps = {
  message: string;
  variant?: "info" | "warning" | "success" | "error";
};

// Objeto de estilos agora usa variáveis de tema
const alertStyles = {
  info: "bg-[var(--info-bg)] text-[var(--info-color)] border-[var(--info-border)]",
  warning:
    "bg-[var(--warning-bg)] text-[var(--warning-color)] border-[var(--warning-border)]",
  success:
    "bg-[var(--success-bg)] text-[var(--success-color)] border-[var(--success-border)]",
  error:
    "bg-[var(--danger-bg)] text-[var(--danger-color)] border-[var(--danger-border)]",
};

const AlertNotice: React.FC<AlertNoticeProps> = ({
  message,
  variant = "warning",
}) => {
  return (
    <div
      className={`mt-6 rounded-md p-4 border ${alertStyles[variant]} flex items-start gap-3`}
    >
      <svg
        className="h-5 w-5 mt-0.5 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
};
// ==== Fim: AlertNotice

// ==== Início: WelcomeCard
type WelcomeCardProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) => {
  return (
    <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm flex items-center justify-between border border-[var(--card-border)]">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {ctaText && (
        <button
          onClick={onCtaClick}
          className="inline-flex items-center rounded-md bg-[var(--success-color)] px-4 py-2 text-white hover:brightness-95 transition"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};
// ==== Fim: WelcomeCard

// ==== Início: Página Estoque
const EstoquePage: React.FC = () => {
  const statCardsData = [
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4"
          />
        </svg>
      ),
      bgColor: "bg-[var(--info-color)]",
      title: "Itens em Estoque",
      value: 124,
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8V7m0 10v1"
          />
        </svg>
      ),
      bgColor: "bg-[var(--payment-color)]",
      title: "Valor em Estoque",
      value: "R$ 18.240",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-yellow-500",
      title: "Pedidos Pendentes",
      value: 5,
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-[var(--success-color)]",
      title: "Itens OK (Sem Risco)",
      value: 97,
    },
  ];

  const activityLogData = [
    {
      icon: (
        <svg
          className="h-4 w-4 text-[var(--info-color)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3M5 3v4m14-4v4M3 13h18"
          />
        </svg>
      ),
      iconBgColor: "bg-[var(--info-bg)]",
      title: "Entrada de material",
      subtitle: "Luvas Nitrílicas (200 un)",
      timestamp: "Há 10 minutos",
    },
    {
      icon: (
        <svg
          className="h-4 w-4 text-[var(--success-color)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      iconBgColor: "bg-[var(--success-bg)]",
      title: "Pedido confirmado",
      subtitle: "Máscaras Cirúrgicas (500 un) - Fornec. ABC",
      timestamp: "Há 25 minutos",
    },
    {
      icon: (
        <svg
          className="h-4 w-4 text-[var(--payment-color)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1"
          />
        </svg>
      ),
      iconBgColor: "bg-[var(--payment-bg)]",
      title: "Baixa por uso",
      subtitle: "Soro Fisiológico 0,9% (10 un)",
      timestamp: "Há 1 hora",
    },
    {
      icon: (
        <svg
          className="h-4 w-4 text-[var(--danger-color)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ),
      iconBgColor: "bg-[var(--danger-bg)]",
      title: "Pedido cancelado",
      subtitle: "Gaze Estéril (100 un)",
      timestamp: "Há 2 horas",
    },
  ];

  const criticalItems = [
    { item: "Luvas descartáveis (M)", estoque: 120, minimo: 150 },
    { item: "Álcool 70% 500ml", estoque: 8, minimo: 20 },
    { item: "Máscara cirúrgica", estoque: 60, minimo: 100 },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="md:pl-[var(--sidebar-w,16rem)] transition-[padding] duration-300 ease-in-out">
        <Header title="Estoque" />
        <main className="p-4 sm:p-6 md:p-8">
          <div className="w-full space-y-6 sm:space-y-8">
            <WelcomeCard
              title="Controle de Estoque"
              subtitle="Visão geral dos insumos e materiais da clínica"
            />

            <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {statCardsData.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-12 xl:col-span-8 2xl:col-span-9 bg-[var(--card-bg)] rounded-2xl shadow-sm p-4 sm:p-6 border border-[var(--card-border)]">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-4">
                  Movimentação do Estoque (30 dias)
                </h3>
                <div className="h-[300px] lg:h-[360px] rounded-lg border border-dashed border-[var(--card-border)] flex items-center justify-center bg-[var(--background)]">
                  <p className="text-sm text-[var(--text-secondary)]">
                    Gráfico de Movimentação (placeholder)
                  </p>
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mt-6 mb-4">
                  Itens com Nível Crítico
                </h4>
                <div className="overflow-auto rounded-lg border border-[var(--card-border)]">
                  <table className="min-w-full divide-y divide-[var(--card-border)]">
                    <thead className="bg-[var(--background)]">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Em estoque
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Mínimo
                        </th>
                        <th className="px-4 sm:px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--card-border)] text-sm">
                      {criticalItems.map((row) => (
                        <tr key={row.item}>
                          <td className="px-4 sm:px-6 py-4 text-[var(--text-primary)]">
                            {row.item}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-[var(--text-primary)]">
                            {row.estoque}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-[var(--text-primary)]">
                            {row.minimo}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <button className="px-3 py-1.5 rounded-md text-xs bg-[var(--danger-color)] text-white hover:brightness-95">
                              Repor
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-span-12 xl:col-span-4 2xl:col-span-3 bg-[var(--card-bg)] rounded-2xl shadow-sm p-4 sm:p-6 border border-[var(--card-border)]">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-4">
                  Últimas Atividades
                </h3>
                <div className="space-y-4">
                  {activityLogData.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>
            </div>

            <AlertNotice
              variant="warning"
              message="Estoque de luvas descartáveis está baixo. Necessário reposição nos próximos 5 dias."
            />
          </div>
        </main>
      </div>
    </div>
  );
};
// ==== Fim: Página Estoque

export default EstoquePage;
