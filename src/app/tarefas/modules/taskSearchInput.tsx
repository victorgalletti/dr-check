import React from "react";

interface TaskSearchInputProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const TaskSearchInput: React.FC<TaskSearchInputProps> = ({
  searchValue,
  onSearchChange,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Buscar tarefa..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default TaskSearchInput;
