import Link from "next/link";

export default function Pagination({
  basePath,
  page,
  hasNext,
}: {
  basePath: string;
  page: number;
  hasNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${page - 1}`}
          className="rounded border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:bg-zinc-900"
        >
          ← Newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-zinc-500">Page {page}</span>
      {hasNext ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className="rounded border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:bg-zinc-900"
        >
          Older →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
