import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="text-emerald-400">Welsh</span>
          <span className="text-zinc-100">dag</span>
          <span className="ml-1 text-xs font-normal text-zinc-500">explorer</span>
        </Link>
        <SearchBar className="w-full sm:w-96" />
      </div>
    </header>
  );
}
