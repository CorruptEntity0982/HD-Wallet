"use client";
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
import React from "react";
import TokenPage from "@/components/CreateToken";

export default function MintTokenPage() {
  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const heroStyle: React.CSSProperties = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.2)",
    background:
      "linear-gradient(135deg, rgba(6,78,59,0.85), rgba(4,17,15,0.9))",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const connectRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  };

  return (
    <div>
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
                  Mint SPL Tokens
                </div>
                <h1 style={{ margin: 0 }}>Solana Token LaunchPad</h1>
                <p style={{ margin: 0, color: "#ccfbf1" }}>
                  Connect a devnet wallet, define metadata, and spin up SPL mints
                  in minutes. Ideal for rapid prototyping and QA flows.
                </p>
                <div style={connectRow}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
              </section>
              <TokenPage />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
