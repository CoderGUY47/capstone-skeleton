"use client";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

export interface ShadcnTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ShadcnTabsProps {
  tabs: ShadcnTabItem[];
  defaultTabId?: string;
}

export function ShadcnTabs({ tabs, defaultTabId }: ShadcnTabsProps) {
  return (
    <Tabs.Root
      defaultValue={defaultTabId || tabs[0]?.id}
      className="w-full space-y-4"
    >
      <Tabs.List className="flex border-b border-zinc-200 dark:border-zinc-800 gap-2">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            className="px-4 py-2.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-t-lg data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 dark:data-[state=active]:border-zinc-100 data-[state=active]:bg-zinc-100/50 dark:data-[state=active]:bg-zinc-800/50 data-[state=inactive]:text-zinc-500 hover:data-[state=inactive]:text-zinc-800 dark:data-[state=inactive]:text-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          value={tab.id}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
