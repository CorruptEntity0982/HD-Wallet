import React, { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface SolBalanceProps {
  balance: number | null;
  setBalance: (balance: number | null) => void;
}

export default function SolBalance({ balance, setBalance }: SolBalanceProps) {
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    async function getBalance() {
      if (!wallet.publicKey) {
        setBalance(null);
        return;
      }

      try {
        const solBalance = await connection.getBalance(wallet.publicKey);
        setBalance(solBalance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    }

    getBalance();
    const interval = setInterval(getBalance, 10000);

    return () => clearInterval(interval);
  }, [wallet.publicKey, connection, setBalance]);

  const panelStyle: React.CSSProperties = {
    borderRadius: "20px",
    border: "1px solid rgba(148,163,184,0.2)",
    background: "rgba(15,23,42,0.7)",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  return (
    <div style={panelStyle}>
      <span style={{ color: "#94a3b8" }}>Current Devnet Balance</span>
      <strong style={{ fontSize: "1.5rem" }}>
        {balance !== null ? `${balance} SOL` : "Loading..."}
      </strong>
    </div>
  );
}
