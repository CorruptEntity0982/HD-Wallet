import React from "react";
import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";


export default function SignMessage() {
    const [message, setMessage] = React.useState("");
    const {publicKey, signMessage} = useWallet();

    const panelStyle: React.CSSProperties = {
        borderRadius: "24px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "rgba(5,8,22,0.75)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    };

    const textAreaStyle: React.CSSProperties = {
        minHeight: "160px",
        borderRadius: "16px",
        border: "1px solid rgba(148,163,184,0.35)",
        background: "rgba(2,6,23,0.85)",
        color: "#f8fafc",
        padding: "14px",
        fontSize: "1rem",
        lineHeight: 1.5,
    };

    const buttonStyle: React.CSSProperties = {
        alignSelf: "flex-start",
        padding: "12px 20px",
        borderRadius: "14px",
        border: "1px solid rgba(56,189,248,0.5)",
        background: "rgba(56,189,248,0.15)",
        color: "#f0f9ff",
        fontWeight: 600,
        cursor: "pointer",
    };

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
        <div style={panelStyle}>
            <div>
                <h2 style={{ margin: 0 }}>Sign Message</h2>
                <p style={{ margin: 0, color: "#94a3b8" }}>
                    Encode arbitrary payloads with your connected wallet to test verification flows.
                </p>
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message to sign"
                style={textAreaStyle}
            />
            <button style={buttonStyle} onClick={handleSignMessage}>Sign Message</button>
        </div>
    );
}