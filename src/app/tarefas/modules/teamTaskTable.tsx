import React from "react";

interface TeamTask {
  id: string;
  task: string;
  assignee: string;
  initials: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string;
  status: "Em Andamento" | "Pendente";
}

interface TeamTasksTableProps {
  tasks: TeamTask[];
}

const TeamTasksTable: React.FC<TeamTasksTableProps> = ({ tasks = [] }) => {
  // Função atualizada com classes para o modo escuro
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-[var(--danger-bg)] text-[var(--danger-color)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger-color)]";
      case "Média":
        return "bg-yellow-100 text-yellow-800";
      case "Baixa":
        return "bg-[var(--success-bg)] text-[var(--success-color)] dark:bg-[var(--success-bg)] dark:text-[var(--success-color)]";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Função atualizada com classes para o modo escuro
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Concluída":
        return "bg-[var(--success-bg)] text-[var(--success-color)] "; //modificar depois
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Cores sólidas que funcionam bem em ambos os modos
  const getAssigneeColor = (initials: string) => {
    switch (initials) {
      case "CS":
        return "bg-green-600";
      case "AS":
        return "bg-purple-600";
      case "PL":
        return "bg-blue-600";
      default:
        return "bg-indigo-600";
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Tabela adaptada com variáveis de CSS para o tema */}
      <table className="min-w-full divide-y divide-[var(--card-border)]">
        <thead className="bg-black/5 dark:bg-white/5">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Tarefa
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Responsável
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Prioridade
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Vencimento
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--card-border)]">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-500/10">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">
                {task.task}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${getAssigneeColor(
                      task.initials
                    )}`}
                  >
                    {task.initials}
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium text-[var(--text-primary)]">
                      {task.assignee}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                {task.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTasksTable;
