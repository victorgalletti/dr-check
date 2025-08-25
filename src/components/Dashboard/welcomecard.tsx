// src/components/modules/dashboard/WelcomeCard.tsx
import React from "react";
import { useTheme } from "@/contexts/themeContext";

interface WelcomeCardProps {
  title: string;
  subtitle: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg shadow-sm
        bg-white
        ${theme === "dark" ? "text-[var(--foreground)]" : "text-gray-800"}
      `}
      style={theme === "dark" ? { background: "var(--card-bg)" } : {}}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p
        className={`text-sm mt-1 ${
          theme === "dark" ? "text-[var(--text-secondary)]" : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default WelcomeCard;
