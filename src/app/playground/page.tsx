"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { CustomModal } from "./components/CustomModal";
import { CustomTabs } from "./components/CustomTabs";
import { CustomDisclosure } from "./components/CustomDisclosure";
import { ShadcnModal } from "./components/ShadcnModal";
import { ShadcnTabs } from "./components/ShadcnTabs";

export default function PlaygroundPage() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isShadcnModalOpen, setIsShadcnModalOpen] = useState(false);

  const sampleTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold">Accessibility & ARIA Overview</h4>
          <p>
            This component uses a <strong>roving tabindex</strong> pattern. Press{" "}
            <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded">ArrowRight</kbd> and{" "}
            <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded">ArrowLeft</kbd> to move focus between tabs.
          </p>
        </div>
      ),
    },
    {
      id: "keyboard",
      label: "Keyboard Specs",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li><strong>ArrowRight / ArrowLeft</strong>: Navigate between tabs</li>
          <li><strong>Home / End</strong>: Jump to first / last tab</li>
          <li><strong>Tab</strong>: Focus into active tabpanel</li>
        </ul>
      ),
    },
    {
      id: "disabled",
      label: "Disabled Tab",
      disabled: true,
      content: <p>This tab is disabled and cannot be focused or selected.</p>,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12 max-w-5xl space-y-12">
        {/* Playground Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            A11y Interactive Component Playground
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Hand-crafted W3C ARIA compliant React + TypeScript components compared directly against production primitives (shadcn / Radix UI).
          </p>
        </div>

        {/* Section 1: Modal Dialog */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">1. Modal Dialog Pattern</h2>
              <p className="text-sm text-zinc-500">
                Supports focus trapping, <kbd>Escape</kbd> key dismissal, and focus restoration.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsCustomModalOpen(true)}>
                Open Custom Modal
              </Button>
              <Button variant="outline" onClick={() => setIsShadcnModalOpen(true)}>
                Open shadcn/Radix Modal
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2: Tabs */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">2. Tabs Pattern</h2>
            <p className="text-sm text-zinc-500">
              Implements W3C roving tabindex with full arrow key navigation support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">Custom Implementation</h3>
              <CustomTabs tabs={sampleTabs} ariaLabel="Custom Accessibility Tabs" />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">shadcn / Radix Implementation</h3>
              <ShadcnTabs tabs={sampleTabs} />
            </div>
          </div>
        </section>

        {/* Section 3: Disclosure */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">3. Disclosure Pattern</h2>
            <p className="text-sm text-zinc-500">
              Native button trigger with <kbd>aria-expanded</kbd> and <kbd>aria-controls</kbd> linkage.
            </p>
          </div>

          <div className="space-y-3 max-w-2xl">
            <CustomDisclosure title="What is W3C ARIA APG?" defaultOpen={true}>
              The ARIA Authoring Practices Guide (APG) provides detailed specifications, roles, and keyboard interaction guidelines for common web UI patterns.
            </CustomDisclosure>
            <CustomDisclosure title="How does keyboard interaction work?">
              Disclosure triggers are interactive buttons activated via <kbd>Space</kbd> or <kbd>Enter</kbd> key press, toggling the visibility of content panels.
            </CustomDisclosure>
          </div>
        </section>
      </main>
      <Footer />

      {/* Render Modals */}
      <CustomModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Custom Modal Dialog"
        description="Built from scratch in React + TS following W3C ARIA APG modal dialog specifications."
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Press <kbd className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded">Tab</kbd> to test focus trapping. Focus will wrap continuously between the input below and the close button.
          </p>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsCustomModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCustomModalOpen(false)}>Confirm</Button>
          </div>
        </div>
      </CustomModal>

      <ShadcnModal
        isOpen={isShadcnModalOpen}
        onClose={() => setIsShadcnModalOpen(false)}
        title="shadcn / Radix Modal Dialog"
        description="Built using Radix UI Dialog primitive with portals and body scroll locking."
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This is the production-grade Radix Dialog implementation.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setIsShadcnModalOpen(false)}>Done</Button>
          </div>
        </div>
      </ShadcnModal>
    </div>
  );
}
