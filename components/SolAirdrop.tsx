"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

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

  return (
    <div>
      Connected Wallet Address:{" "}
      {wallet.publicKey?.toBase58() ?? "No Wallet Connected"}
      <div>
        <input
          id="publicKey"
          type="number"
          placeholder="amount"
          value = {amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendAirDropToUser}>Airdrop</button>
      </div>
    </div>
  );
}
