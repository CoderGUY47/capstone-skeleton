export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 py-6 dark:border-zinc-800">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Capstone Skeleton. Built with Next.js App Router.
        </p>
      </div>
    </footer>
  );
}
