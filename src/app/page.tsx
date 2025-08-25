import "@/components/common/logo.css";
import React from "react";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  FileText,
  BarChart3,
  CircleCheckBig,
} from "lucide-react";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="bg-[var(--card-bg)] border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <CircleCheckBig className="w-8 h-8 text-[var(--dr-green)]" />
              <h1 className="ml-2 text-xl font-bold text-[var(--text-primary)]">
                Dr. Check
              </h1>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggleButton />
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-gray-500/10"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-[var(--accent-foreground)] bg-[var(--dr-green)] transition-opacity hover:opacity-90"
              >
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <div className="mb-8">
            <CircleCheckBig className="w-16 h-16 text-[var(--dr-green)] mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Dr. Check
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
              Sua clínica organizada, seus pacientes mais felizes.
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
              Sistema completo de gestão clínica que otimiza seu atendimento e
              melhora a experiência dos seus pacientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-[var(--accent-foreground)] bg-[var(--dr-green)] transition-opacity hover:opacity-90 w-full sm:w-auto"
            >
              Começar Gratuitamente
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-[var(--text-primary)] bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-gray-500/10 w-full sm:w-auto"
            >
              Já tenho conta
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16">
            <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]">
              <Users className="w-12 h-12 text-[var(--success-color)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Gestão de Pacientes
              </h3>
              <p className="text-[var(--text-secondary)]">
                Cadastro completo e histórico médico organizado
              </p>
            </div>

            <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]">
              <CalendarDays className="w-12 h-12 text-[var(--info-color)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Agendamento
              </h3>
              <p className="text-[var(--text-secondary)]">
                Sistema inteligente de marcação de consultas
              </p>
            </div>

            <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]">
              <FileText className="w-12 h-12 text-[var(--payment-color)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Prontuário Digital
              </h3>
              <p className="text-[var(--text-secondary)]">
                Registros médicos seguros e acessíveis
              </p>
            </div>

            <div className="text-center p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]">
              <BarChart3 className="w-12 h-12 text-[var(--dr-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Relatórios
              </h3>
              <p className="text-[var(--text-secondary)]">
                Análises e insights do seu consultório
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
