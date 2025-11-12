"use client";
import { createWallet } from "@/utils/CreateWallet";
import React from "react";
import { Mnemonic } from "@/utils/CreateMnemonic";
import { ShowPhrase } from "@/components/ShowPhrase";
import ShowAddresses from "@/components/showAddresses";

export default function Home() {
  const [solanaAddresses, setAddresses] = React.useState<[string, string][]>([]);
  const [etheriumAddresses, setEtheriumAddresses] = React.useState<[string, string][]>([]);
  const [solIndex, setIndex] = React.useState(0);
  const [ethIndex, setEthIndex] = React.useState(0);
  const [phrase, setPhrase] = React.useState<string>("");

  React.useEffect(() => {
    setPhrase(new Mnemonic().phrase);
  }, []);

  return (
    <div>
      <header>
        <div>Welcome To CryptoWallet</div>
      </header>
      <main>
        <div>
          <ShowPhrase phrase={phrase} />
        </div>

        <button
          onClick={() => {
            const wallet = createWallet(phrase, 501, solIndex, "sol");
            setAddresses([...solanaAddresses, [wallet.publicKey, wallet.privateKey]]);
            setIndex(solIndex + 1);
          }}
        >
          Create New Solana Address
        </button>
        <div>
          <ShowAddresses addresses={solanaAddresses} chain="sol" />
        </div>

        <button
          onClick={() => {
            const wallet = createWallet(phrase, 60, ethIndex, "eth");
            setEtheriumAddresses([...etheriumAddresses, [wallet.publicKey, wallet.privateKey]]);
            setEthIndex(ethIndex + 1);
          }}
        >
          Create New Etherium Address
        </button>
        <div>
          <ShowAddresses addresses={etheriumAddresses} chain="eth" />
        </div>
      </main>
    </div>
  );
}
