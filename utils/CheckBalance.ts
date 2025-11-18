import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

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

export const checkBalance = checkSolanaBalance;
