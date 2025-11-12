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
import TokenPage from "@/components/CreateToken";

export default function SignaturePage() {
  return (
    <div>
      <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <WalletMultiButton />
              <h1>Solana Token LaunchPad </h1>
              <WalletDisconnectButton />
            </div>

            <TokenPage />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
