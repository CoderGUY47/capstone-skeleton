export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Docs: {slug.join(" / ")}
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This is an example of a catch-all route segment [...slug].
      </p>
    </div>
  );
}
