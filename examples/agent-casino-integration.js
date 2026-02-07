/**
 * AgentDEX x Agent Casino Integration
 *
 * Swap tokens via AgentDEX, then play casino games on Agent Casino.
 * Both tools are API-first, so they compose naturally.
 *
 * Agent Casino: https://github.com/Romulus-Sol/agent-casino
 * Program ID: 5bo6H5rnN9nn8fud6d1pJHmSZ8bpowtQj18SGXG93zvV (devnet)
 *
 * Usage:
 *   AGENT_DEX_URL=http://localhost:3001 node examples/agent-casino-integration.js
 */

const AGENT_DEX_BASE = process.env.AGENT_DEX_URL || "http://localhost:3001";

// Solana mints
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

/**
 * Step 1: Swap USDC to SOL via AgentDEX
 */
async function swapToSol(apiKey, amountUsdc) {
  // Get quote
  const quoteRes = await fetch(
    `${AGENT_DEX_BASE}/api/v1/quote?` +
      `inputMint=${USDC_MINT}&outputMint=${SOL_MINT}&amount=${amountUsdc}`
  );
  const quote = await quoteRes.json();
  console.log(
    `Quote: ${quote.inAmount / 1e6} USDC -> ${quote.outAmount / 1e9} SOL`
  );

  // Execute swap
  const swapRes = await fetch(`${AGENT_DEX_BASE}/api/v1/swap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputMint: USDC_MINT,
      outputMint: SOL_MINT,
      amount: String(amountUsdc),
      slippageBps: 50,
    }),
  });
  return swapRes.json();
}

/**
 * Step 2: Play Agent Casino via x402 HTTP gateway
 *
 * Agent Casino exposes games via HTTP with x402 payment headers.
 * No SDK needed — just HTTP calls.
 *
 * Or use the SDK:
 *   npm install @agent-casino/sdk
 *   const { AgentCasino } = require("@agent-casino/sdk");
 *   const casino = new AgentCasino(connection, wallet);
 *   await casino.coinFlip(0.1, "heads");
 */
async function playCasino(casinoUrl) {
  // Example: coin flip via HTTP
  const res = await fetch(`${casinoUrl}/play/coin-flip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 0.1, choice: "heads" }),
  });
  return res.json();
}

/**
 * Full flow: swap tokens on AgentDEX, play on Agent Casino
 */
async function main() {
  const apiKey = process.env.AGENT_DEX_KEY;
  const casinoUrl = process.env.CASINO_URL || "http://localhost:3402";

  if (!apiKey) {
    console.log("Register on AgentDEX first:");
    console.log(
      `  curl -X POST ${AGENT_DEX_BASE}/api/v1/agents/register -H "Content-Type: application/json" -d '{"name": "casino-player"}'`
    );
    console.log("Then set AGENT_DEX_KEY=adx_...");
    return;
  }

  console.log("=== AgentDEX x Agent Casino ===\n");

  // Swap 1 USDC to SOL
  console.log("1. Swapping USDC -> SOL via AgentDEX...");
  const swap = await swapToSol(apiKey, 1_000_000); // 1 USDC
  console.log(`   Swap tx: ${swap.txSignature}\n`);

  // Play casino with the SOL
  console.log("2. Playing coin flip on Agent Casino...");
  const result = await playCasino(casinoUrl);
  console.log(`   Result: ${JSON.stringify(result)}\n`);

  // Check portfolio after
  console.log("3. Checking portfolio on AgentDEX...");
  const portfolio = await fetch(
    `${AGENT_DEX_BASE}/api/v1/portfolio/${swap.wallet || "your-wallet"}`
  );
  const balances = await portfolio.json();
  console.log(`   Balances: ${JSON.stringify(balances)}`);
}

module.exports = { swapToSol, playCasino };

if (require.main === module) {
  main().catch(console.error);
}
