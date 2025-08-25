// app/prontuario/[patientId]/_components/DocumentosTab.tsx

import { FileText, ClipboardCheck, QrCode, MoreVertical } from "lucide-react";
import { Document, Permissions } from "@/lib/utils";

export const DocumentosTab = ({
  data,
  permissions,
}: {
  data: Document[];
  permissions: Permissions;
}) => {
  return (
    <div className="space-y-6">
      {permissions.canEdit && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Novo Documento
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Crie documentos a partir de modelos.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
              <FileText className="size-5" /> Atestado Médico
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
              <ClipboardCheck className="size-5" /> Declaração de Comparecimento
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Documentos Gerados
        </h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {item.tipo}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Emitido por: {item.autor}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {item.assinatura && (
                  <span className="inline-flex items-center rounded-full bg-[var(--success-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--success-color)]">
                    <QrCode className="size-3.5" /> Assinado
                  </span>
                )}
                <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                  <MoreVertical className="size-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
