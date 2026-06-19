# Welshdag Explorer

A block explorer for the BlockDAG network, built with Next.js, Tailwind CSS, and viem.

## Features

- Latest blocks and transactions on the home page
- Block detail pages (by number or hash)
- Transaction detail pages
- Address pages (balance, nonce, contract detection)
- Search bar that resolves block numbers, tx hashes, and addresses

## Setup

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and set BLOCKDAG_RPC_URL to your node's JSON-RPC endpoint
npm run dev
```

## Environment variables

- `BLOCKDAG_RPC_URL` — JSON-RPC HTTP endpoint of a BlockDAG node (EVM-compatible).
