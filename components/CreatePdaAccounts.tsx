import { use, useState } from "react";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";

export default function CreatePdaAccounts() {
    const [tokenName, setTokenName] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverPDA, setReceiverPDA] = useState("");
    const [mintAddress, setMintAddress] = useState("");

    
    const wallet = useWallet();

    return (
        <div>PDA Page</div>
    );
}