"use client";
import { checkSolanaBalance } from "@/utils/CheckBalance";
import React, { useState } from "react";

interface ShowAddressesProps {
    addresses: [string, string][];
}


export default function ShowAddresses({addresses}: ShowAddressesProps) {
    const [balances, setBalances] = useState<{ [key: string]: number | null }>({});
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    const handleCheckBalance = async (publicKey: string) => {
        setLoading({ ...loading, [publicKey]: true });
        try {
            const balance = await checkSolanaBalance(publicKey);
            setBalances({ ...balances, [publicKey]: balance });
        } catch (error) {
            console.error("Error fetching balance:", error);
            setBalances({ ...balances, [publicKey]: null });
        } finally {
            setLoading({ ...loading, [publicKey]: false });
        }
    };

    if (!addresses.length) {
        return (
            <div
                style={{
                    border: "1px dashed rgba(148,163,184,0.4)",
                    borderRadius: "16px",
                    padding: "18px",
                    color: "#94a3b8",
                    fontStyle: "italic",
                }}
            >
                Derive an address to see public/private keypairs here.
            </div>
        );
    }

    const listStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    };

    const itemStyle: React.CSSProperties = {
        borderRadius: "16px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "rgba(15,23,42,0.65)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas",
    };

    const balanceButton: React.CSSProperties = {
        alignSelf: "flex-start",
        padding: "8px 14px",
        borderRadius: "10px",
        background: "rgba(56,189,248,0.12)",
        border: "1px solid rgba(56,189,248,0.4)",
        color: "#f8fafc",
        cursor: "pointer",
        fontWeight: 600,
    };

    return (
        <div style={listStyle}>
            {addresses.map((address, index) => (
                <div key={index} style={itemStyle}>
                    <div style={{ color: "#94a3b8", fontWeight: 600 }}>
                        Address #{index + 1}
                    </div>
                    <div>
                        <span style={{ color: "rgba(248,250,252,0.7)" }}>Pub:</span>{" "}
                        {address[0]}
                    </div>
                    <div>
                        <span style={{ color: "rgba(248,250,252,0.7)" }}>Priv:</span>{" "}
                        {address[1]}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <button
                            style={balanceButton}
                            onClick={() => handleCheckBalance(address[0])}
                            disabled={loading[address[0]]}
                        >
                            {loading[address[0]] ? "Checking..." : "Check SOL Balance"}
                        </button>
                        {balances[address[0]] !== undefined && (
                            <div>
                                Balance: {balances[address[0]] !== null
                                    ? `${balances[address[0]]} SOL`
                                    : "Error fetching balance"}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}