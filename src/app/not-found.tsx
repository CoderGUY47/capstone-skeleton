import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        404 - Page Not Found
      </h2>
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Could not find the requested resource or page.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Return Home
      </Link>
    </div>
  );
}
