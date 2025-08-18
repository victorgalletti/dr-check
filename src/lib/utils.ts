// lib/utils.ts

import { useState, useEffect } from 'react';
import {
  mockPatientData,
  mockEmptyData,
} from './mocks';

export interface HistoryRecord {
  id: number;
  data: string;
  profissional: string;
  queixa: string;
  diagnostico: string;
  conduta: string;
  status: string;
  receitas_relacionadas?: number[];
  exames_relacionados?: number[];
}

export interface Prescription {
  id: number;
  medicamento: string;
  posologia: string;
  status: string;
  data_emissao: string;
}

export interface Exam {
  id: number;
  nome: string;
  status: string;
  data_solicitacao: string;
  data_laudo?: string;
}

export interface FileAttachment {
  id: number;
  nome: string;
  tipo: string;
  data_upload: string;
  autor: string;
  tags: string[];
}

export interface Note {
  id: number;
  texto: string;
  autor: string;
  data: string;
  privada: boolean;
}

export interface VitalSigns {
  pa: string;
  fc: string;
  fr: string;
  temp: string;
  spo2: string;
  peso: number;
  altura: number;
}

export interface PatientInfo {
  nomeCompleto: string;
  nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  convenio: string;
  foto: string;
  alergias: string[];
  riscos: string[];
  sinais_vitais: VitalSigns;
}

export interface Document {
  id: number;
  tipo: string;
  data_emissao: string;
  autor: string;
  assinatura: boolean;
}

export interface Consent {
  id: number;
  finalidade: string;
  status: string;
  data_coleta: string;
}

export interface PatientData {
  historico: HistoryRecord[];
  receitas: Prescription[];
  exames: Exam[];
  arquivos: FileAttachment[];
  anotacoes: Note[];
  ficha: PatientInfo;
  documentos: Document[];
  consentimentos: Consent[];
}

export interface Permissions {
  canViewSensitive: boolean;
  canSign: boolean;
  canUpload: boolean;
  canEdit: boolean;
}

export const useMockData = (patientId: string) => {
  const [data, setData] = useState<PatientData | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'empty'>(
    'loading',
  );

  useEffect(() => {
    setStatus('loading');
    const timer = setTimeout(() => {
      if (patientId === 'not-found' || patientId === 'error') {
        setData(null);
        setStatus('error');
      } else if (patientId === 'empty') {
        setData(mockEmptyData as unknown as PatientData);
        setStatus('empty');
      } else {
        setData(mockPatientData as PatientData);
        setStatus('success');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [patientId]);

  return { data, status };
};

export const formatBirthdate = (birthdate: string) => {
  const dob = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return `${dob.toLocaleDateString('pt-BR')} (${age} anos)`;
};

export const calculateIMC = (weight: number, height: number) => {
  if (weight <= 0 || height <= 0) return 'N/A';
  const imc = weight / (height * height);
  return imc.toFixed(2);
};