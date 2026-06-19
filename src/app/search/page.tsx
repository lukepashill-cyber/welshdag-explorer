export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6">
      <p className="text-zinc-400">
        No results found for <span className="font-mono text-zinc-200">{q}</span>. Try a block number,
        transaction hash, or address.
      </p>
    </div>
  );
}
