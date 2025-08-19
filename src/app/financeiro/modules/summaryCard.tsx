import React from "react";

// --- ÍCONES (Placeholders) ---
const PlusIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
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
);
const MinusIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20 12H4"
    />
  </svg>
);
const BalanceIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);
const DueIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  borderColor,
  iconBgColor,
}) => {
  return (
    <div className={`${bgColor} rounded-lg p-4 border ${borderColor}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md ${iconBgColor} p-3`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </p>
          <p className="text-2xl font-semibold text-[var(--text-primary)]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

// Exportando os ícones para que possam ser usados na página principal
export { PlusIcon, MinusIcon, BalanceIcon, DueIcon };
