// app/prontuario/[patientId]/_components/PatientHeader.tsx

import { ShieldAlert, Info } from "lucide-react";
import { formatBirthdate, PatientInfo } from "@/lib/utils";

export const PatientHeader = ({ patient }: { patient: PatientInfo }) => {
  if (!patient || Object.keys(patient).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      <img
        src={patient.foto}
        alt={`Foto de ${patient.nomeCompleto}`}
        className="size-24 rounded-full border-2 border-[var(--card-border)] object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {patient.nomeCompleto}
        </h1>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
          <p>Nascimento: {formatBirthdate(patient.nascimento)}</p>
          <p>CPF: {patient.cpf}</p>
          <p>Convênio: {patient.convenio}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {patient.alergias?.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--danger-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--danger-color)]">
              <ShieldAlert className="size-3.5" /> Alergias
            </span>
          )}
          {patient.riscos?.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--info-color)]">
              <Info className="size-3.5" /> Riscos
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
