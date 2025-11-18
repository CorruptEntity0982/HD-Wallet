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
import SignMessage from "@/components/SignMessage";

export default function SignaturePage() {
  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const heroStyle: React.CSSProperties = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.2)",
    background:
      "linear-gradient(135deg, rgba(46,16,101,0.85), rgba(15,6,23,0.9))",
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
                  color: "rgba(196,181,253,0.9)",
                }}
              >
                Signature Lab
              </div>
              <h1 style={{ margin: 0 }}>Verify Token Signature</h1>
              <p style={{ margin: 0, color: "#c4b5fd" }}>
                Craft payloads, sign with your adapter wallet, and instantly
                verify the resulting ed25519 signature.
              </p>
              <div style={connectRow}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </section>
            <SignMessage />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
