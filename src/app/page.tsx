// src/pages/Dashboard.tsx
"use client"

import React, { useMemo, useState } from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import Header from '@/components/Dashboard/header'
import WelcomeCard from '@/components/Dashboard/welcomecard'
import StatCard from '@/components/Dashboard/statcard'
import ActivityItem from '@/components/Dashboard/activityItem'
import AlertNotice from '@/components/Dashboard/alertnotice'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)

// Helpers do gráfico
type RangeKey = '7d' | '30d' | '90d'
const rangeToDays: Record<RangeKey, number> = { '7d': 7, '30d': 30, '90d': 90 }
const fmtShort = (d: Date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(d)

function generateSeries(days: number) {
  const base = new Date()
  const data: Array<{ date: string; consultas: number; confirmadas: number; faturamento: number }> = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(base); d.setDate(base.getDate() - i)
    const t = (days - i) / days
    const consultas = Math.round(8 + 6 * Math.sin(t * Math.PI) + (Math.random() * 2 - 1))
    const confirmadas = Math.max(0, Math.round(consultas * (0.6 + 0.15 * Math.sin(t * Math.PI * 1.2))))
    const faturamento = Math.round(confirmadas * (220 + 40 * Math.sin(t * Math.PI * 0.9)))
    data.push({ date: fmtShort(d), consultas, confirmadas, faturamento })
  }
  return data
}

const RangeTabs: React.FC<{ value: RangeKey; onChange: (r: RangeKey) => void }> = ({ value, onChange }) => (
  <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
    {(['7d', '30d', '90d'] as RangeKey[]).map((key) => (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        className={[
          'px-3 py-1.5 rounded-md transition',
          value === key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50',
        ].join(' ')}
        aria-pressed={value === key}
      >
        {key.toUpperCase()}
      </button>
    ))}
  </div>
)

const PerformanceChart: React.FC<{ days: number }> = ({ days }) => {
  const data = useMemo(() => generateSeries(days), [days])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="gradConsultas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopOpacity={0.35} />
            <stop offset="95%" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradConfirmadas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopOpacity={0.35} />
            <stop offset="95%" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradFaturamento" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopOpacity={0.35} />
            <stop offset="95%" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickMargin={6} />
        <YAxis tickMargin={6} />
        <Tooltip formatter={(v: any, n: any) => (n === 'faturamento' ? `R$ ${v}` : v)} />
        <Area type="monotone" dataKey="consultas" name="Consultas" strokeWidth={2} fillOpacity={1} fill="url(#gradConsultas)" />
        <Area type="monotone" dataKey="confirmadas" name="Confirmadas" strokeWidth={2} fillOpacity={1} fill="url(#gradConfirmadas)" />
        <Area type="monotone" dataKey="faturamento" name="Faturamento" strokeWidth={2} fillOpacity={1} fill="url(#gradFaturamento)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const Dashboard: React.FC = () => {
  const [range, setRange] = useState<RangeKey>('30d')

  const todayLabel = useMemo(() => {
    const now = new Date()
    const fmt = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    return capitalize(fmt.format(now))
  }, [])

  const statCardsData = useMemo(
    () => [
      {
        icon: (
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        bgColor: 'bg-blue-500',
        title: 'Consultas Hoje',
        value: '12',
      },
      {
        icon: (
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: 'bg-green-500',
        title: 'Confirmadas',
        value: '8',
      },
      {
        icon: (
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: 'bg-yellow-500',
        title: 'Aguardando',
        value: '3',
      },
      {
        icon: (
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        bgColor: 'bg-purple-500',
        title: 'Faturamento',
        value: 'R$ 2.450',
      },
    ],
    []
  )

  const activityLogData = useMemo(
    () => [
      {
        icon: (
          <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        iconBgColor: 'bg-blue-100',
        title: 'Nova consulta agendada',
        subtitle: 'Maria Silva — 14:30',
        timestamp: 'Há 10 minutos',
      },
      {
        icon: (
          <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconBgColor: 'bg-green-100',
        title: 'Consulta confirmada',
        subtitle: 'João Pereira — 15:00',
        timestamp: 'Há 25 minutos',
      },
      {
        icon: (
          <svg className="h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconBgColor: 'bg-purple-100',
        title: 'Pagamento recebido',
        subtitle: 'R$ 350,00 — Convênio ABC',
        timestamp: 'Há 1 hora',
      },
      {
        icon: (
          <svg className="h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconBgColor: 'bg-red-100',
        title: 'Consulta cancelada',
        subtitle: 'Ana Oliveira — 09:00',
        timestamp: 'Há 2 horas',
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar fixa (já controla colapso e mobile) */}
      <Sidebar />

      {/* Conteúdo: no desktop, reservar espaço da sidebar via CSS var; no mobile, sem padding */}
      <div className="md:pl-[var(--sidebar-w,16rem)] transition-[padding] duration-300 ease-in-out">
        <Header title="Dashboard" />
        <main className="bg-gray-50 p-4 sm:p-6 md:p-8">
          <div className="w-full space-y-6 sm:space-y-8">
            <WelcomeCard title="Bem-vindo, Dr. Ricardo!" subtitle={`Hoje é ${todayLabel}`} />

            {/* StatCards ocupando a largura com auto-fit */}
            <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {statCardsData.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            {/* Grid 12 colunas para seções principais */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-12 xl:col-span-8 2xl:col-span-9 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Desempenho Mensal</h3>
                  <RangeTabs value={range} onChange={setRange} />
                </div>
                <div className="mt-4 h-[320px] lg:h-[360px] rounded-lg border border-dashed border-gray-300 bg-white">
                  <ResponsiveContainer width="100%" height="100%">
                    <PerformanceChart days={rangeToDays[range]} />
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-12 xl:col-span-4 2xl:col-span-3 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Últimas Atividades</h3>
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
  )
}

export default Dashboard
