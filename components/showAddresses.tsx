"use client";
import { checkBalance } from "@/utils/CheckBalance";
import { useState } from "react";

interface ShowAddressesProps {
    addresses: [string, string][];
    chain: "sol" | "eth";
}


export default function ShowAddresses({addresses, chain}: ShowAddressesProps) {
    const [balances, setBalances] = useState<{ [key: string]: number | null }>({});
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    const handleCheckBalance = async (publicKey: string) => {
        setLoading({ ...loading, [publicKey]: true });
        try {
            const balance = await checkBalance(publicKey, chain);
            setBalances({ ...balances, [publicKey]: balance });
        } catch (error) {
            console.error("Error fetching balance:", error);
            setBalances({ ...balances, [publicKey]: null });
        } finally {
            setLoading({ ...loading, [publicKey]: false });
        }
    };

    return (
        <div>
            <h3>Your Generated Addresses:</h3>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>
                        <div>Pub Key: {address[0]}</div>
                        <div>Priv Key: {address[1]}</div>
                        <div>
                            <button 
                                onClick={() => handleCheckBalance(address[0])}
                                disabled={loading[address[0]]}
                            >
                                {loading[address[0]] ? "Checking..." : "Check Balance"}
                            </button>
                            {balances[address[0]] !== undefined && (
                                <div>
                                    Balance: {balances[address[0]] !== null 
                                        ? `${balances[address[0]]} ${chain === "sol" ? "SOL" : "ETH"}` 
                                        : "Error fetching balance"}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}