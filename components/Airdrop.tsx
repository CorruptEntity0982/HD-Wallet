"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function AirDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<string>("");

  async function sendAirDropToUser() {
    if (wallet.publicKey) {
      const airdropAmount = parseFloat(amount);
      try {
        await connection.requestAirdrop(
          wallet.publicKey,
          airdropAmount * LAMPORTS_PER_SOL
        );
        alert(`Airdrop of ${airdropAmount} SOL requested successfully!`);
      } catch (error) {
        alert(`Airdrop failed: ${error}`);
      }
    } else {
      alert("Wallet not connected");
    }
  }
  return (
    <div>
      Connected Wallet Address:{" "}
      {wallet.publicKey?.toBase58() ?? "No Wallet Connected"}
      <div>
        <input
          id="publicKey"
          type="number"
          placeholder="Amount to Airdrop"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendAirDropToUser}>Airdrop</button>
      </div>
    </div>
  );
}
