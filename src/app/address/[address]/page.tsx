import { notFound } from "next/navigation";
import { getAddressBalance, getAddressCode, getAddressTransactionCount } from "@/lib/rpc";
import { formatWdag, isAddress } from "@/lib/format";
import StatCard from "@/components/StatCard";

export const revalidate = 0;

export default async function AddressPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  if (!isAddress(address)) notFound();

  const [balance, nonce, code] = await Promise.all([
    getAddressBalance(address as `0x${string}`).catch(() => null),
    getAddressTransactionCount(address as `0x${string}`).catch(() => null),
    getAddressCode(address as `0x${string}`).catch(() => undefined),
  ]);

  const isContract = !!code && code !== "0x";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="break-all text-xl font-semibold">
        {isContract ? "Contract" : "Address"}{" "}
        <span className="font-mono text-zinc-400">{address}</span>
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Balance" value={balance !== null ? formatWdag(balance) : "-"} />
        <StatCard label="Transactions Sent" value={nonce?.toString() ?? "-"} />
        <StatCard label="Type" value={isContract ? "Contract" : "Externally Owned"} />
      </div>
    </div>
  );
}
