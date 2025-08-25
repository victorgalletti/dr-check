// app/prontuario/[patientId]/_components/ReceitasTab.tsx

import { QrCode, Printer, CheckCircle2, Clock, CircleX } from "lucide-react";
import { Prescription, Permissions } from "@/lib/utils";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Assinada":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--success-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--success-color)]">
          <CheckCircle2 className="size-3.5" /> {status}
        </span>
      );
    case "Rascunho":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--payment-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--payment-color)]">
          <Clock className="size-3.5" /> {status}
        </span>
      );
    case "Expirada":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--danger-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--danger-color)]">
          <CircleX className="size-3.5" /> {status}
        </span>
      );
    default:
      return null;
  }
};

export const ReceitasTab = ({
  data,
  permissions,
}: {
  data: Prescription[];
  permissions: Permissions;
}) => {
  return (
    <div className="space-y-6">
      {permissions.canEdit && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Nova Receita
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Preencha os dados para gerar uma nova prescrição.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="medicamento"
                className="text-sm font-medium text-[var(--text-primary)]"
              >
                Medicamento
              </label>
              <input
                type="text"
                id="medicamento"
                className="mt-1 block w-full rounded-lg border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:ring-[var(--accent)]"
                placeholder="Ex: Paracetamol 500mg"
              />
            </div>
            <div>
              <label
                htmlFor="posologia"
                className="text-sm font-medium text-[var(--text-primary)]"
              >
                Posologia
              </label>
              <input
                type="text"
                id="posologia"
                className="mt-1 block w-full rounded-lg border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:ring-[var(--accent)]"
                placeholder="Ex: 1 comprimido, de 8 em 8 horas"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button className="rounded-lg px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--card-border)]">
              Salvar Rascunho
            </button>
            {permissions.canSign && (
              <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] hover:bg-rose-700">
                <QrCode className="size-5" />
                Assinar e Gerar QR
              </button>
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Receitas Emitidas
        </h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {item.medicamento}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.posologia}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                  <Printer className="size-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
