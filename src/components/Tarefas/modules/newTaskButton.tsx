import React from "react";

interface NewTaskButtonProps {
  onClick: () => void;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium flex items-center"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Nova Tarefa
    </button>
  );
};

export default NewTaskButton;
