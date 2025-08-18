// app/prontuario/[patientId]/_components/HistoricoTab.tsx

import { MdMedicalServices, MdAssignment, MdScience, MdArticle } from 'react-icons/md';
import { HistoryRecord } from '@/lib/utils';

export const HistoricoTab = ({ data }: { data: HistoryRecord[] }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Novo Atendimento</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Registre uma nova consulta, procedimento ou anotação.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
            <MdMedicalServices className="size-5" /> Atendimento
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
            <MdAssignment className="size-5" /> Procedimento
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
            <MdScience className="size-5" /> Resultado de Exame
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Histórico de Atendimentos</h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.data} - {item.profissional}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.queixa}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--info-color)]">
                    {item.status}
                  </span>
                  <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                    <MdArticle className="size-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};