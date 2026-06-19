import Link from "next/link";
import { notFound } from "next/navigation";
import { getTransactionByHash, getTransactionReceiptByHash } from "@/lib/rpc";
import { formatWdag } from "@/lib/format";

export const revalidate = 0;

export default async function TxPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;

  const [tx, receipt] = await Promise.all([
    getTransactionByHash(hash as `0x${string}`).catch(() => null),
    getTransactionReceiptByHash(hash as `0x${string}`).catch(() => null),
  ]);

  if (!tx) notFound();

  const status = receipt?.status === "success" ? "Success" : receipt?.status === "reverted" ? "Failed" : "Pending";

  const rows: [string, React.ReactNode][] = [
    ["Tx Hash", tx.hash],
    ["Status", status],
    ["Block", tx.blockNumber ? (
      <Link href={`/block/${tx.blockNumber}`} className="text-emerald-400 hover:underline">
        {tx.blockNumber.toString()}
      </Link>
    ) : "pending"],
    ["From", (
      <Link href={`/address/${tx.from}`} className="text-emerald-400 hover:underline">
        {tx.from}
      </Link>
    )],
    ["To", tx.to ? (
      <Link href={`/address/${tx.to}`} className="text-emerald-400 hover:underline">
        {tx.to}
      </Link>
    ) : "Contract Creation"],
    ["Value", formatWdag(tx.value)],
    ["Gas Price", tx.gasPrice?.toString() ?? "-"],
    ["Gas Limit", tx.gas.toString()],
    ["Gas Used", receipt?.gasUsed.toString() ?? "-"],
    ["Nonce", tx.nonce.toString()],
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Transaction Details</h1>
      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t border-zinc-800 first:border-t-0">
                <td className="w-48 bg-zinc-900/40 px-4 py-2 text-zinc-500">{label}</td>
                <td className="px-4 py-2 font-mono text-zinc-200 break-all">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
