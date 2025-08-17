"use client";

import { useEffect, useState } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaClipboardList,
  FaMoneyBillWave,
  FaBoxes,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/app/contexts/themeContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const width = collapsed ? "5rem" : "16rem";
    document.documentElement.style.setProperty("--sidebar-w", width);
  }, [collapsed]);

  const menuItems = [
    { label: "Dashboard", icon: FaHome, href: "/" },
    { label: "Agenda", icon: FaCalendarAlt, href: "/agenda" },
    { label: "Prontuário", icon: FaFileMedical, href: "/prontuario" },
    { label: "Tarefas", icon: FaClipboardList, href: "/tarefas" },
    { label: "Financeiro", icon: FaMoneyBillWave, href: "/financeiro" },
    { label: "Estoque", icon: FaBoxes, href: "/estoque" },
  ];

  const bottomItems = [
    { label: "Notificações", icon: FaBell, href: "/notificacoes" },
    { label: "Suporte", icon: FaQuestionCircle, href: "/suporte" },
    { label: "Configurações", icon: FaCog, href: "/configuracoes" },
  ];

  const sidebarContent = (
    <aside
      className={`transition-all duration-300 ease-in-out flex flex-col justify-between font-sans h-full border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-label="Menu lateral de navegação"
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--card-border)]">
          <button
            onClick={toggleSidebar}
            aria-label="Alternar menu"
            className={`${
              theme === "dark" ? "text-[var(--foreground)]" : "text-gray-500"
            } hover:text-green-500 transition hidden md:block text-2xl`}
          >
            <FaBars />
          </button>
          <button
            onClick={toggleMobile}
            aria-label="Fechar menu mobile"
            className="text-[var(--text-secondary)] hover:text-green-500 transition md:hidden text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-3 px-2 flex flex-col gap-1">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-[var(--hover-bg)] hover:text-green-500"
            >
              <Icon className="text-xl" />
              {!collapsed && <span className="font-medium">{label}</span>}
              {collapsed && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[var(--card-bg)] text-[var(--text-primary)] text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg transition-all pointer-events-none z-50">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1">
        {bottomItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href || "#"}
            className="group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-[var(--hover-bg)] hover:text-green-500"
          >
            <Icon className="text-xl" />
            {!collapsed && <span className="font-medium">{label}</span>}
          </Link>
        ))}

        {isMounted && (
          <button
            aria-label={`Mudar para tema ${
              theme === "light" ? "Escuro" : "Claro"
            }`}
            className="group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-[var(--hover-bg)] hover:text-green-500"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <FaSun className="text-xl" />
            ) : (
              <FaMoon className="text-xl" />
            )}
            {!collapsed && (
              <span className="font-medium">
                Tema: {theme === "light" ? "Claro" : "Escuro"}
              </span>
            )}
          </button>
        )}

        {/* Usuário */}
        <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-black/10 dark:bg-white/5">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={36}
            height={36}
            className="rounded-full border-2 border-[var(--card-border)]"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Dr. João Pedro
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                joao@clinicadrcheck.com
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block fixed top-0 left-0 h-screen z-40">
        {sidebarContent}
      </div>

      {/* Botão Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[var(--accent)] p-3 rounded-lg shadow hover:opacity-90 transition"
        onClick={toggleMobile}
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>

      {/* Sidebar Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleMobile}>
          <div className="fixed inset-0 bg-black/40" aria-hidden="true"></div>
          <div
            className="fixed top-0 left-0 h-full shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o menu
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
