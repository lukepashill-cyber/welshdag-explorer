import { createPublicClient, http, type Block, type Transaction, type TransactionReceipt } from "viem";

const rpcUrl = process.env.BLOCKDAG_RPC_URL ?? "http://127.0.0.1:8545";

export const client = createPublicClient({
  transport: http(rpcUrl),
});

export async function getLatestBlockNumber(): Promise<bigint> {
  return client.getBlockNumber();
}

export async function getBlockByNumber(blockNumber: bigint): Promise<Block> {
  return client.getBlock({ blockNumber, includeTransactions: true });
}

export async function getBlockByHash(hash: `0x${string}`): Promise<Block> {
  return client.getBlock({ blockHash: hash, includeTransactions: true });
}

export async function getTransactionByHash(hash: `0x${string}`): Promise<Transaction> {
  return client.getTransaction({ hash });
}

export async function getTransactionReceiptByHash(hash: `0x${string}`): Promise<TransactionReceipt> {
  return client.getTransactionReceipt({ hash });
}

export async function getAddressBalance(address: `0x${string}`): Promise<bigint> {
  return client.getBalance({ address });
}

export async function getAddressTransactionCount(address: `0x${string}`): Promise<number> {
  return client.getTransactionCount({ address });
}

export async function getAddressCode(address: `0x${string}`): Promise<`0x${string}` | undefined> {
  return client.getCode({ address });
}

export async function getRecentBlocks(count: number): Promise<Block[]> {
  const latest = await getLatestBlockNumber();
  const numbers: bigint[] = [];
  for (let i = BigInt(0); i < BigInt(count) && latest - i >= BigInt(0); i++) {
    numbers.push(latest - i);
  }
  return Promise.all(numbers.map((n) => getBlockByNumber(n)));
}
