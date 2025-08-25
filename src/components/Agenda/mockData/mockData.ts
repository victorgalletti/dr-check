import { Appointment, CalendarEvent, Patient } from "../types/types";

export const mockPatients: Patient[] = [
	{
		id: "1",
		name: "Ana Oliveira",
		email: "ana.oliveira@email.com",
		initials: "AO",
	},
	{
		id: "2",
		name: "Pedro Souza",
		email: "pedro.souza@email.com",
		initials: "PS",
	},
	{
		id: "3",
		name: "João Pereira",
		email: "joao.pereira@email.com",
		initials: "JP",
	},
	{
		id: "4",
		name: "Carlos Santos",
		email: "carlos.santos@email.com",
		initials: "CS",
	},
	{
		id: "5",
		name: "Fernando Lima",
		email: "fernando.lima@email.com",
		initials: "FL",
	},
	{
		id: "6",
		name: "Roberto Alves",
		email: "roberto.alves@email.com",
		initials: "RA",
	},
	{
		id: "7",
		name: "Juliana Costa",
		email: "juliana.costa@email.com",
		initials: "JC",
	},
];

export const mockAppointments: Appointment[] = [
	{
		id: "1",
		patient: mockPatients[0],
		time: "08:00",
		type: "Consulta de Rotina",
		status: "Cancelada",
		date: "2025-04-21",
	},
	{
		id: "2",
		patient: mockPatients[1],
		time: "14:00",
		type: "Retorno",
		status: "Confirmada",
		date: "2025-04-21",
	},
	{
		id: "3",
		patient: mockPatients[2],
		time: "15:00",
		type: "Primeira Consulta",
		status: "Confirmada",
		date: "2025-04-21",
	},
];

export const mockCalendarEvents: CalendarEvent[] = [
	{
		id: "1",
		title: "Ana Oliveira",
		startTime: "08:00",
		endTime: "08:30",
		date: "2025-08-13",
		status: "Cancelada",
		patient: "Ana Oliveira",
	},
	{
		id: "2",
		title: "Carlos Santos",
		startTime: "09:00",
		endTime: "09:30",
		date: "2025-08-15",
		status: "Primeira Consulta",
		patient: "Carlos Santos",
	},
	{
		id: "3",
		title: "Fernando Lima",
		startTime: "10:00",
		endTime: "10:30",
		date: "2025-08-14",
		status: "Confirmada",
		patient: "Fernando Lima",
	},
	{
		id: "4",
		title: "Roberto Alves",
		startTime: "11:00",
		endTime: "11:30",
		date: "2025-08-12",
		status: "Retorno",
		patient: "Roberto Alves",
	},
	{
		id: "5",
		title: "Pedro Souza",
		startTime: "14:00",
		endTime: "14:30",
		date: "2025-04-21",
		status: "Confirmada",
		patient: "Pedro Souza",
	},
	{
		id: "6",
		title: "João Pereira",
		startTime: "15:00",
		endTime: "15:30",
		date: "2025-04-21",
		status: "Confirmada",
		patient: "João Pereira",
	},
	{
		id: "7",
		title: "Juliana Costa",
		startTime: "13:00",
		endTime: "13:30",
		date: "2025-08-10",
		status: "Aguardando",
		patient: "Juliana Costa",
	},
];
// ...existing code...
