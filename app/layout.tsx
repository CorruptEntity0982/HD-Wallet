import type { Metadata } from "next";
import Link from "next/link";
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata: Metadata = {
  title: "Web Wallet HD",
  description: "Hierarchical Deterministic Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutStyle: React.CSSProperties = {
    margin: 0,
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#050608",
    color: "#f3f4f6",
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(5,6,8,0.9)",
    backdropFilter: "blur(8px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  const headerInner: React.CSSProperties = {
    minHeight: "72px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    gap: "24px",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    gap: "18px",
    fontSize: "0.95rem",
    flexWrap: "wrap",
  };

  const linkStyle: React.CSSProperties = {
    color: "#f3f4f6",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid transparent",
  };

  const mainStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px 64px",
  };

  return (
    <html lang="en">
      <body style={layoutStyle}>
        <header style={headerStyle}>
          <div style={headerInner}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#f9fafb",
                fontWeight: 600,
                fontSize: "1.15rem",
                letterSpacing: "0.02em",
              }}
            >
              SolDeck
            </Link>
            <nav style={navStyle}>
              <Link href="/" style={linkStyle}>
                Home
              </Link>
              <Link href="/mnemonic" style={linkStyle}>
                Mnemonic
              </Link>
              <Link href="/mint-token" style={linkStyle}>
                Mint Token
              </Link>
              <Link href="/signature" style={linkStyle}>
                Signature
              </Link>
              <Link href="/airdrop" style={linkStyle}>
                Airdrop
              </Link>
              <Link href="/token-pda" style={linkStyle}>
                Token PDA
              </Link>
            </nav>
          </div>
        </header>
        <main style={mainStyle}>{children}</main>
      </body>
    </html>
  );
}
