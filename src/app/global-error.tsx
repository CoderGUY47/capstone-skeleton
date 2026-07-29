"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
          Global Application Error
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {error.message || "A critical error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
