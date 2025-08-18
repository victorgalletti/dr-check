// app/prontuario/[patientId]/_components/AnotacoesTab.tsx

import { MdLock, MdGroups, MdMoreVert, MdNoteAdd } from 'react-icons/md';

// Definição das interfaces
interface Note {
  id: number;
  texto: string;
  autor: string;
  data: string;
  privada: boolean;
}

interface Permissions {
  canViewSensitive: boolean;
  canSign: boolean;
  canUpload: boolean;
  canEdit: boolean;
}

// Componente principal AnotacoesTab
export const AnotacoesTab = ({ data, permissions }: { data: Note[]; permissions: Permissions }) => {
  return (
    <div className="space-y-6">
      {/* Seção para criar uma nova anotação */}
      {permissions.canEdit && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Nova Anotação</h3>
          
          <textarea
            className="mt-4 block w-full rounded-lg border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:ring-[var(--accent)]"
            rows={4}
            placeholder="Digite sua anotação..."
          ></textarea>
          
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <input
                type="checkbox"
                id="privada"
                className="rounded-full border-[var(--card-border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor="privada" className="text-sm">
                Privada (visível apenas para você)
              </label>
            </div>
            
            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] hover:opacity-90 transition-opacity">
              <MdNoteAdd className="size-5" />
              Salvar Anotação
            </button>
          </div>
        </div>
      )}

      {/* Seção de anotações recentes */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Anotações Recentes</h3>
        
        {data.length === 0 ? (
          <p className="mt-4 text-[var(--text-secondary)]">Nenhuma anotação encontrada.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--card-border)]">
            {data.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--text-primary)]">
                      {item.autor}
                      <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">em {item.data}</span>
                    </p>
                    <p className="mt-2 text-[var(--text-secondary)]">{item.texto}</p>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center gap-2 ml-4">
                    {item.privada ? (
                      <MdLock className="size-4 text-[var(--text-secondary)]" title="Anotação Privada" />
                    ) : (
                      <MdGroups className="size-4 text-[var(--text-secondary)]" title="Visível para Equipe" />
                    )}
                    <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]">
                      <MdMoreVert className="size-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};