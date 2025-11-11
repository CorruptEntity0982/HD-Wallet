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
      await connection.confirmTransaction(signature, 'confirmed');
      
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
    <div>
      <input
        id="toAddress"
        type="text"
        placeholder="Receiver's Public Key"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        id="amount"
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.1"
        min="0"
      />
      <button onClick={sendSolTokens}>Send {amount} SOL</button>
      {balance !== null && <p>Available: {balance} SOL</p>}
    </div>
  );
}
