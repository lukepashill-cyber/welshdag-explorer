import Link from "next/link";
import type { Block } from "viem";
import { shortHash, timeAgo } from "@/lib/format";

export default function BlockTable({ blocks }: { blocks: Block[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/70 text-xs uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-2">Block</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Hash</th>
            <th className="px-4 py-2">Txns</th>
            <th className="px-4 py-2">Miner</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.hash} className="border-t border-zinc-800 hover:bg-zinc-900/40">
              <td className="px-4 py-2">
                <Link href={`/block/${block.number}`} className="text-emerald-400 hover:underline">
                  {block.number?.toString()}
                </Link>
              </td>
              <td className="px-4 py-2 text-zinc-400">{timeAgo(block.timestamp)}</td>
              <td className="px-4 py-2">
                <Link href={`/block/${block.hash}`} className="font-mono text-zinc-300 hover:underline">
                  {shortHash(block.hash ?? "")}
                </Link>
              </td>
              <td className="px-4 py-2 text-zinc-400">{block.transactions.length}</td>
              <td className="px-4 py-2 font-mono text-zinc-400">
                <Link href={`/address/${block.miner}`} className="hover:underline">
                  {shortHash(block.miner)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
