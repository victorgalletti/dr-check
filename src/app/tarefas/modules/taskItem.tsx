import React from "react";

interface TaskItemProps {
  task: {
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
  };
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
      priorityColorClass = "bg-red-100 text-red-800";
      break;
    case "Média Prioridade":
      priorityColorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Baixa Prioridade":
      priorityColorClass = "bg-green-100 text-green-800";
      break;
    case "Concluída":
      priorityColorClass = "bg-gray-100 text-gray-800";
      break;
  }

  return (
    <div
      className={`p-6 hover:bg-gray-50 flex items-start ${
        task.completed ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        <input
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4
              className={`text-lg font-medium ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
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
              <span className="ml-2 text-sm text-gray-500">{task.dueDate}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              onClick={() =>
                task.completed ? onToggleComplete(task.id) : onEdit(task.id)
              }
            >
              {task.completed ? "Reabrir" : "Editar"}
            </button>
            <button
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              onClick={() => onDelete(task.id)}
            >
              Excluir
            </button>
          </div>
        </div>
        <div
          className={`mt-2 text-sm ${
            task.completed ? "text-gray-500" : "text-gray-700"
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
            <p className="text-sm font-medium text-gray-900">{task.assignee}</p>
            <p className="text-xs text-gray-500">{task.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
