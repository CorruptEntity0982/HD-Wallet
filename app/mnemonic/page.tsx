"use client";
import { createWallet } from "@/utils/CreateWallet";
import React from "react";
import { Mnemonic } from "@/utils/CreateMnemonic";
import { ShowPhrase } from "@/components/ShowPhrase";
import { ShowAddresses }  from "@/components/ShowAddresses";

export default function Home() {
  const [solanaAddresses, setAddresses] = React.useState<[string, string][]>([]);
  const [solIndex, setIndex] = React.useState(0);
  const [phrase, setPhrase] = React.useState<string>("");

  React.useEffect(() => {
    setPhrase(new Mnemonic().phrase);
  }, []);

  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  };

  const heroStyle: React.CSSProperties = {
    padding: "28px",
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.18)",
    background:
      "linear-gradient(135deg, rgba(12,20,38,0.95), rgba(2,6,23,0.85))",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const panelStyle: React.CSSProperties = {
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "rgba(5,8,22,0.65)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  };

  const actionsRow: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  };

  const primaryButton: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "12px",
    background: "rgba(56,189,248,0.15)",
    border: "1px solid rgba(56,189,248,0.5)",
    color: "#f8fafc",
    fontWeight: 600,
    cursor: "pointer",
  };

  const secondaryButton: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "12px",
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(148,163,184,0.4)",
    color: "#e2e8f0",
    fontWeight: 500,
    cursor: "pointer",
  };

  const regenerate = () => {
    setPhrase(new Mnemonic().phrase);
    setAddresses([]);
    setIndex(0);
  };

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "0.8rem",
            color: "rgba(148,163,184,0.9)",
          }}
        >
          Mnemonic Lab
        </div>
        <h1 style={{ margin: 0, fontSize: "2.2rem" }}>
          Generate, inspect, and derive Solana keypairs deterministically.
        </h1>
        <p style={{ margin: 0, color: "#cbd5f5" }}>
          Every route in the app can reuse this phrase. Reset it anytime to
          start a new deterministic session.
        </p>
        <div style={actionsRow}>
          <button style={primaryButton} onClick={regenerate}>
            Regenerate Phrase
          </button>
          <button
            style={{ ...secondaryButton, borderStyle: "dashed" }}
            onClick={() => {
              if (!phrase || typeof navigator === "undefined") return;
              navigator.clipboard.writeText(phrase);
            }}
            disabled={!phrase}
          >
            Copy Phrase
          </button>
        </div>
      </section>

      <section style={{ ...panelStyle, gap: "28px" }}>
        <div>
          <h2 style={{ marginBottom: "6px" }}>Current Mnemonic</h2>
          <p style={{ margin: 0, color: "#94a3b8" }}>
            Store this securely before moving to minting or signature flows.
          </p>
        </div>
        <ShowPhrase phrase={phrase} />
      </section>

      <section style={panelStyle}>
        <div>
          <h2 style={{ marginBottom: "6px" }}>Derived Accounts</h2>
          <p style={{ margin: 0, color: "#94a3b8" }}>
            Uses Solana path <code>m/44'/501'/{solIndex}'/0'</code>. Increment
            the index to explore a fresh keypair.
          </p>
        </div>
        <button
          style={{ ...primaryButton, alignSelf: "flex-start" }}
          onClick={() => {
            const wallet = createWallet(phrase, 501, solIndex);
            setAddresses([
              ...solanaAddresses,
              [wallet.publicKey, wallet.privateKey],
            ]);
            setIndex(solIndex + 1);
          }}
          disabled={!phrase}
        >
          Derive Solana Address #{solIndex + 1}
        </button>
        <ShowAddresses addresses={solanaAddresses} />
      </section>
    </div>
  );
}
