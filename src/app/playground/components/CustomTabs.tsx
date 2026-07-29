"use client";

import React, { useState, useRef, useId } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface CustomTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  ariaLabel?: string;
}

export function CustomTabs({ tabs, defaultTabId, ariaLabel = "Tabs" }: CustomTabsProps) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultTabId || tabs[0]?.id || ""
  );

  const baseId = useId();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const enabledTabs = tabs.filter((t) => !t.disabled);
  const selectedIndex = tabs.findIndex((t) => t.id === selectedId);

  const focusAndSelectTab = (tabId: string) => {
    setSelectedId(tabId);
    const tabEl = tabRefs.current.get(tabId);
    if (tabEl) {
      tabEl.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (enabledTabs.length === 0) return;

    const currentEnabledIndex = enabledTabs.findIndex((t) => t.id === selectedId);
    let nextIndex = -1;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;

      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;

      case "End":
        event.preventDefault();
        nextIndex = enabledTabs.length - 1;
        break;

      default:
        return;
    }

    if (nextIndex !== -1 && enabledTabs[nextIndex]) {
      focusAndSelectTab(enabledTabs[nextIndex].id);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="flex border-b border-zinc-200 dark:border-zinc-800 gap-2"
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === selectedId;
          const tabElementId = `${baseId}-tab-${tab.id}`;
          const panelElementId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabElementId}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelElementId}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => setSelectedId(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-all relative outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-t-lg ${
                tab.disabled
                  ? "opacity-40 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                  : isSelected
                  ? "text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-100 bg-zinc-100/50 dark:bg-zinc-800/50"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedId;
        const tabElementId = `${baseId}-tab-${tab.id}`;
        const panelElementId = `${baseId}-panel-${tab.id}`;

        if (!isSelected) return null;

        return (
          <div
            key={tab.id}
            id={panelElementId}
            role="tabpanel"
            aria-labelledby={tabElementId}
            tabIndex={0}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
