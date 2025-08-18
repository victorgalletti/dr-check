// app/prontuario/[patientId]/page.tsx

'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

import { PatientRecordTabs, TabKey } from '../components/Prontuario/PatientRecordTabs';
import { PatientHeader } from '../components/Prontuario/PatientHeader';
import { PatientQuickActions } from '../components/Prontuario/PatientQuickActions';

import { mockPermissions } from '@/lib/mocks';
import { useMockData } from '@/lib/utils';

export default function PatientRecordPage({ params }: { params: { patientId: string } }) {
  const { data, status } = useMockData(params.patientId);
  const [activeTab, setActiveTab] = useState<TabKey>('historico');

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (status === 'error' || !data) {
    return notFound();
  }

  return (
    // Usa um wrapper flexível para o conteúdo
    <div className="flex w-full">
      {/* Ocupa o espaço da sidebar, mas não renderiza nada */}
      <div className="hidden md:block" style={{ width: 'var(--sidebar-w)' }}></div>
      
      {/* Conteúdo principal que se ajusta automaticamente */}
      <main className="flex-1 min-h-screen">
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
      </main>
    </div>
  );
}