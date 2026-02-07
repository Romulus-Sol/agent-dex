# 🤖 AgentDEX — The DEX Built for AI Agents

**AgentDEX** is the first decentralized exchange designed from the ground up for AI agents. No wallet popups, no UI — just a clean REST API that routes through Jupiter for best-price execution on Solana.

## Why?

Every DEX today is built for humans clicking buttons. But the future of trading is autonomous agents. AgentDEX gives them:

- **One API call to swap** — register, fund, trade
- **Jupiter V6 routing** — same best-price execution as Jupiter
- **Agent identity** — each agent gets a Solana keypair + API key
- **Limit orders** — set targets, auto-execute when price hits
- **Portfolio tracking** — balances, USD values, trade history

## Quick Start

```bash
# Register your agent
curl -X POST http://localhost:3001/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{"name": "my-bot"}'

# Get a quote (1 SOL → USDC)
curl "http://localhost:3001/api/v1/quote?\
inputMint=So11111111111111111111111111111111111111112&\
outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&\
amount=1000000000"

# Execute swap
curl -X POST http://localhost:3001/api/v1/swap \
  -H "Authorization: Bearer adx_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "amount": "1000000000",
    "slippageBps": 50
  }'
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/v1/quote` | Get swap quote | No |
| `POST` | `/api/v1/swap` | Execute swap | Optional |
| `GET` | `/api/v1/prices/:mint` | Token price | No |
| `GET` | `/api/v1/prices?mints=` | Multiple prices | No |
| `GET` | `/api/v1/portfolio/:wallet` | Wallet balances | No |
| `GET` | `/api/v1/portfolio/:wallet/history` | Trade history | No |
| `POST` | `/api/v1/limit-order` | Place limit order | Yes |
| `GET` | `/api/v1/limit-order` | List orders | Yes |
| `DELETE` | `/api/v1/limit-order/:id` | Cancel order | Yes |
| `POST` | `/api/v1/agents/register` | Register agent | No |
| `GET` | `/api/v1/agents/me` | Agent info | Yes |
| `GET` | `/api/v1/health` | Health check | No |
| `GET` | `/api/v1/tokens/trending` | Trending tokens | No |

## Architecture

```
┌─────────────────┐       ┌──────────────────┐
│   AI Agent      │──────▶│   AgentDEX API   │
│   (Your Code)   │◀──────│   Express + TS   │
└─────────────────┘       └────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌──────────┐  ┌──────────┐  ┌──────────┐
            │ Jupiter  │  │  Helius  │  │  SQLite  │
            │ V6 API   │  │   RPC    │  │   (DB)   │
            │ Routing  │  │  Chain   │  │  Orders  │
            └──────────┘  └──────────┘  └──────────┘
                    │              │
                    ▼              ▼
            ┌─────────────────────────────┐
            │      Solana Blockchain      │
            └─────────────────────────────┘
```

## Tech Stack

- **API**: Node.js + Express + TypeScript
- **Frontend**: Next.js 14
- **Database**: SQLite (better-sqlite3)
- **Chain**: Solana (@solana/web3.js)
- **Routing**: Jupiter V6 Aggregator
- **RPC**: Helius

## Development

```bash
# Install dependencies
npm install

# Run both API + web
npm run dev

# API only (port 3001)
npm run dev:api

# Web only (port 3000)
npm run dev:web
```

## Build

```bash
npm run build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | API server port |
| `HELIUS_RPC_URL` | Helius default | Solana RPC endpoint |
| `DB_PATH` | `./data/agentdex.db` | SQLite database path |

## Integrations

### Agent Casino
Swap tokens on AgentDEX, then play casino games on [Agent Casino](https://github.com/Romulus-Sol/agent-casino) — a headless casino protocol for AI agents.

See [](examples/agent-casino-integration.js) for the full flow: quote, swap, play, check portfolio.



## License

MIT

---

Built for the [Colosseum Agent Hackathon](https://www.colosseum.org/) 🏛️
