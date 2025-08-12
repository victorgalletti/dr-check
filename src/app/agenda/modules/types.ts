export interface Patient {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  time: string;
  type: string;
  status:
    | "Cancelada"
    | "Confirmada"
    | "Aguardando"
    | "Primeira Consulta"
    | "Retorno";
  date: string;
  duration?: number; // in minutes
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  status:
    | "Cancelada"
    | "Confirmada"
    | "Aguardando"
    | "Primeira Consulta"
    | "Retorno";
  patient: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}
