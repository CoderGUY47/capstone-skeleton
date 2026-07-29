# Accessibility & Component Architecture Notes: Custom vs. shadcn/ui (Radix UI)

This document provides a comparative analysis between the custom W3C ARIA APG compliant components built from scratch in React + TypeScript and production-grade primitives provided by **shadcn/ui** (built on top of Radix UI primitives).

---

## 🎯 Summary of Custom Implementations

### 1. Modal Dialog (`CustomModal.tsx`)
- **ARIA Roles & Attributes**: Implements `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby` dynamically generated via React's `useId()`.
- **Keyboard Interaction**:
  - `Escape` key closes the active modal dialog.
  - `Tab` / `Shift+Tab` focus trapping cycles focus exclusively through focusable elements inside the modal.
- **Focus Management**:
  - Captures `document.activeElement` prior to modal opening.
  - Restores focus to the triggering element upon closure.

### 2. Tabs (`CustomTabs.tsx`)
- **ARIA Roles & Attributes**: Implements `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- **Roving Tabindex Pattern**:
  - Selected tab maintains `tabIndex={0}`, while unselected tabs maintain `tabIndex={-1}`.
- **Keyboard Interaction**:
  - `ArrowRight` / `ArrowLeft` (and `ArrowDown` / `ArrowUp`) switch focus and selection sequentially.
  - `Home` and `End` jump directly to the first and last enabled tabs.

### 3. Disclosure (`CustomDisclosure.tsx`)
- **ARIA Roles & Attributes**: Uses a native `<button>` element with `aria-expanded="true/false"` and `aria-controls` linked to the collapsible content panel.
- **Keyboard Interaction**: `Enter` and `Space` key activation handled natively by HTML button element semantics.

---

## 🔍 Concrete Gaps Identified vs. shadcn/ui (Radix UI Primitives)

While our custom components strictly pass the W3C ARIA APG keyboard and role specifications, examining shadcn/ui source code highlights **4 concrete architecture and UX gaps** present in custom implementations:

---

### Gap 1: Portal Rendering & Stacking Context Isolation (`Dialog`)

* **Custom Implementation**: The modal DOM node is rendered inline inside the parent React component hierarchy where the state lives.
* **shadcn/ui (Radix UI)**: Uses React Portals (`Dialog.Portal`) to mount dialog content into `document.body` (or a specified container).
* **Why it Matters**: Inline modal rendering risks visual bugs whenever a parent container applies CSS properties like `transform`, `overflow: hidden`, `perspective`, or `z-index`. Portals guarantee that the dialog is elevated to the top stacking context layer of the DOM.

---

### Gap 2: Body Scroll Locking & Layout Shift Prevention (`Dialog`)

* **Custom Implementation**: Hides/shows the backdrop over the current viewport, but background document body scrolling is still enabled unless custom scroll-lock logic is executed.
* **shadcn/ui (Radix UI)**: Radix automatically injects `overflow: hidden` on `document.body` when a dialog is active, while dynamically calculating scrollbar width offsets (`padding-right`) to prevent layout shift across different browsers and operating systems.

---

### Gap 3: Screen Reader Fallbacks & Accessibility Assertions (`Dialog` & `Tabs`)

* **Custom Implementation**: Relies on callers explicitly providing a title and description prop to link `aria-labelledby` and `aria-describedby`.
* **shadcn/ui (Radix UI)**: Radix includes internal assertions and accessible `VisuallyHidden` primitives. If a developer omits a visible title, Radix logs a developer warning or requires an accessible title/description to prevent shipping inaccessible dialogs to production.

---

### Gap 4: Robust Focus Scope & Pointer Event Interception (`FocusScope`)

* **Custom Implementation**: Manual keydown listener checking `Tab` and `Shift+Tab` across queries of standard focusable selector strings (`a`, `button`, `input`, etc.).
* **shadcn/ui (Radix UI)**: Uses Radix `@radix-ui/react-focus-scope` and `@radix-ui/react-dismissable-layer`. This handles edge cases including:
  1. Iframe focus transitions.
  2. Virtual keyboard inputs on iOS/Android.
  3. Outside pointer clicks (distinguishing between backdrop clicks and clicks on external interactive targets).
  4. Automatic focus trap recovery when focusable children are dynamically added or removed inside the dialog during React concurrent renders.

---

## 🛠️ Conclusion

Building components by hand enforces a deep understanding of keyboard traps, roving tabindexes, and ARIA state synchronization. However, using production primitives like **shadcn/ui** is essential in large-scale applications to handle DOM portals, scroll lock layout shifts, and cross-platform screen reader edge cases.
