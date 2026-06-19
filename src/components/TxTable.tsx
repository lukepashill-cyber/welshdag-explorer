import Link from "next/link";
import type { Transaction } from "viem";
import { formatWdag, shortHash } from "@/lib/format";

export default function TxTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/70 text-xs uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-2">Tx Hash</th>
            <th className="px-4 py-2">Block</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className="border-t border-zinc-800 hover:bg-zinc-900/40">
              <td className="px-4 py-2">
                <Link href={`/tx/${tx.hash}`} className="font-mono text-emerald-400 hover:underline">
                  {shortHash(tx.hash)}
                </Link>
              </td>
              <td className="px-4 py-2 text-zinc-400">
                <Link href={`/block/${tx.blockNumber}`} className="hover:underline">
                  {tx.blockNumber?.toString()}
                </Link>
              </td>
              <td className="px-4 py-2 font-mono text-zinc-400">
                <Link href={`/address/${tx.from}`} className="hover:underline">
                  {shortHash(tx.from)}
                </Link>
              </td>
              <td className="px-4 py-2 font-mono text-zinc-400">
                {tx.to ? (
                  <Link href={`/address/${tx.to}`} className="hover:underline">
                    {shortHash(tx.to)}
                  </Link>
                ) : (
                  <span className="italic text-zinc-500">contract creation</span>
                )}
              </td>
              <td className="px-4 py-2 text-zinc-300">{formatWdag(tx.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
