"use client";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
// app/prontuario/[patientId]/page.tsx

import { useState } from "react";
import { notFound } from "next/navigation";

import {
  PatientRecordTabs,
  TabKey,
} from "../../components/Prontuario/PatientRecordTabs";
import { PatientHeader } from "../../components/Prontuario/PatientHeader";
import { PatientQuickActions } from "../../components/Prontuario/PatientQuickActions";

import { mockPermissions } from "@/lib/mocks";
import { useMockData } from "@/lib/utils";

export default function PatientRecordPage({
  params,
}: {
  params: { patientId: string };
}) {
  const { data, status } = useMockData(params.patientId);
  const [activeTab, setActiveTab] = useState<TabKey>("historico");

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (status === "error" || !data) {
    return notFound();
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <div
        style={{ paddingLeft: "var(--sidebar-w)" }}
        className="transition-all duration-300 ease-in-out"
      >
        <Header title="Prontuário" />
        <div className="flex flex-col gap-6 p-6">
          <PatientHeader patient={data.ficha} />

          <PatientQuickActions />

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
            <PatientRecordTabs
              data={data}
              permissions={mockPermissions}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
