"use client";

import { useId } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

export default function ThemeToggleButton() {
  const id = useId();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        name={id}
        id={id}
        className="peer sr-only"
        checked={theme === "dark"}
        onChange={toggleTheme} // Usa a função do contexto
      />
      <label
        className="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-[var(--card-border)] bg-background text-foreground shadow-xs outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] peer-focus-visible:border-ring peer-focus-visible:ring-ring/50"
        htmlFor={id}
        aria-label={`Mudar para o modo ${
          theme === "dark" ? "claro" : "escuro"
        }`}
      >
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-peer-checked:scale-100 group-peer-checked:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-peer-checked:scale-0 group-peer-checked:opacity-0"
          aria-hidden="true"
        />
      </label>
    </div>
  );
}
