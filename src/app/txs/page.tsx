import type { Transaction } from "viem";
import TxTable from "@/components/TxTable";
import Pagination from "@/components/Pagination";
import { getBlockRange, getLatestBlockNumber } from "@/lib/rpc";

export const revalidate = 0;

const PAGE_SIZE = 25;
const BLOCKS_PER_PAGE = 20;

export default async function TxsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let transactions: Transaction[] = [];
  let oldestBlockNumber: bigint | null = null;
  let error: string | null = null;

  try {
    const latest = await getLatestBlockNumber();
    const from = latest - BigInt((page - 1) * BLOCKS_PER_PAGE);
    if (from >= BigInt(0)) {
      const blocks = await getBlockRange(from, BLOCKS_PER_PAGE);
      transactions = blocks.flatMap((b) => b.transactions as Transaction[]).slice(0, PAGE_SIZE);
      oldestBlockNumber = blocks.length > 0 ? blocks[blocks.length - 1].number ?? null : null;
    }
  } catch {
    error = "Unable to reach the BlockDAG RPC node. Check BLOCKDAG_RPC_URL and network connectivity.";
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-700/50 bg-amber-950/30 p-6 text-amber-300">{error}</div>
    );
  }

  const hasNext = oldestBlockNumber !== null && oldestBlockNumber > BigInt(0);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Transactions</h1>
      {transactions.length > 0 ? (
        <>
          <TxTable transactions={transactions} />
          <Pagination basePath="/txs" page={page} hasNext={hasNext} />
        </>
      ) : (
        <p className="text-zinc-500">No transactions found.</p>
      )}
    </div>
  );
}
