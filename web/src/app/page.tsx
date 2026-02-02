'use client';

import './globals.css';

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/v1/quote',
    desc: 'Get a swap quote',
    params: 'inputMint, outputMint, amount, slippageBps?',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/swap',
    desc: 'Execute a swap',
    params: 'inputMint, outputMint, amount, slippageBps?, walletPrivateKey?',
    auth: 'optional',
  },
  {
    method: 'GET',
    path: '/api/v1/prices/:mint',
    desc: 'Get token price',
    params: 'mint (path)',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/prices',
    desc: 'Get multiple token prices',
    params: 'mints (comma-separated)',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/portfolio/:wallet',
    desc: 'Get wallet balances',
    params: 'wallet (path)',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/portfolio/:wallet/history',
    desc: 'Get trade history',
    params: 'wallet (path), limit?',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/limit-order',
    desc: 'Place a limit order',
    params: 'inputMint, outputMint, amount, targetPrice, side',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/v1/limit-order',
    desc: 'List active limit orders',
    params: '-',
    auth: true,
  },
  {
    method: 'DELETE',
    path: '/api/v1/limit-order/:id',
    desc: 'Cancel a limit order',
    params: 'id (path)',
    auth: true,
  },
  {
    method: 'POST',
    path: '/api/v1/agents/register',
    desc: 'Register an agent',
    params: 'name?',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/agents/me',
    desc: 'Get agent info',
    params: '-',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/v1/health',
    desc: 'Health check',
    params: '-',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/tokens/trending',
    desc: 'Get trending tokens',
    params: '-',
    auth: false,
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: '#14F195',
    POST: '#9945FF',
    DELETE: '#FF6B6B',
    PUT: '#FFD93D',
  };
  return (
    <span
      style={{
        color: colors[method] || '#fff',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '0.75rem',
        minWidth: '4rem',
        display: 'inline-block',
      }}
    >
      {method}
    </span>
  );
}

function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div
      style={{
        background: '#0D0C14',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: 'rgba(155, 151, 176, 0.06)',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          {language}
        </span>
      </div>
      <pre
        style={{
          padding: '20px',
          margin: 0,
          overflowX: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Background glow effects */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(20, 241, 149, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(11, 10, 16, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #9945FF, #14F195)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AgentDEX
            </span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              Features
            </a>
            <a href="#quickstart" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Quickstart
            </a>
            <a href="#api" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
              API Docs
            </a>
            <a
              href="https://github.com/solana-clawd/agent-dex"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                padding: '8px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '8rem 2rem 6rem',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          zIndex: 1,
        }}
      >
        <div
          className="animate-fade-in"
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(153, 69, 255, 0.3)',
            background: 'rgba(153, 69, 255, 0.08)',
            marginBottom: '2rem',
            fontSize: '0.85rem',
            color: 'var(--accent-purple)',
            fontWeight: 500,
          }}
        >
          ⚡ Built on Solana · Powered by Jupiter
        </div>

        <h1
          className="animate-fade-in animate-delay-1"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}
        >
          The DEX built for{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #9945FF, #14F195)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI Agents
          </span>
        </h1>

        <p
          className="animate-fade-in animate-delay-2"
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto 3rem',
          }}
        >
          Programmatic trading with a single API call. Best-price routing through Jupiter.
          Register your agent, get a wallet, and start trading — no frontend required.
        </p>

        <div className="animate-fade-in animate-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#quickstart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #9945FF, #7B3FE4)',
              color: 'white',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.2s',
              border: 'none',
            }}
          >
            Get Started →
          </a>
          <a
            href="#api"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'transparent',
              color: 'var(--text-primary)',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              border: '1px solid var(--border-color)',
              transition: 'all 0.2s',
            }}
          >
            API Reference
          </a>
        </div>

        {/* Hero code preview */}
        <div className="animate-fade-in animate-delay-4" style={{ marginTop: '4rem', textAlign: 'left' }}>
          <CodeBlock
            language="bash"
            code={`# Register your agent — get a wallet + API key in one call
curl -X POST https://agentdex.io/api/v1/agents/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "my-trading-bot"}'

# → { "apiKey": "adx_abc123...", "wallet": { "publicKey": "7xK..." } }

# Swap 1 SOL → USDC
curl -X POST https://agentdex.io/api/v1/swap \\
  -H "Authorization: Bearer adx_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "amount": "1000000000",
    "slippageBps": 50
  }'

# → { "txSignature": "5xR...", "outputAmount": "176230000" }`}
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
          Why AgentDEX?
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
          Traditional DEXs are built for humans clicking buttons. AgentDEX is built for code.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              icon: '⚡',
              title: 'One API Call to Swap',
              desc: 'No wallet connection flow. No UI. Register, fund, swap. Three steps to autonomous trading.',
            },
            {
              icon: '🔀',
              title: 'Jupiter-Powered Routing',
              desc: 'Best-price execution across every Solana DEX. Same routing as Jupiter — zero compromise on price.',
            },
            {
              icon: '🤖',
              title: 'Agent-Native Design',
              desc: 'Register agents programmatically. Each gets a Solana keypair and API key. Built for automation.',
            },
            {
              icon: '📊',
              title: 'Portfolio Tracking',
              desc: 'Real-time token balances, USD values, and full trade history — all through the API.',
            },
            {
              icon: '⏰',
              title: 'Limit Orders',
              desc: 'Set target prices and walk away. AgentDEX monitors and executes when conditions are met.',
            },
            {
              icon: '🛡️',
              title: 'Production Ready',
              desc: 'Rate limiting, input validation, clean errors. Built like infrastructure, not a hackathon demo.',
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quickstart */}
      <section
        id="quickstart"
        style={{
          padding: '6rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
          Quickstart
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Three steps. Under a minute.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                1
              </span>
              <h3 style={{ fontWeight: 700 }}>Register your agent</h3>
            </div>
            <CodeBlock
              language="typescript"
              code={`const res = await fetch('https://agentdex.io/api/v1/agents/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'my-trading-agent' })
});
const { data } = await res.json();
// data.apiKey  → "adx_8f3a..." (save this!)
// data.wallet.publicKey → "7xKp..." (fund this wallet)`}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                2
              </span>
              <h3 style={{ fontWeight: 700 }}>Get a quote</h3>
            </div>
            <CodeBlock
              language="typescript"
              code={`const SOL = 'So11111111111111111111111111111111111111112';
const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const quote = await fetch(
  \`https://agentdex.io/api/v1/quote?inputMint=\${SOL}&outputMint=\${USDC}&amount=1000000000\`
).then(r => r.json());

console.log(quote.data.outputAmount); // USDC amount (in smallest units)
console.log(quote.data.priceImpact); // "0.01%"`}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#0B0A10',
                }}
              >
                3
              </span>
              <h3 style={{ fontWeight: 700 }}>Execute the swap</h3>
            </div>
            <CodeBlock
              language="typescript"
              code={`const swap = await fetch('https://agentdex.io/api/v1/swap', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer adx_8f3a...'
  },
  body: JSON.stringify({
    inputMint: SOL,
    outputMint: USDC,
    amount: '1000000000', // 1 SOL in lamports
    slippageBps: 50        // 0.5% slippage
  })
}).then(r => r.json());

console.log(swap.data.txSignature);  // On-chain tx hash
console.log(swap.data.explorerUrl);  // Solscan link`}
            />
          </div>
        </div>

        {/* Python example */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Works with any language
          </h3>
          <CodeBlock
            language="python"
            code={`import requests

API = "https://agentdex.io/api/v1"
KEY = "adx_8f3a..."

# Check portfolio
portfolio = requests.get(f"{API}/portfolio/{wallet}", 
    headers={"Authorization": f"Bearer {KEY}"}
).json()

# Place a limit order — buy BONK when price drops to $0.00001
requests.post(f"{API}/limit-order", json={
    "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "outputMint": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    "amount": "10000000",  # 10 USDC
    "targetPrice": 0.00001,
    "side": "buy"
}, headers={"Authorization": f"Bearer {KEY}"})`}
          />
        </div>
      </section>

      {/* API Reference */}
      <section
        id="api"
        style={{
          padding: '6rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
          API Reference
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Base URL: <code style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>https://agentdex.io/api/v1</code>
        </p>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '5rem 1fr 1fr auto',
              gap: '0',
              padding: '12px 20px',
              background: 'rgba(155, 151, 176, 0.06)',
              borderBottom: '1px solid var(--border-color)',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <span>Method</span>
            <span>Endpoint</span>
            <span>Description</span>
            <span>Auth</span>
          </div>
          {ENDPOINTS.map((ep, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '5rem 1fr 1fr auto',
                gap: '0',
                padding: '14px 20px',
                borderBottom: i < ENDPOINTS.length - 1 ? '1px solid var(--border-color)' : 'none',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
            >
              <MethodBadge method={ep.method} />
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {ep.path}
              </code>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ep.desc}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: ep.auth === true ? 'rgba(153, 69, 255, 0.15)' : ep.auth === 'optional' ? 'rgba(255, 217, 61, 0.15)' : 'rgba(20, 241, 149, 0.1)',
                  color: ep.auth === true ? '#9945FF' : ep.auth === 'optional' ? '#FFD93D' : '#14F195',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {ep.auth === true ? 'required' : ep.auth === 'optional' ? 'optional' : 'none'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Authentication</h3>
          <CodeBlock
            language="http"
            code={`Authorization: Bearer adx_your_api_key_here

# Get your API key by registering:
POST /api/v1/agents/register
Content-Type: application/json

{ "name": "my-agent" }

# Response:
{
  "success": true,
  "data": {
    "apiKey": "adx_8f3a1b2c3d4e5f...",
    "wallet": { "publicKey": "7xKp..." }
  }
}`}
          />
        </div>
      </section>

      {/* Architecture */}
      <section style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
          Architecture
        </h2>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: 2,
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          <pre style={{ margin: 0 }}>{`
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
            │ (Quotes  │  │ (Chain   │  │ (Orders, │
            │ + Swaps) │  │  Data)   │  │ Agents)  │
            └──────────┘  └──────────┘  └──────────┘
                    │              │
                    ▼              ▼
            ┌─────────────────────────────┐
            │      Solana Blockchain      │
            └─────────────────────────────┘`}</pre>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '3rem 2rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #9945FF, #14F195)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AgentDEX
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            The first DEX built for AI agents on Solana
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a
              href="https://github.com/solana-clawd/agent-dex"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}
            >
              GitHub
            </a>
            <a href="/api" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>
              API
            </a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2rem' }}>
            Built for the Colosseum Agent Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
}
