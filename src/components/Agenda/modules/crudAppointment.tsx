"use client";
import React, { useState, useEffect } from "react";

export interface AppointmentData {
  id?: string;
  patientName: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  duration: number; // minutos
  notes?: string;
}

interface CrudAppointmentProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentData) => Promise<void> | void;
  initialData?: AppointmentData | null;
}

const emptyForm: AppointmentData = {
  patientName: "",
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toISOString().slice(11, 16),
  duration: 30,
  notes: "",
};

const CrudAppointment: React.FC<CrudAppointmentProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState<AppointmentData>(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...initialData } : emptyForm);
    }
  }, [open, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "duration" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      {/* Conteúdo */}
      <div className="relative w-full max-w-lg mx-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-lg animate-in fade-in zoom-in p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {form.id ? "Editar Consulta" : "Nova Consulta"}
          </h2>
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => !loading && onClose()}
            aria-label="Fechar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Paciente</label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-black/5 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Nome do paciente"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-black/5 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-black/5 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Duração (min)
              </label>
              <input
                type="number"
                name="duration"
                min={5}
                step={5}
                value={form.duration}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-black/5 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Observações
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none rounded-md bg-black/5 dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Detalhes adicionais..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => !loading && onClose()}
              className="px-4 py-2 text-sm rounded-md bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudAppointment;
// ...existing code...
