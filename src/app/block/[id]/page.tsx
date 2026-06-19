import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlockByHash, getBlockByNumber } from "@/lib/rpc";
import { isHash, shortHash } from "@/lib/format";
import TxTable from "@/components/TxTable";
import type { Transaction } from "viem";

export const revalidate = 0;

export default async function BlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const block = await (isHash(id) ? getBlockByHash(id as `0x${string}`) : getBlockByNumber(BigInt(id))).catch(
    () => null
  );

  if (!block) notFound();

  const rows = [
    ["Block Number", block.number?.toString()],
    ["Hash", block.hash],
    ["Parent Hash", block.parentHash],
    ["Timestamp", new Date(Number(block.timestamp) * 1000).toUTCString()],
    ["Miner", block.miner],
    ["Gas Used", block.gasUsed.toString()],
    ["Gas Limit", block.gasLimit.toString()],
    ["Transactions", block.transactions.length.toString()],
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Block #{block.number?.toString()}</h1>

      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t border-zinc-800 first:border-t-0">
                <td className="w-48 bg-zinc-900/40 px-4 py-2 text-zinc-500">{label}</td>
                <td className="px-4 py-2 font-mono text-zinc-200 break-all">
                  {label === "Miner" ? (
                    <Link href={`/address/${value}`} className="text-emerald-400 hover:underline">
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Transactions</h2>
        {block.transactions.length > 0 ? (
          <TxTable transactions={block.transactions as Transaction[]} />
        ) : (
          <p className="text-zinc-500">No transactions in this block.</p>
        )}
      </section>

      <p className="text-xs text-zinc-600">
        <span className="font-mono">{shortHash(block.hash ?? "")}</span>
      </p>
    </div>
  );
}
