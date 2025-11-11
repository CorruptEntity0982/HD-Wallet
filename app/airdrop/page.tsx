"use client";
import React from "react";
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
import AirDrop from "@/components/SolAirdrop";
import SolBalance from "@/components/SolBalance";
import SolTransaction from "@/components/SolTransaction";

export default function AirdropAdapter() {
  const [balance, setBalance] = React.useState<number | null>(null);

  return (
    <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <AirDrop></AirDrop>
          <SolBalance balance={balance} setBalance={setBalance} />
          <SolTransaction balance={balance} refreshBalance={() => setBalance(null)} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
