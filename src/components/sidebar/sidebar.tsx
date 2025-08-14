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
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  // >>>> NOVO: expõe a largura atual em uma CSS variable global
  useEffect(() => {
    const width = collapsed ? "5rem" : "16rem"; // w-20 (80px ≈ 5rem) | w-64 (256px = 16rem)
    document.documentElement.style.setProperty("--sidebar-w", width);
    return () => {
      document.documentElement.style.removeProperty("--sidebar-w");
    };
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
    { label: "Notificações", icon: FaBell },
    { label: "Suporte", icon: FaQuestionCircle },
    { label: "Configurações", icon: FaCog },
  ];

  const sidebarContent = (
    <aside
      className={`transition-all duration-300 ease-in-out flex flex-col justify-between font-sans h-full border-r border-gray-200 ${
        collapsed ? "w-20" : "w-64"
      } bg-white text-slate-800`}
      aria-label="Menu lateral de navegação"
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button
            onClick={toggleSidebar}
            aria-label="Alternar menu"
            className="text-gray-500 hover:text-green-500 transition hidden md:block text-xl"
          >
            <FaBars />
          </button>
          <button
            onClick={toggleMobile}
            aria-label="Fechar menu mobile"
            className="text-gray-500 hover:text-green-500 transition md:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-3 px-2 flex flex-col gap-1">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-green-50 hover:text-green-600 text-sm text-slate-700 transition-all relative"
            >
              <Icon className="text-xl" />
              {!collapsed && <span className="font-medium">{label}</span>}
              {collapsed && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 shadow transition-all pointer-events-none z-50">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-2">
        {bottomItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            aria-label={label}
            className="group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-green-50 hover:text-green-600 text-sm text-slate-700 transition-all relative"
          >
            <Icon className="text-xl" />
            {!collapsed && <span className="font-medium">{label}</span>}
            {collapsed && (
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 shadow transition-all pointer-events-none z-50">
                {label}
              </span>
            )}
          </button>
        ))}

        {/* Usuário */}
        <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50">
          <Image
            src="./images/avatar.png"
            alt="Avatar"
            width={36}
            height={36}
            className="rounded-full border-2 border-green-200"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-800">Dr. João Pedro</p>
              <p className="text-xs text-slate-500">joao@clinicadrcheck.com</p>
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
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-green-500 p-3 rounded-lg shadow hover:bg-green-600 transition"
        onClick={toggleMobile}
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>

      {/* Sidebar Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed top-0 left-0 h-full bg-white shadow-lg z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
