import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

class Wallet {
  publicKey: string;
  privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  static generateAddress(
    phrase: string,
    coin: number,
    index: number
  ): { publicKey: string; privateKey: string } {
    const seed = mnemonicToSeedSync(phrase);
    const path = `m/44'/${coin}'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    return {
      publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
      privateKey: Buffer.from(secret).toString("hex"),
    };
  }

}

export function createWallet(
  phrase: string,
  coin: number,
  index: number
): Wallet {
  const { publicKey, privateKey } = Wallet.generateAddress(phrase, coin, index);
  return new Wallet(publicKey, privateKey);
}
