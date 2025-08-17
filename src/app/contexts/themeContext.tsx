"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado inicial lazy: tenta recuperar preferência salva; senão segue o sistema
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = (typeof window !== "undefined" &&
        localStorage.getItem("theme")) as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
      if (typeof window !== "undefined") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
      }
    } catch (_) {
      // falha silenciosa (ex: modo privado restringindo localStorage)
    }
    return "light"; // fallback
  });

  // Aplica classes e persiste preferência explícita do usuário
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {
      /* ignore */
    }
  }, [theme]);

  // Ouve mudanças no tema do SO apenas se o usuário não salvou manualmente (sem item em localStorage antes do mount)
  useEffect(() => {
    // Se já existe preferência salva, não sincroniza com SO
    let hadSavedPref = false;
    try {
      hadSavedPref = localStorage.getItem("theme") !== null;
    } catch (_) {}
    if (hadSavedPref) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = (e: MediaQueryListEvent) => {
      // Apenas segue o SO enquanto o usuário não tiver definido manualmente depois
      try {
        if (localStorage.getItem("theme") === null) {
          setTheme(e.matches ? "dark" : "light");
        }
      } catch (_) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
