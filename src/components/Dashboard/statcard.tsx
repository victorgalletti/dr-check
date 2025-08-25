// src/components/modules/dashboard/StatCard.tsx
import React from "react";
import { useTheme } from "@/contexts/themeContext";

interface StatCardProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, bgColor, title, value }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg shadow-sm p-4 flex items-center space-x-4 ${
        theme === "dark" ? "text-[var(--foreground)]" : "bg-white text-gray-800"
      }`}
      style={theme === "dark" ? { background: "var(--card-bg)" } : {}}
    >
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      <div>
        <p
          className={`text-sm font-medium ${
            theme === "dark" ? "text-[var(--text-secondary)]" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-[var(--foreground)]" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
