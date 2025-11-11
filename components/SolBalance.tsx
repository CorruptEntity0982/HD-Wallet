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

  return <div>Your Sol Balance is: {balance !== null ? `${balance} SOL` : 'Loading...'}</div>;
}
