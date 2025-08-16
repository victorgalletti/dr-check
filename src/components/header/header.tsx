"use client";

import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="[var(--background)] shadow-sm z-10 border-b border-[var(--card-border)]">
      <div className=" px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>

        <div className="flex items-center space-x-4">
          {/* Ícone de notificações */}
          <button className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] focus:ring-offset-[var(--card-bg)]">
            <span className="sr-only">Ver notificações</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Badge de notificação com cores semânticas */}
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--danger-bg)]">
            <span className="text-xs font-medium leading-none text-[var(--danger-color)]">
              3
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
