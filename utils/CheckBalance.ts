import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { JsonRpcProvider } from "ethers";

export async function checkSolanaBalance(publicKey: string): Promise<number> {
    try{
        const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_DEV_RPC_URL ||  clusterApiUrl("devnet");
        const connection = new Connection(rpcUrl, "confirmed");
        const address = new PublicKey(publicKey);
        const balance = await connection.getBalance(address);
        console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
        return balance / LAMPORTS_PER_SOL;
    }
    catch (error) {
        console.error("Error checking Solana balance:", error);
        throw error;
    }
}

export async function checkEthereumBalance(address: string): Promise<number> {
  try {
    const rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "";

    if (!rpcUrl) {
      throw new Error("ETHEREUM_RPC_URL not found in environment variables");
    }

    const provider = new JsonRpcProvider(rpcUrl);
    const balance = await provider.getBalance(address);
    return parseFloat(balance.toString()) / 1e18;
  } catch (error) {
    console.error("Error checking Ethereum balance:", error);
    throw error;
  }
}

export async function checkBalance(
  publicKey: string,
  chain: "sol" | "eth"
): Promise<number> {
  if (chain === "sol") {
    return checkSolanaBalance(publicKey);
  } else {
    return checkEthereumBalance(publicKey);
  }
}
