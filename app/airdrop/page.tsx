"use client";
import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import AirDrop from "@/components/SolAirdrop";
import SolBalance from "@/components/SolBalance";
import SolTransaction from "@/components/SolTransaction";

export default function AirdropAdapter() {
  const [balance, setBalance] = React.useState<number | null>(null);

  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const heroStyle: React.CSSProperties = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.2)",
    background:
      "linear-gradient(135deg, rgba(14,116,144,0.85), rgba(2,6,23,0.9))",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const connectRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  };

  const toolGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  };

  return (
    <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={pageStyle}>
            <section style={heroStyle}>
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.8rem",
                  color: "rgba(94,234,212,0.9)",
                }}
              >
                Funding Toolkit
              </div>
              <h1 style={{ margin: 0 }}>Send and Airdrop Solana</h1>
              <p style={{ margin: 0, color: "#ccfbf1" }}>
                Request devnet SOL, monitor balances, and push transfers to other
                recipients without leaving this tab.
              </p>
              <div style={connectRow}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </section>
            <div style={toolGrid}>
              <AirDrop />
              <SolBalance balance={balance} setBalance={setBalance} />
            </div>
            <SolTransaction balance={balance} refreshBalance={() => setBalance(null)} />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
