// app/prontuario/[patientId]/_components/PatientRecordTabs.tsx

"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  History,
  Syringe,
  FlaskConical,
  Folder,
  StickyNote,
  Heart,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { PatientData, Permissions } from "@/lib/utils";

import { HistoricoTab } from "./HistoricoTab";
import { ReceitasTab } from "./ReceitasTab";
import { FichaTab } from "./FichaTab";
import { ExamesTab } from "./ExamesTab";
import { ArquivosTab } from "./ArquivosTab";
import { AnotacoesTab } from "./AnotacoesTab";
import { DocumentosTab } from "./DocumentosTab";
import { ConsentimentosTab } from "./ConsentimentosTab";

export type TabKey =
  | "historico"
  | "receitas"
  | "exames"
  | "arquivos"
  | "anotacoes"
  | "ficha"
  | "documentos"
  | "consentimentos";

interface TabPanelProps {
  tabKey: TabKey;
  data: PatientData;
  permissions: Permissions;
}

const TabPanel = ({ tabKey, data, permissions }: TabPanelProps) => {
  switch (tabKey) {
    case "historico":
      return <HistoricoTab data={data.historico} />;
    case "receitas":
      return <ReceitasTab data={data.receitas} permissions={permissions} />;
    case "exames":
      return <ExamesTab data={data.exames} permissions={permissions} />;
    case "arquivos":
      return <ArquivosTab data={data.arquivos} permissions={permissions} />;
    case "anotacoes":
      return <AnotacoesTab data={data.anotacoes} permissions={permissions} />;
    case "ficha":
      return <FichaTab data={data.ficha} />;
    case "documentos":
      return <DocumentosTab data={data.documentos} permissions={permissions} />;
    case "consentimentos":
      return (
        <ConsentimentosTab
          data={data.consentimentos}
          permissions={permissions}
        />
      );
    default:
      return (
        <div className="p-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            Aba não encontrada
          </h3>
          <p className="mt-2 text-[var(--text-secondary)]">
            Ocorreu um erro ao carregar o conteúdo da aba.
          </p>
        </div>
      );
  }
};

const tabsMap: {
  [key in TabKey]: { title: string; icon: ReactNode };
} = {
  historico: { title: "Histórico", icon: <History /> },
  receitas: { title: "Receitas", icon: <Syringe /> },
  exames: { title: "Exames", icon: <FlaskConical /> },
  arquivos: { title: "Arquivos", icon: <Folder /> },
  anotacoes: { title: "Anotações", icon: <StickyNote /> },
  ficha: { title: "Ficha Clínica", icon: <Heart /> },
  documentos: { title: "Documentos", icon: <FileText /> },
  consentimentos: { title: "Consentimentos", icon: <ShieldCheck /> },
};

export interface PatientRecordTabsProps {
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
  data: PatientData;
  permissions: Permissions;
}

export const PatientRecordTabs = ({
  activeTab,
  onTabChange,
  data,
  permissions,
}: PatientRecordTabsProps) => {
  const [currentTab, setCurrentTab] = useState<TabKey>(
    activeTab || "historico"
  );

  const handleTabClick = (tab: TabKey) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setCurrentTab(tab);
  };

  const tabs = useMemo(() => Object.keys(tabsMap) as TabKey[], []);

  return (
    <div>
      <div
        role="tablist"
        className="flex overflow-x-auto border-b border-[var(--card-border)]"
      >
        {tabs.map((tab) => {
          const isActive = tab === currentTab;
          return (
            <button
              key={tab}
              role="tab"
              id={`tab-trigger-${tab}`}
              aria-controls={`tab-panel-${tab}`}
              aria-selected={isActive}
              onClick={() => handleTabClick(tab)}
              className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-secondary)] hover:border-[var(--card-border)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tabsMap[tab].icon}
              {tabsMap[tab].title}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <TabPanel tabKey={currentTab} data={data} permissions={permissions} />
      </div>
    </div>
  );
};
