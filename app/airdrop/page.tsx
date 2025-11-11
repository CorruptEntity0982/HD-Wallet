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
import AirDrop from "@/components/Airdrop";

export default function AirdropAdapter() {
  const endpoint =
    process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
    clusterApiUrl(WalletAdapterNetwork.Devnet);

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/zEByxYoAeae1DmrP_R1iN"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <AirDrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
