import type { Block } from "viem";
import BlockTable from "@/components/BlockTable";
import Pagination from "@/components/Pagination";
import { getBlockRange, getLatestBlockNumber } from "@/lib/rpc";

export const revalidate = 0;

const PAGE_SIZE = 25;

export default async function BlocksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let blocks: Block[] | undefined;
  let error: string | null = null;

  try {
    const latest = await getLatestBlockNumber();
    const from = latest - BigInt((page - 1) * PAGE_SIZE);
    if (from < BigInt(0)) {
      blocks = [];
    } else {
      blocks = await getBlockRange(from, PAGE_SIZE);
    }
  } catch {
    error = "Unable to reach the BlockDAG RPC node. Check BLOCKDAG_RPC_URL and network connectivity.";
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-700/50 bg-amber-950/30 p-6 text-amber-300">{error}</div>
    );
  }

  const oldest = blocks && blocks.length > 0 ? blocks[blocks.length - 1].number : null;
  const hasNext = oldest !== null && oldest !== undefined && oldest > BigInt(0);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Blocks</h1>
      {blocks && blocks.length > 0 ? (
        <>
          <BlockTable blocks={blocks} />
          <Pagination basePath="/blocks" page={page} hasNext={hasNext} />
        </>
      ) : (
        <p className="text-zinc-500">No blocks found.</p>
      )}
    </div>
  );
}
