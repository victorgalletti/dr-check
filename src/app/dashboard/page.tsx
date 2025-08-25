// src/pages/Dashboard.tsx
"use client";

import React, { useMemo, useEffect, useState } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import WelcomeCard from "@/components/Dashboard/welcomeCard";
import StatCard from "@/components/Dashboard/statCard";
import ActivityItem from "@/components/Dashboard/activityItem";
import AlertNotice from "@/components/Dashboard/alertNotice";
import { statCardsData } from "@/components/Dashboard/mockData/statCardsData";
import { activityLogData } from "@/components/Dashboard/mockData/activityLogData";
import { useTheme } from "@/contexts/themeContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// Helpers do gráfico
type RangeKey = "7d" | "30d" | "90d";
const rangeToDays: Record<RangeKey, number> = { "7d": 7, "30d": 30, "90d": 90 };
const fmtShort = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(
    d
  );

function generateSeries(days: number) {
  const base = new Date();
  const data: Array<{
    date: string;
    consultas: number;
    confirmadas: number;
    faturamento: number;
  }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const t = (days - i) / days;
    const consultas = Math.round(
      8 + 6 * Math.sin(t * Math.PI) + (Math.random() * 2 - 1)
    );
    const confirmadas = Math.max(
      0,
      Math.round(consultas * (0.6 + 0.15 * Math.sin(t * Math.PI * 1.2)))
    );
    const faturamento = Math.round(
      confirmadas * (220 + 40 * Math.sin(t * Math.PI * 0.9))
    );
    data.push({ date: fmtShort(d), consultas, confirmadas, faturamento });
  }
  return data;
}

const RangeTabs: React.FC<{
  value: RangeKey;
  onChange: (r: RangeKey) => void;
}> = ({ value, onChange }) => (
  <div className="inline-flex rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-1 text-sm">
    {(["7d", "30d", "90d"] as RangeKey[]).map((key) => (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        className={`px-3 py-1.5 rounded-md transition ${
          value === key
            ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm"
            : "text-[var(--text-primary)] hover:bg-gray-500/10"
        }`}
        aria-pressed={value === key}
      >
        {key.toUpperCase()}
      </button>
    ))}
  </div>
);

const PerformanceChart: React.FC<{ days: number }> = ({ days }) => {
  const data = useMemo(() => generateSeries(days), [days]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="gradConsultas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
        <XAxis
          dataKey="date"
          tickMargin={6}
          tick={{ fill: "var(--text-secondary)" }}
        />
        <YAxis tickMargin={6} tick={{ fill: "var(--text-secondary)" }} />

        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-primary)",
          }}
        />

        <Area
          type="monotone"
          dataKey="consultas"
          name="Consultas"
          strokeWidth={2}
          stroke="var(--accent)"
          fillOpacity={1}
          fill="url(#gradConsultas)"
        />
        <Area
          type="monotone"
          dataKey="confirmadas"
          name="Confirmadas"
          strokeWidth={2}
          stroke="#82ca9d"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="faturamento"
          name="Faturamento"
          strokeWidth={2}
          stroke="#8884d8"
          fillOpacity={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const Dashboard: React.FC = () => {
  const [range, setRange] = useState<RangeKey>("30d");
  const { theme, toggleTheme } = useTheme();

  const todayLabel = useMemo(() => {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return capitalize(fmt.format(now));
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <div className="md:pl-[var(--sidebar-w,16rem)] transition-[padding] duration-300 ease-in-out">
        <Header title="Dashboard" />
        <main
          className="p-4 sm:p-6 md:p-8"
          style={{ background: "var(--background)" }}
        >
          <div className="w-full space-y-6 sm:space-y-8">
            <WelcomeCard
              title="Bem-vindo, Dr. Ricardo!"
              subtitle={`Hoje é ${todayLabel}`}
            />

            {/* StatCards ocupando a largura com auto-fit */}
            <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {statCardsData.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            {/* Grid 12 colunas para seções principais */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              {/* CARD DO GRÁFICO */}
              <div className="col-span-12 xl:col-span-8 2xl:col-span-9 bg-[var(--card-bg)] rounded-2xl shadow-sm p-4 sm:p-6 border border-[var(--card-border)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    Desempenho Mensal
                  </h3>
                  <RangeTabs value={range} onChange={setRange} />
                </div>
                <div className="mt-4 h-[320px] lg:h-[360px]">
                  {/* Seu PerformanceChart vai funcionar perfeitamente aqui agora */}
                  <PerformanceChart days={rangeToDays[range]} />
                </div>
              </div>

              {/* CARD DE ÚLTIMAS ATIVIDADES (Aproveite para corrigir também) */}
              <div className="col-span-12 xl:col-span-4 2xl:col-span-3 bg-[var(--card-bg)] rounded-2xl shadow-sm p-4 sm:p-6 border border-[var(--card-border)]">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4">
                  Últimas Atividades
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {activityLogData.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>
            </div>

            <AlertNotice message="Estoque de luvas descartáveis está baixo. Necessário reposição nos próximos 5 dias." />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
