import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </div>
  );
}
