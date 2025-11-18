"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  const heroStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    padding: "32px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, rgba(16,24,40,0.95), rgba(2,6,23,0.85))",
    border: "1px solid rgba(148,163,184,0.18)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  };

  const cardStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(15,23,42,0.65)",
    textDecoration: "none",
    color: "#e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const sectionStyle: React.CSSProperties = {
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "rgba(2,6,23,0.55)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const buttonRow: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "16px",
  };

  const primaryButton: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(56,189,248,0.6)",
    background: "rgba(56,189,248,0.12)",
    color: "#f8fafc",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
  };

  const quickLinks = [
    {
      href: "/mnemonic",
      title: "Mnemonic Lab",
      body: "Generate and back up phrases, inspect derivations.",
    },
    {
      href: "/mint-token",
      title: "Mint Token",
      body: "Create SPL mints, configure metadata, ship devnet assets.",
    },
    {
      href: "/signature",
      title: "Signature",
      body: "Sign + verify arbitrary payloads with your connected wallet.",
    },
    {
      href: "/airdrop",
      title: "Airdrop",
      body: "Request SOL, check balances, and send devnet transfers.",
    },
  ];

  const workflow = [
    {
      title: "1. Seed & Derive",
      desc: "Spin up mnemonics, derive deterministic addresses, export keys.",
    },
    {
      title: "2. Connect Wallet",
      desc: "Use wallet-adapter to bring any devnet wallet into the flow.",
    },
    {
      title: "3. Build & Ship",
      desc: "Mint SPL tokens, sign payloads, airdrop SOL, and test transfers.",
    },
  ];

  const callouts = [
    {
      title: "Full Devnet Toolkit",
      body: "Everything wired to devnet RPCs so you can experiment safely without reaching for scripts.",
    },
    {
      title: "Mnemonic-Centric",
      body: "A single session phrase drives deterministic Solana derivations to keep testing predictable.",
    },
    {
      title: "Composable Utilities",
      body: "Each tab is a focused tool—jump straight into minting, signing, or funding workflows.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <section style={heroStyle}>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "0.8rem",
            color: "#94a3b8",
          }}
        >
          Solana Native Toolkit
        </div>
        <h1 style={{ fontSize: "2.5rem", margin: 0, lineHeight: 1.2 }}>
          Ship SPL tokens, sign payloads, and test airdrops faster than spinning
          up scripts.
        </h1>
        <p style={{ color: "#cbd5f5", margin: 0 }}>
          Each route is a purpose-built lab: start with the mnemonic workspace,
          then hop over to token minting, signing, or SOL funding without losing
          context.
        </p>
        <div style={buttonRow}>
          <Link
            href="/mnemonic"
            style={{
              ...primaryButton,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Launch Mnemonic Lab →
          </Link>
          <Link
            href="/mint-token"
            style={{
              ...primaryButton,
              borderColor: "rgba(16,185,129,0.6)",
              background: "rgba(16,185,129,0.12)",
            }}
          >
            Mint SPL Token
          </Link>
        </div>
      </section>

      <section style={gridStyle} aria-label="Quick navigation">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} style={cardStyle}>
            <strong>{link.title}</strong>
            <span style={{ color: "#94a3b8" }}>{link.body}</span>
          </Link>
        ))}
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Workflow Snapshot</h2>
        <p style={{ margin: 0, color: "#94a3b8" }}>
          The navigation above mirrors a natural Solana dev loop. Stay oriented
          with the steps below.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {workflow.map((step) => (
            <div
              key={step.title}
              style={{
                padding: "18px",
                borderRadius: "16px",
                border: "1px solid rgba(148,163,184,0.2)",
                background: "rgba(15,23,42,0.55)",
              }}
            >
              <strong>{step.title}</strong>
              <p style={{ marginTop: "8px", color: "#cbd5f5" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Why build here?</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {callouts.map((callout) => (
            <div
              key={callout.title}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(5,8,22,0.65)",
                border: "1px solid rgba(148,163,184,0.25)",
              }}
            >
              <strong>{callout.title}</strong>
              <p style={{ marginTop: "8px", color: "#cbd5f5" }}>{callout.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
