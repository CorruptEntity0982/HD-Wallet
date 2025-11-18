"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

export default function AirDrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();

  async function sendAirDropToUser() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet!");
      return;
    }
    try{
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const signature = await connection.requestAirdrop(wallet.publicKey, amountInLamports);
      alert(`Airdrop of ${amount} SOL requested. Transaction signature: ${signature}`);
    }
    catch(error){
      alert(`Airdrop failed: ${error}`);
    }
  }

  const panelStyle: React.CSSProperties = {
    borderRadius: "20px",
    border: "1px solid rgba(148,163,184,0.2)",
    background: "rgba(5,8,22,0.7)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148,163,184,0.4)",
    background: "rgba(2,6,23,0.85)",
    color: "#f8fafc",
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(56,189,248,0.5)",
    background: "rgba(56,189,248,0.15)",
    color: "#f0f9ff",
    fontWeight: 600,
    cursor: "pointer",
    width: "fit-content",
  };

  return (
    <div style={panelStyle}>
      <div>
        <p style={{ margin: 0, color: "#94a3b8" }}>Connected Wallet</p>
        <strong style={{ fontFamily: "ui-monospace" }}>
          {wallet.publicKey?.toBase58() ?? "No Wallet Connected"}
        </strong>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label htmlFor="airdrop-amount" style={{ color: "#94a3b8" }}>
          Amount (SOL)
        </label>
        <input
          id="airdrop-amount"
          type="number"
          placeholder="1"
          value = {amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button style={buttonStyle} onClick={sendAirDropToUser}>Request Airdrop</button>
    </div>
  );
}
