// lib/mocks.ts

export const mockLoading = {};
export const mockError = {};
export const mockEmptyData = {
  historico: [],
  receitas: [],
  exames: [],
  arquivos: [],
  anotacoes: [],
  ficha: {},
  documentos: [],
  consentimentos: [],
};

export const mockPatientData = {
  historico: [
    {
      id: 1,
      data: '2024-08-10',
      profissional: 'Dra. Ana Costa (Cardiologia)',
      queixa: 'Dor no peito e falta de ar',
      diagnostico: 'Angina instável (I20.0)',
      conduta: 'Solicitação de exames, ajuste de medicação',
      status: 'Finalizada',
      receitas_relacionadas: [1],
      exames_relacionados: [1],
    },
    {
      id: 2,
      data: '2024-05-22',
      profissional: 'Dr. João Pereira (Clínico Geral)',
      queixa: 'Dor de cabeça e febre',
      diagnostico: 'Gripe (J11.1)',
      conduta: 'Repouso e medicação sintomática',
      status: 'Finalizada',
    },
  ],
  receitas: [
    {
      id: 1,
      medicamento: 'AAS 100mg',
      posologia: '1 comprimido, via oral, de 12 em 12 horas',
      status: 'Assinada',
      data_emissao: '2024-08-10',
    },
    {
      id: 2,
      medicamento: 'Ibuprofeno 600mg',
      posologia: '1 comprimido, via oral, de 8 em 8 horas',
      status: 'Rascunho',
      data_emissao: '2024-08-18',
    },
  ],
  exames: [
    {
      id: 1,
      nome: 'Eletrocardiograma (ECG)',
      status: 'Laudado',
      data_solicitacao: '2024-08-10',
      data_laudo: '2024-08-12',
    },
    {
      id: 2,
      nome: 'Hemograma completo',
      status: 'Entregue',
      data_solicitacao: '2024-08-15',
    },
    {
      id: 3,
      nome: 'Ultrassom Abdominal',
      status: 'Solicitado',
      data_solicitacao: '2024-08-16',
    },
  ],
  arquivos: [
    {
      id: 1,
      nome: 'Resultado do ECG.pdf',
      tipo: 'PDF',
      data_upload: '2024-08-12',
      autor: 'Dra. Ana Costa',
      tags: ['exame', 'coração'],
    },
    {
      id: 2,
      nome: 'Raio-x de Tórax.jpg',
      tipo: 'JPG',
      data_upload: '2024-08-11',
      autor: 'Clínica Imaginare',
      tags: ['exame', 'imagem'],
    },
  ],
  anotacoes: [
    {
      id: 1,
      texto: 'Paciente demonstra ansiedade sobre o diagnóstico. Necessário acompanhamento psicológico.',
      autor: 'Dra. Ana Costa',
      data: '2024-08-10',
      privada: false,
    },
    {
      id: 2,
      texto: 'Nota interna: verificar pendências financeiras.',
      autor: 'João (Recepção)',
      data: '2024-08-12',
      privada: true,
    },
  ],
  ficha: {
    nomeCompleto: 'Maria da Silva',
    nascimento: '1985-05-20',
    cpf: '123.456.789-00',
    telefone: '(11) 99999-9999',
    email: 'maria@email.com',
    convenio: 'Unimed',
    foto: 'https://images.unsplash.com/photo-1550928229-4592033051fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alergias: ['Dipirona', 'Alergia a pólen'],
    riscos: ['Tabagismo', 'Histórico familiar de diabetes'],
    sinais_vitais: {
      pa: '130/85 mmHg',
      fc: '75 bpm',
      fr: '18 irpm',
      temp: '36.5 °C',
      spo2: '98%',
      peso: 70,
      altura: 1.65,
    },
  },
  documentos: [
    {
      id: 1,
      tipo: 'Atestado Médico',
      data_emissao: '2024-08-10',
      autor: 'Dra. Ana Costa',
      assinatura: true,
    },
    {
      id: 2,
      tipo: 'Declaração de Comparecimento',
      data_emissao: '2024-08-10',
      autor: 'Dra. Ana Costa',
      assinatura: true,
    },
  ],
  consentimentos: [
    {
      id: 1,
      finalidade: 'LGPD - Tratamento de dados para agendamento',
      status: 'Ativo',
      data_coleta: '2023-01-15',
    },
    {
      id: 2,
      finalidade: 'LGPD - Compartilhamento de dados com laboratório',
      status: 'Ativo',
      data_coleta: '2024-08-10',
    },
  ],
};

export const mockPermissions = {
  canViewSensitive: true,
  canSign: true,
  canUpload: true,
  canEdit: true,
};