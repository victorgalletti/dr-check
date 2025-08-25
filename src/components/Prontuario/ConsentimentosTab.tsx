// app/prontuario/[patientId]/_components/ConsentimentosTab.tsx

import { ShieldCheck, Plus, MoreVertical } from "lucide-react";
import { Consent, Permissions } from "@/lib/utils";

export const ConsentimentosTab = ({
  data,
  permissions,
}: {
  data: Consent[];
  permissions: Permissions;
}) => {
  return (
    <div className="space-y-6">
      {permissions.canEdit && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Gerenciar Consentimentos
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Gerencie as permissões de uso de dados do paciente conforme a LGPD.
          </p>
          <div className="mt-4">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] hover:bg-rose-700">
              <Plus className="size-5" />
              Coletar Novo Consentimento
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Histórico de Consentimentos
        </h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {item.finalidade}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Coletado em: {item.data_coleta}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[var(--success-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--success-color)]">
                    <ShieldCheck className="size-3.5" /> {item.status}
                  </span>
                  <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                    <MoreVertical className="size-5" />
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
