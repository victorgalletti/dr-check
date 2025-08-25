import React from "react";

interface TaskFilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilterButtons: React.FC<TaskFilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = ["Todas", "Pendentes", "Concluídas"];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeFilter === filter
              ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm"
              : "bg-[var(--card-border)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilterButtons;
