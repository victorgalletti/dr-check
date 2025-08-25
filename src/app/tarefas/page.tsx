"use client";

import React, { useState } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import TaskFilterButtons from "@/components/Tarefas/modules/taskFilterButton";
import TaskSearchInput from "@/components/Tarefas/modules/taskSearchInput";
import NewTaskButton from "@/components/Tarefas/modules/newTaskButton";
import TeamTasksTable from "@/components/Tarefas/modules/teamTaskTable";
import { useTheme } from "@/contexts/themeContext"; // Importar o hook do tema

// --- Tipos de Dados ---
interface Task {
  id: string;
  title: string;
  description: string;
  priority:
    | "Alta Prioridade"
    | "Média Prioridade"
    | "Baixa Prioridade"
    | "Concluída";
  dueDate: string;
  assignee: string;
  createdAt: string;
  initials: string;
  completed: boolean;
}

interface TeamTask {
  id: string;
  task: string;
  assignee: string;
  initials: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string;
  status: "Em Andamento" | "Pendente";
}

// --- COMPONENTE DE ITEM DE TAREFA ---
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  let priorityColorClass = "";
  switch (task.priority) {
    case "Alta Prioridade":
      // Adicionadas classes 'dark:' para o modo escuro
      priorityColorClass =
        "bg-[var(--danger-bg)] text-[var(--danger-color)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger-color)]";
      break;
    case "Média Prioridade":
      priorityColorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Baixa Prioridade":
      priorityColorClass = "bg-[var(--success-bg)] text-[var(--success-color)]";
      break;
    case "Concluída":
      priorityColorClass =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      break;
    default:
      priorityColorClass =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
  return (
    <div
      className={`p-6 hover:bg-gray-500/10 flex items-start ${
        // Fundo sutil para tarefas completas
        task.completed ? "bg-gray-500/5" : ""
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        <input
          type="checkbox"
          // Usando variáveis para cor de acento e borda
          className="h-5 w-5 rounded border-[var(--card-border)] bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4
              className={`text-lg font-medium ${
                // Usando variáveis para cor do texto primário e secundário
                task.completed
                  ? "text-[var(--text-secondary)] line-through"
                  : "text-[var(--text-primary)]"
              }`}
            >
              {task.title}
            </h4>
            <div className="mt-1 flex items-center">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColorClass}`}
              >
                {task.priority}
              </span>
              <span className="ml-2 text-sm text-[var(--text-secondary)]">
                {task.dueDate}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              // Usando variável para cor de acento
              className="text-[var(--accent)] hover:opacity-80 text-sm font-medium"
              onClick={() =>
                task.completed ? onToggleComplete(task.id) : onEdit(task.id)
              }
            >
              {task.completed ? "Reabrir" : "Editar"}
            </button>
            <button
              // Usando variáveis para cores de texto
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
              onClick={() => onDelete(task.id)}
            >
              Excluir
            </button>
          </div>
        </div>
        <div
          className={`mt-2 text-sm ${
            // Usando variável para cor de texto secundário
            task.completed
              ? "text-[var(--text-secondary)]/80"
              : "text-[var(--text-secondary)]"
          }`}
        >
          <p>{task.description}</p>
        </div>
        <div className="mt-3 flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${
                task.initials === "AS" ? "bg-purple-600" : "bg-indigo-600"
              }`}
            >
              {task.initials}
            </div>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {task.assignee}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {task.createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
const TarefasPage: React.FC = () => {
  const { theme } = useTheme(); // Usa o contexto para obter o tema atual
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Ligar para paciente João Pereira",
      description:
        "Confirmar se o paciente realizou os exames solicitados na última consulta e verificar disponibilidade para consulta de retorno.",
      priority: "Alta Prioridade",
      dueDate: "hoje às 17:00",
      assignee: "Dr. Ricardo",
      createdAt: "21/04/2025 às 09:30",
      initials: "DR",
      completed: false,
    },
    {
      id: "2",
      title: "Revisar prontuários da semana",
      description:
        "Revisar todos os prontuários dos pacientes atendidos na semana e verificar se há necessidade de acompanhamento.",
      priority: "Média Prioridade",
      dueDate: "em 23/04/2025",
      assignee: "Dr. Ricardo",
      createdAt: "20/04/2025 às 14:15",
      initials: "DR",
      completed: false,
    },
    {
      id: "3",
      title: "Atualizar lista de medicamentos",
      description:
        "Verificar novas atualizações na lista de medicamentos controlados e atualizar o sistema interno.",
      priority: "Baixa Prioridade",
      dueDate: "em 30/04/2025",
      assignee: "Ana Silva",
      createdAt: "19/04/2025 às 11:45",
      initials: "AS",
      completed: false,
    },
    {
      id: "4",
      title: "Enviar relatório mensal",
      description:
        "Enviar relatório mensal de atendimentos para a administração.",
      priority: "Concluída",
      dueDate: "Venceu em 15/04/2025",
      assignee: "Dr. Ricardo",
      createdAt: "Concluída em 15/04/2025 às 16:20",
      initials: "DR",
      completed: true,
    },
  ]);

  const teamTasks: TeamTask[] = [
    {
      id: "t1",
      task: "Agendar reunião de equipe",
      assignee: "Carla Santos",
      initials: "CS",
      priority: "Média",
      dueDate: "25/04/2025",
      status: "Em Andamento",
    },
    {
      id: "t2",
      task: "Organizar arquivos de prontuários",
      assignee: "Ana Silva",
      initials: "AS",
      priority: "Baixa",
      dueDate: "28/04/2025",
      status: "Em Andamento",
    },
    {
      id: "t3",
      task: "Verificar estoque de materiais",
      assignee: "Paulo Lima",
      initials: "PL",
      priority: "Alta",
      dueDate: "22/04/2025",
      status: "Pendente",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "Todas" ||
      (activeFilter === "Pendentes" && !task.completed) ||
      (activeFilter === "Concluídas" && task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.description.toLowerCase().includes(searchValue.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: string) =>
    console.log(`Editar tarefa com ID: ${id}`);
  const handleDeleteTask = (id: string) =>
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  const handleNewTask = () => console.log("Criar nova tarefa");

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <div className="md:pl-[var(--sidebar-w,16rem)] transition-[padding] duration-300 ease-in-out">
        <Header title="Tarefas" />
        <main className="p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Controles e Filtros */}
            <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-6 mb-6 border border-[var(--card-border)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mr-4">
                    Minhas Tarefas
                  </h3>
                  <TaskFilterButtons
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                  />
                </div>
                <div className="flex space-x-2">
                  <TaskSearchInput
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                  />
                  <NewTaskButton onClick={handleNewTask} />
                </div>
              </div>
            </div>

            {/* Lista de Tarefas */}
            <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden mb-6 border border-[var(--card-border)]">
              <div className="divide-y divide-[var(--card-border)]">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center text-[var(--text-secondary)]">
                    Nenhuma tarefa encontrada.
                  </div>
                )}
              </div>
            </div>

            {/* Tarefas da Equipe */}
            <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-6 border border-[var(--card-border)]">
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4">
                Tarefas da Equipe
              </h3>
              <TeamTasksTable tasks={teamTasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TarefasPage;
