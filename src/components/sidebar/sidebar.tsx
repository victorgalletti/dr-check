'use client';

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = ({ activePage = 'agenda' }) => {
  const [active, setActive] = useState(activePage);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { id: 'tarefas', label: 'Tarefas', icon: 'list' },
    { id: 'prontuario', label: 'Prontuário', icon: 'user' },
    { id: 'financeiro', label: 'Financeiro', icon: 'dollar-sign' },
    { id: 'estoque', label: 'Estoque', icon: 'package' },
  ];

  return (
    <div className="h-screen w-[200px] bg-emerald-600 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
      <img 
          src="/images/LightGray.svg" 
          alt="Logo Dr. Check"
          className="w-40 h-auto"/>
      </div>

      {/* Menu Items */}
      <div className="mt-6 flex flex-col flex-1">
        {menuItems.map((item)  => (
          <Link 
            href={`/${item.id}`} 
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              active === item.id 
                ? 'bg-emerald-700' 
                : 'hover:bg-emerald-700/50'
            }`}
          >
            <div className="w-6 flex justify-center">
              {renderIcon(item.icon)}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Função para renderizar os ícones
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'grid':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ) ;
    case 'calendar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ) ;
    case 'list':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ) ;
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ) ;
    case 'dollar-sign':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ) ;
    case 'package':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ) ;
    default:
      return null;
  }
};

export default Sidebar;
