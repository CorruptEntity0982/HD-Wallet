import React from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface SolTransactionProps {
  balance: number | null;
  refreshBalance: () => void;
}

export default function SolTransaction({ balance, refreshBalance }: SolTransactionProps) {
  const [toAddress, setToAddress] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("0.5");
  const wallet = useWallet();
  const { connection } = useConnection();

  const panelStyle: React.CSSProperties = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.2)",
    background: "rgba(5,8,22,0.75)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148,163,184,0.4)",
    background: "rgba(2,6,23,0.85)",
    color: "#f8fafc",
    fontFamily: "ui-monospace",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(250,204,21,0.5)",
    background: "rgba(250,204,21,0.15)",
    color: "#fefce8",
    fontWeight: 600,
    cursor: "pointer",
    width: "fit-content",
  };

  async function sendSolTokens() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!toAddress) {
      alert("Please enter a recipient address!");
      return;
    }

    const amountToSend = parseFloat(amount);

    if (balance === null || balance < amountToSend) {
      alert(`Insufficient balance! You have ${balance} SOL but trying to send ${amountToSend} SOL`);
      return;
    }

    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amountToSend * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);

      alert(`Transaction sent successfully! Sent ${amountToSend} SOL\nSignature: ${signature}`);

      // Refresh balance after successful transaction
      refreshBalance();
      setToAddress("");
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return (
    <div style={panelStyle}>
      <div>
        <h3 style={{ marginBottom: "6px" }}>Send SOL</h3>
        {balance !== null && (
          <p style={{ margin: 0, color: "#94a3b8" }}>Available: {balance} SOL</p>
        )}
      </div>
      <input
        id="toAddress"
        type="text"
        placeholder="Receiver's Public Key"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        style={inputStyle}
      />
      <input
        id="amount"
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.1"
        min="0"
        style={inputStyle}
      />
      <button style={buttonStyle} onClick={sendSolTokens}>Send {amount} SOL</button>
    </div>
  );
}
