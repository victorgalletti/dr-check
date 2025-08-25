// app/prontuario/[patientId]/_components/FichaTab.tsx

import { Hospital, HeartPulse, User } from "lucide-react";
import { calculateIMC, PatientInfo } from "@/lib/utils";

export const FichaTab = ({ data }: { data: PatientInfo }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm text-center">
        <p className="text-[var(--text-secondary)]">
          Nenhuma ficha clínica encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <div className="flex items-center gap-3 text-[var(--text-primary)]">
            <div className="size-10 flex items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
              <User className="size-6" />
            </div>
            <h3 className="text-lg font-semibold">Informações Pessoais</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Nome Completo:
              </span>{" "}
              {data.nomeCompleto}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                CPF:
              </span>{" "}
              {data.cpf}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Telefone:
              </span>{" "}
              {data.telefone}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Email:
              </span>{" "}
              {data.email}
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <div className="flex items-center gap-3 text-[var(--text-primary)]">
            <div className="size-10 flex items-center justify-center rounded-full bg-[var(--success-color)] text-[var(--accent-foreground)]">
              <HeartPulse className="size-6" />
            </div>
            <h3 className="text-lg font-semibold">Sinais Vitais</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                PA:
              </span>{" "}
              {data.sinais_vitais?.pa}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                FC:
              </span>{" "}
              {data.sinais_vitais?.fc}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Temperatura:
              </span>{" "}
              {data.sinais_vitais?.temp}
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Peso:
              </span>{" "}
              {data.sinais_vitais?.peso} kg
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                Altura:
              </span>{" "}
              {data.sinais_vitais?.altura} m
            </li>
            <li>
              <span className="font-semibold text-[var(--text-primary)]">
                IMC:
              </span>{" "}
              {calculateIMC(
                data.sinais_vitais?.peso,
                data.sinais_vitais?.altura
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <div className="flex items-center gap-3 text-[var(--text-primary)]">
          <div className="size-10 flex items-center justify-center rounded-full bg-[var(--info-color)] text-[var(--accent-foreground)]">
            <Hospital className="size-6" />
          </div>
          <h3 className="text-lg font-semibold">Informações Médicas</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
          <li>
            <span className="font-semibold text-[var(--text-primary)]">
              Convênio:
            </span>{" "}
            {data.convenio}
          </li>
          <li>
            <span className="font-semibold text-[var(--text-primary)]">
              Alergias:
            </span>{" "}
            {data.alergias && data.alergias.length > 0
              ? data.alergias.join(", ")
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-[var(--text-primary)]">
              Riscos e Condições:
            </span>{" "}
            {data.riscos && data.riscos.length > 0
              ? data.riscos.join(", ")
              : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};
