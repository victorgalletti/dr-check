// app/prontuario/[patientId]/_components/ExamesTab.tsx

import { MdScience, MdMoreVert } from 'react-icons/md';
import { Exam, Permissions } from '@/lib/utils';

export const ExamesTab = ({ data, permissions }: { data: Exam[]; permissions: Permissions }) => {
  return (
    <div className="space-y-6">
      {permissions.canEdit && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Novo Pedido de Exame</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Solicite exames para o paciente.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="categoria" className="text-sm font-medium text-[var(--text-primary)]">Categoria</label>
              <input type="text" id="categoria" className="mt-1 block w-full rounded-lg border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:ring-[var(--accent)]" placeholder="Ex: Sangue, Imagem, etc." />
            </div>
            <div>
              <label htmlFor="cid" className="text-sm font-medium text-[var(--text-primary)]">Hipótese Diagnóstica (CID-10)</label>
              <input type="text" id="cid" className="mt-1 block w-full rounded-lg border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:ring-[var(--accent)]" placeholder="Pesquise por código ou nome" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] hover:bg-rose-700">
              <MdScience className="size-5" />
              Solicitar Exame
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Pedidos de Exames</h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{item.nome}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">Solicitado em: {item.data_solicitacao}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--info-color)]">
                  {item.status}
                </span>
                <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                  <MdMoreVert className="size-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};