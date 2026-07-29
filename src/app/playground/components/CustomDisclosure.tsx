"use client";

import React, { useState, useId } from "react";

export interface CustomDisclosureProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CustomDisclosure({
  title,
  defaultOpen = false,
  children,
}: CustomDisclosureProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const contentId = useId();

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggle}
          className="flex w-full items-center justify-between p-4 text-left font-semibold text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <span>{title}</span>
          <span
            className={`transform text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            ▼
          </span>
        </button>
      </h3>

      <div
        id={contentId}
        hidden={!isOpen}
        className={`p-4 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
