import type { Transaction } from "viem";
import StatCard from "@/components/StatCard";
import BlockTable from "@/components/BlockTable";
import TxTable from "@/components/TxTable";
import { getRecentBlocks } from "@/lib/rpc";

export const revalidate = 0;

export default async function HomePage() {
  let blocks;
  let error: string | null = null;

  try {
    blocks = await getRecentBlocks(10);
  } catch {
    error = "Unable to reach the BlockDAG RPC node. Check BLOCKDAG_RPC_URL and network connectivity.";
  }

  if (error || !blocks) {
    return (
      <div className="rounded-lg border border-amber-700/50 bg-amber-950/30 p-6 text-amber-300">
        {error}
      </div>
    );
  }

  const latestBlock = blocks[0];
  const transactions: Transaction[] = blocks.flatMap((b) => b.transactions as Transaction[]).slice(0, 10);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Latest Block" value={latestBlock.number?.toString() ?? "-"} />
        <StatCard label="Gas Used" value={latestBlock.gasUsed.toString()} />
        <StatCard label="Gas Limit" value={latestBlock.gasLimit.toString()} />
        <StatCard label="Txns (last 10 blocks)" value={transactions.length.toString()} />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Latest Blocks</h2>
        <BlockTable blocks={blocks} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Latest Transactions</h2>
        {transactions.length > 0 ? (
          <TxTable transactions={transactions} />
        ) : (
          <p className="text-zinc-500">No transactions found in the latest blocks.</p>
        )}
      </section>
    </div>
  );
}
