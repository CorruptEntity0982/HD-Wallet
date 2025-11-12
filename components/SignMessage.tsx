import React from "react";
import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";


export default function SignMessage() {
    const [message, setMessage] = React.useState("");
    const {publicKey, signMessage} = useWallet();

    async function handleSignMessage() {
        if (!publicKey){
            alert("Wallet not connected");
            return;
        }
        if (!signMessage) {
            alert("Message signing not supported");
            return;
        }

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
            alert("Signature verification failed");
            return;
        }
        alert(`Message verified successfully: ${Buffer.from(signature).toString("hex")}`);
    }
    return (
        <div>
            <h2>Sign Message</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message to sign"
            />
            <button onClick={handleSignMessage}>Sign Message</button>
        </div>
    );
}