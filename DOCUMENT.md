Visão Geral
Dr. Check é um sistema completo de gestão clínica desenvolvido com tecnologias modernas para oferecer uma experiência fluida tanto na web quanto em aplicações desktop. O sistema permite gerenciar agendamentos, prontuários, tarefas, finanças e estoque em uma única plataforma integrada.
Stack Tecnológica
Frontend: Next.js 14+ com TypeScript
Estilização: Tailwind CSS
Aplicação Desktop: Electron
Banco de Dados: MongoDB com Mongoose
Autenticação: JWT (JSON Web Tokens)
Estrutura do Projeto
dr-check/
├── electron/               # Arquivos específicos do Electron
│   ├── main.js             # Ponto de entrada do Electron
│   └── preload.js          # Script de pré-carregamento para APIs seguras
├── public/                 # Arquivos estáticos
│   └── images/             # Imagens do projeto
├── src/                    # Código-fonte principal
│   ├── app/                # Rotas e páginas do Next.js (App Router)
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── layout/         # Componentes de layout (Sidebar, Header, etc.)
│   │   └── ui/             # Componentes de UI (botões, cards, etc.)
│   ├── contexts/           # Contextos React (Auth, Sync, etc.)
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Bibliotecas e utilitários
│   ├── models/             # Modelos de dados Mongoose
│   ├── modules/            # Módulos principais do sistema
│   │   ├── dashboard/      # Módulo de Dashboard
│   │   ├── agenda/         # Módulo de Agenda
│   │   ├── prontuario/     # Módulo de Prontuário
│   │   ├── tarefas/        # Módulo de Tarefas
│   │   ├── financeiro/     # Módulo Financeiro
│   │   └── estoque/        # Módulo de Estoque
│   ├── services/           # Serviços (API, sincronização, etc.)
│   └── utils/              # Funções utilitárias
├── .eslintrc.json          # Configuração do ESLint
├── next.config.js          # Configuração do Next.js
├── package.json            # Dependências e scripts
├── postcss.config.js       # Configuração do PostCSS
├── tailwind.config.js      # Configuração do Tailwind CSS
└── tsconfig.json           # Configuração do TypeScript
Módulos Principais
Dashboard: Visão geral dos indicadores da clínica
Gráficos de desempenho
Indicadores-chave (KPIs)
Resumo de atividades recentes
Agenda: Gerenciamento de consultas e compromissos
Calendário interativo
Agendamento de consultas
Notificações e lembretes
Prontuário: Histórico clínico completo dos pacientes
Cadastro de pacientes
Histórico médico
Exames e resultados
Prescrições médicas
Tarefas: Gestão de atividades e pendências
Lista de tarefas
Atribuição de responsabilidades
Acompanhamento de progresso
Financeiro: Controle de receitas e despesas
Faturamento de consultas
Controle de pagamentos
Relatórios financeiros
Estoque: Gerenciamento de produtos e materiais
Controle de inventário
Alertas de estoque baixo
Pedidos de compra
Configuração do Ambiente
Pré-requisitos
Node.js 18+ e npm
Git
Editor de código (recomendado: Visual Studio Code)
MongoDB (opcional para desenvolvimento inicial)
Comandos para Windows (PowerShell)
1. Criar o projeto Next.js
powershell
# Criar um novo projeto Next.js
npx create-next-app@latest dr-check --typescript --tailwind --eslint --app --src-dir

# Navegar para o diretório do projeto
cd dr-check
2. Instalar o Electron e dependências
powershell
# Instalar Electron e dependências relacionadas
npm install --save-dev electron electron-builder electron-is-dev

# Instalar dependências para comunicação entre Next.js e Electron
npm install --save-dev concurrently wait-on

# Instalar MongoDB para o banco de dados
npm install mongodb mongoose
3. Criar estrutura de pastas
powershell
# Criar diretório para arquivos do Electron
New-Item -ItemType Directory -Force -Path electron

# Criar diretórios para a estrutura do projeto
New-Item -ItemType Directory -Force -Path src/components/layout
New-Item -ItemType Directory -Force -Path src/components/ui
New-Item -ItemType Directory -Force -Path src/contexts
New-Item -ItemType Directory -Force -Path src/hooks
New-Item -ItemType Directory -Force -Path src/lib
New-Item -ItemType Directory -Force -Path src/models
New-Item -ItemType Directory -Force -Path src/services
New-Item -ItemType Directory -Force -Path src/utils
New-Item -ItemType Directory -Force -Path public/images

# Criar diretórios de módulos
@("dashboard", "agenda", "prontuario", "tarefas", "financeiro", "estoque") | ForEach-Object { 
    New-Item -ItemType Directory -Force -Path "src/modules/$_" 
}
4. Criar arquivos básicos do Electron
Crie o arquivo electron/main.js:
powershell
$mainContent = @'
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html") }`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
'@

# Usar UTF-8 sem BOM
[System.IO.File]::WriteAllText("$PWD\electron\main.js", $mainContent, [System.Text.Encoding]::UTF8)
Crie o arquivo electron/preload.js:
powershell
$preloadContent = @'
const { contextBridge, ipcRenderer } = require("electron");

// Expõe APIs seguras do Electron para a aplicação web
contextBridge.exposeInMainWorld("electron", {
  // Funções para sincronização de dados
  syncData: (data) => ipcRenderer.invoke("sync-data", data),
  
  // Funções para verificar status de conexão
  isOnline: () => navigator.onLine,
  
  // Eventos de conexão
  onOnline: (callback) => {
    window.addEventListener("online", callback);
    return () => window.removeEventListener("online", callback);
  },
  onOffline: (callback) => {
    window.addEventListener("offline", callback);
    return () => window.removeEventListener("offline", callback);
  },
});
'@

# Usar UTF-8 sem BOM
[System.IO.File]::WriteAllText("$PWD\electron\preload.js", $preloadContent, [System.Text.Encoding]::UTF8)
5. Configurar o next.config.js
powershell
$nextConfigContent = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
'@

# Usar UTF-8 sem BOM
[System.IO.File]::WriteAllText("$PWD\next.config.js", $nextConfigContent, [System.Text.Encoding]::UTF8)
6. Atualizar o package.json
Edite o arquivo package.json manualmente e adicione:
json
"main": "electron/main.js",
"scripts": {
  "electron": "electron .",
  "dev": "next dev",
  "dev-electron": "concurrently \"npm run dev\" \"wait-on http://localhost:3000 && npm run electron\"",
  "build": "next build",
  "build-electron": "next build && electron-builder",
  ... (outros scripts existentes) 
}
Comandos para Linux/Mac
1. Criar o projeto Next.js
bash
# Criar um novo projeto Next.js
npx create-next-app@latest dr-check --typescript --tailwind --eslint --app --src-dir

# Navegar para o diretório do projeto
cd dr-check
2. Instalar o Electron e dependências
bash
# Instalar Electron e dependências relacionadas
npm install --save-dev electron electron-builder electron-is-dev

# Instalar dependências para comunicação entre Next.js e Electron
npm install --save-dev concurrently wait-on

# Instalar MongoDB para o banco de dados
npm install mongodb mongoose
3. Criar estrutura de pastas
bash
# Criar diretório para arquivos do Electron
mkdir -p electron

# Criar diretórios para a estrutura do projeto
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/contexts
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/models
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/modules/{dashboard,agenda,prontuario,tarefas,financeiro,estoque}
mkdir -p public/images
4. Criar arquivos básicos do Electron
Crie o arquivo electron/main.js:
bash
cat > electron/main.js << 'EOL'
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html") }`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
EOL
Crie o arquivo electron/preload.js:
bash
cat > electron/preload.js << 'EOL'
const { contextBridge, ipcRenderer } = require("electron");

// Expõe APIs seguras do Electron para a aplicação web
contextBridge.exposeInMainWorld("electron", {
  // Funções para sincronização de dados
  syncData: (data) => ipcRenderer.invoke("sync-data", data),
  
  // Funções para verificar status de conexão
  isOnline: () => navigator.onLine,
  
  // Eventos de conexão
  onOnline: (callback) => {
    window.addEventListener("online", callback);
    return () => window.removeEventListener("online", callback);
  },
  onOffline: (callback) => {
    window.addEventListener("offline", callback);
    return () => window.removeEventListener("offline", callback);
  },
});
EOL
5. Configurar o next.config.js
bash
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
EOL
6. Atualizar o package.json
bash
# Adicionar scripts para Electron no package.json
npm pkg set scripts.electron="electron ."
npm pkg set scripts.dev="next dev"
npm pkg set scripts.dev-electron="concurrently \"npm run dev\" \"wait-on http://localhost:3000 && npm run electron\""
npm pkg set scripts.build="next build"
npm pkg set scripts.build-electron="next build && electron-builder"
npm pkg set main="electron/main.js"
Configuração do Next.js
O Next.js é um framework React que permite renderização do lado do servidor (SSR) , geração estática (SSG) e criação de APIs. No projeto Dr. Check, usamos o Next.js com o App Router, que é a abordagem mais recente para roteamento no Next.js.
Estrutura de Diretórios do App Router
src/app/
├── (dashboard)/           # Grupo de rotas para o dashboard (layout compartilhado)
│   ├── layout.tsx         # Layout compartilhado para todas as rotas do dashboard
│   ├── dashboard/         # Rota /dashboard
│   ├── agenda/            # Rota /agenda
│   ├── prontuario/        # Rota /prontuario
│   ├── tarefas/           # Rota /tarefas
│   ├── financeiro/        # Rota /financeiro
│   └── estoque/           # Rota /estoque
├── login/                 # Rota /login
├── register/              # Rota /register
├── api/                   # Rotas de API
├── layout.tsx             # Layout raiz da aplicação
└── page.tsx               # Página inicial (/)
Importante: Componentes Cliente vs. Servidor
No Next.js 13+ com App Router, todos os componentes são Server Components por padrão. Para usar hooks React (useState, useEffect, useContext, etc.), você precisa marcar explicitamente o componente como Client Component adicionando a diretiva "use client" no topo do arquivo:
typescript
"use client";

import { useState, useEffect } from 'react';

export default function MeuComponente() {
  const [contador, setContador] = useState(0);
  
  useEffect(() => {
    // código aqui
  }, []);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
Configuração do Electron
O Electron permite criar aplicações desktop multiplataforma usando tecnologias web. No projeto Dr. Check, usamos o Electron para criar uma versão desktop do sistema que pode funcionar offline.
Arquivos Principais do Electron
main.js: Ponto de entrada da aplicação Electron, responsável por criar a janela principal e gerenciar o ciclo de vida da aplicação.
preload.js: Script que é executado antes do carregamento da página web, permitindo expor APIs seguras do Electron para o frontend.
Comunicação entre Electron e Next.js
A comunicação entre o frontend (Next.js) e o backend (Electron) é feita através do módulo contextBridge e ipcMain/ipcRenderer:
javascript
// No preload.js
contextBridge.exposeInMainWorld("electron", {
  syncData: (data) => ipcRenderer.invoke("sync-data", data),
});

// No main.js
ipcMain.handle("sync-data", async (event, data) => {
  // Processar dados
  return resultado;
});

// No componente React
const handleSync = async () => {
  const resultado = await window.electron.syncData(dados);
  // Usar resultado
};
Configuração do MongoDB
O MongoDB é um banco de dados NoSQL orientado a documentos, usado no Dr. Check para armazenar dados de pacientes, agendamentos, etc.
Modelos de Dados
Os modelos de dados são definidos usando Mongoose, uma biblioteca ODM (Object Data Modeling) para MongoDB e Node.js:
typescript
// src/models/Patient.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalHistory: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    birthDate: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    medicalHistory: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
Conexão com o MongoDB
A conexão com o MongoDB é gerenciada através de um utilitário:
typescript
// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/drcheck';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
Comandos de Desenvolvimento
Desenvolvimento Web (Next.js)
bash
npm run dev
Acesse http://localhost:3000 no navegador
Desenvolvimento Desktop (Electron + Next.js)
bash
npm run dev-electron
Build para Produção (Web)
bash
npm run build
Build para Produção (Desktop)
bash
npm run build-electron
Sincronização Offline
O Dr. Check suporta funcionalidade offline através de um sistema de sincronização que:
Detecta automaticamente o status de conexão
Armazena operações realizadas offline
Sincroniza com o servidor quando a conexão é restabelecida
Implementação da Sincronização
typescript
// src/contexts/SyncContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SyncContextType {
  isOnline: boolean;
  lastSynced: Date | null;
  isSyncing: boolean;
  syncNow: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType>({
  isOnline: true,
  lastSynced: null,
  isSyncing: false,
  syncNow: async () => {},
});

export const useSyncContext = () => useContext(SyncContext);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Verificar status de conexão
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Definir estado inicial
    setIsOnline(navigator.onLine);

    // Adicionar event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpar event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronizar dados quando voltar online
  useEffect(() => {
    if (isOnline && lastSynced) {
      const timeSinceLastSync = new Date().getTime() - lastSynced.getTime();
      // Se a última sincronização foi há mais de 5 minutos
      if (timeSinceLastSync > 5 * 60 * 1000) {
        syncNow();
      }
    }
  }, [isOnline, lastSynced]);

  // Função para sincronizar dados
  const syncNow = async () => {
    if (isSyncing || !isOnline) return;

    try {
      setIsSyncing(true);
      
      // Implementação da sincronização
      // ...
      
      // Atualizar timestamp de última sincronização
      const now = new Date();
      setLastSynced(now);
      
      // Salvar no localStorage para persistência
      localStorage.setItem('dr_check_last_synced', now.toISOString());
    } catch (error) {
      console.error('Erro na sincronização:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SyncContext.Provider
      value={{
        isOnline,
        lastSynced,
        isSyncing,
        syncNow
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
Contribuição
Crie um branch para sua feature: git checkout -b feature/nova-funcionalidade
Commit suas mudanças: git commit -m 'Adiciona nova funcionalidade'
Push para o branch: git push origin feature/nova-funcionalidade
Abra um Pull Request