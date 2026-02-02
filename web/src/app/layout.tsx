import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AgentDEX — The DEX Built for AI Agents',
  description: 'Programmatic trading on Solana. API-first DEX powered by Jupiter routing. Built for autonomous AI agents.',
  openGraph: {
    title: 'AgentDEX — The DEX Built for AI Agents',
    description: 'Programmatic trading on Solana. API-first DEX powered by Jupiter routing.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
