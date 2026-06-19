import { formatEther } from "viem";

export function shortHash(hash: string, chars = 6): string {
  if (hash.length <= chars * 2 + 2) return hash;
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

export function formatWdag(value: bigint): string {
  return `${formatEther(value)} WDAG`;
}

export function timeAgo(timestampSeconds: bigint): string {
  const seconds = Math.floor(Date.now() / 1000) - Number(timestampSeconds);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function isHash(value: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(value);
}

export function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function isBlockNumber(value: string): boolean {
  return /^\d+$/.test(value);
}
