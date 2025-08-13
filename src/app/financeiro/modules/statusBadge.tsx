import React from "react";

interface StatusBadgeProps {
  // A propriedade 'status' agora é opcional.
  status?: string;
}

// Adicionado um valor por defeito para a propriedade 'status'.
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "Desconhecido",
}) => {
  let bgColorClass = "";
  let textColorClass = "";

  switch (status) {
    case "Pago":
      bgColorClass = "bg-green-100";
      textColorClass = "text-green-800";
      break;
    case "A Receber":
      bgColorClass = "bg-yellow-100";
      textColorClass = "text-yellow-800";
      break;
    case "Vencido":
      bgColorClass = "bg-red-100";
      textColorClass = "text-red-800";
      break;
    default:
      bgColorClass = "bg-gray-100";
      textColorClass = "text-gray-800";
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColorClass} ${textColorClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
