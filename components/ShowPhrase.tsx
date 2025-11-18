import React from "react";

interface ShowPhraseProps {
    phrase: string;
}

export function ShowPhrase({ phrase }: ShowPhraseProps) {
    const cardStyle: React.CSSProperties = {
        borderRadius: "18px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "rgba(15,23,42,0.65)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    };

    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "12px",
    };

    const chipStyle: React.CSSProperties = {
        borderRadius: "12px",
        border: "1px solid rgba(148,163,184,0.25)",
        background: "rgba(2,6,23,0.7)",
        padding: "10px 12px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        fontSize: "0.95rem",
        color: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    };

    if (!phrase) {
        return (
            <div style={cardStyle}>
                <h3 style={{ margin: 0 }}>Your Mnemonic Phrase</h3>
                <p style={{ margin: 0, color: "#94a3b8" }}>Generating...</p>
            </div>
        );
    }

    const words = phrase.split(" ");

    return (
        <div style={cardStyle}>
            <h3 style={{ margin: 0 }}>Your Mnemonic Phrase</h3>
            <div style={gridStyle}>
                {words.map((word, index) => (
                    <div key={index} style={chipStyle}>
                        <span
                            style={{
                                color: "rgba(248,250,252,0.75)",
                                fontWeight: 600,
                                minWidth: "22px",
                            }}
                        >
                            {index + 1}.
                        </span>
                        <span>{word}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
