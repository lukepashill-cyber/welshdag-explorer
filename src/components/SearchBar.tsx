"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAddress, isBlockNumber, isHash } from "@/lib/format";

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;

    if (isHash(value)) {
      router.push(`/tx/${value}`);
    } else if (isAddress(value)) {
      router.push(`/address/${value}`);
    } else if (isBlockNumber(value)) {
      router.push(`/block/${value}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by block number / tx hash / address"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
      />
    </form>
  );
}
