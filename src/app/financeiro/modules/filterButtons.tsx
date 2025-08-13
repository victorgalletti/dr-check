import React from "react";

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = ["Diário", "Semanal", "Mensal", "Anual"];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            activeFilter === filter
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-700"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
