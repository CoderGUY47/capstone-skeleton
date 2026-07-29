import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
          Capstone Skeleton
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            Home
          </Link>
          <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            About
          </Link>
          <Link href="/blog/hello-world" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            Blog
          </Link>
          <Link href="/docs/getting-started" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
