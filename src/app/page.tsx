import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { Card } from "./_components/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Next.js Project Structure
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              This repository has been configured to follow the official Next.js App Router folder and file conventions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/about">
              <Button variant="primary">About Route (Route Group)</Button>
            </Link>
            <Link href="/blog/hello-world">
              <Button variant="secondary">Blog (Dynamic Route)</Button>
            </Link>
            <Link href="/docs/getting-started/setup">
              <Button variant="outline">Docs (Catch-All Route)</Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="App Router Conventions">
              Includes special files: <code>layout.tsx</code>, <code>page.tsx</code>, <code>loading.tsx</code>, <code>error.tsx</code>, <code>not-found.tsx</code>, <code>global-error.tsx</code>, <code>robots.ts</code>, <code>sitemap.ts</code>.
            </Card>

            <Card title="Modular src Directory">
              Organized into standard top-level folders: <code>components/</code>, <code>lib/</code>, <code>hooks/</code>, <code>types/</code>, and <code>config/</code>.
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
