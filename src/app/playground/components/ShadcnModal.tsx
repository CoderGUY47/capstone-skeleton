"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface ShadcnModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ShadcnModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ShadcnModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl outline-none dark:border-zinc-800 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-xl font-bold tracking-tight">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close dialog"
              className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              ✕
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
