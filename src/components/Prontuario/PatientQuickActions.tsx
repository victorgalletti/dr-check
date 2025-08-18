// app/prontuario/[patientId]/_components/PatientQuickActions.tsx

import {
  MdNoteAdd,
  MdMedicalServices,
  MdAttachFile,
  MdMoreVert,
} from 'react-icons/md';

export const PatientQuickActions = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-white hover:bg-rose-700">
        <MdNoteAdd className="size-5" />
        <span>Nova Consulta</span>
      </button>
      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
        <MdMedicalServices className="size-5" />
        <span>Nova Receita</span>
      </button>
      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
        <MdAttachFile className="size-5" />
        <span>Anexar Arquivo</span>
      </button>
      <button className="rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100">
        <MdMoreVert className="size-5" />
      </button>
    </div>
  );
};