import React, { useState } from "react";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
} from "@solana/spl-token";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

export default function TokenPage() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mintAccounts, setMintAccounts] = useState<string[]>([]);

  const wallet = useWallet();
  const { connection } = useConnection();

  const panelStyle: React.CSSProperties = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(5,8,22,0.75)",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(2,6,23,0.85)",
    color: "#f8fafc",
    fontSize: "0.95rem",
  };

  const primaryButton: React.CSSProperties = {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(16,185,129,0.6)",
    background: "linear-gradient(120deg, rgba(16,185,129,0.25), rgba(34,197,94,0.25))",
    color: "#ecfdf5",
    fontWeight: 600,
    cursor: "pointer",
  };

  const mintListStyle: React.CSSProperties = {
    borderRadius: "16px",
    border: "1px solid rgba(34,197,94,0.35)",
    background: "rgba(6,95,70,0.35)",
    padding: "16px",
    fontFamily: "ui-monospace, SFMono-Regular",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  async function createToken() {
    const mintAccount = Keypair.generate();
    const lamports = await connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!tokenName || !tokenSymbol || !initialSupply || !imageUrl) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintAccount.publicKey,
          space: MINT_SIZE,
          lamports: lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintAccount.publicKey,
          6,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_PROGRAM_ID
        )
      );
      const recentBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = recentBlockhash.blockhash;
      transaction.feePayer = wallet.publicKey;
      transaction.partialSign(mintAccount);
      const signature = await wallet.sendTransaction(transaction, connection);

      if (signature) {
        setMintAccounts([...mintAccounts, mintAccount.publicKey.toBase58()]);
      } else {
        alert("Transaction failed!");
      }
    } catch (error) {
      alert(`Token creation failed: ${error}`);
    }
  }

  return (
    <div style={panelStyle}>
      <div>
        <label style={{ display: "block", marginBottom: "6px", color: "#94a3b8" }}>
          Token Name
        </label>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Solana Dev Token"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px", color: "#94a3b8" }}>
          Symbol
        </label>
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="SDT"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px", color: "#94a3b8" }}>
          Initial Supply
        </label>
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          placeholder="1000000"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px", color: "#94a3b8" }}>
          Image URL
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          style={inputStyle}
        />
      </div>

      <button style={primaryButton} onClick={createToken}>
        Create Token
      </button>

      {mintAccounts.length > 0 && (
        <div>
          <h3 style={{ marginBottom: "8px" }}>Mint Accounts</h3>
          <div style={mintListStyle}>
            {mintAccounts.map((account) => (
              <span key={account}>{account}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

