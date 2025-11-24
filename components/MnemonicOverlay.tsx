import React from "react";
import { wordlists } from "bip39";

export default function MnemonicOverlay({
  isOpen,
  onClose,
  setPhrase,
}: {
  isOpen: boolean;
  onClose: () => void;
  setPhrase: (phrase: string) => void;
}) {
  const [mnemonicInput, setMnemonicInput] = React.useState("");
  const [invalidWords, setInvalidWords] = React.useState<string[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  const validateAndUseMnemonic = () => {
    const words = mnemonicInput.trim().split(/\s+/);
    const wordlist = wordlists.EN;
    const invalid: string[] = [];

    words.forEach((word) => {
      if (!wordlist.includes(word.toLowerCase())) {
        invalid.push(word);
      }
    });

    if (invalid.length > 0) {
      setInvalidWords(invalid);
      setErrorMessage(
        `Invalid words found: ${invalid.join(
          ", "
        )}. Please check against BIP39 wordlist.`
      );
      return;
    }

    if (words.length !== 12) {
      setErrorMessage(
        `Mnemonic must be exactly 12 words. You entered ${words.length} words.`
      );
      return;
    }

    // All words are valid
    setPhrase(mnemonicInput.trim());
    setMnemonicInput("");
    setInvalidWords([]);
    setErrorMessage("");
    onClose();
  };

  const handleClose = () => {
    setMnemonicInput("");
    setInvalidWords([]);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: "rgba(12, 20, 38, 0.98)",
    padding: "32px",
    borderRadius: "20px",
    border: "1px solid rgba(148, 163, 184, 0.3)",
    maxWidth: "600px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "12px",
    border: `1px solid ${
      errorMessage ? "rgba(239, 68, 68, 0.5)" : "rgba(148, 163, 184, 0.3)"
    }`,
    backgroundColor: "rgba(5, 8, 22, 0.8)",
    color: "#f8fafc",
    fontSize: "14px",
    fontFamily: "monospace",
    resize: "vertical",
  };

  const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  };

  const primaryButton: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "12px",
    background: "rgba(56, 189, 248, 0.15)",
    border: "1px solid rgba(56, 189, 248, 0.5)",
    color: "#f8fafc",
    fontWeight: 600,
    cursor: "pointer",
  };

  const secondaryButton: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "12px",
    background: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    color: "#e2e8f0",
    fontWeight: 500,
    cursor: "pointer",
  };

  const errorStyle: React.CSSProperties = {
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#fca5a5",
    fontSize: "14px",
  };

  return (
    <div style={overlayStyle} onClick={handleClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 style={{ margin: 0, marginBottom: "8px" }}>
            Enter Mnemonic Phrase
          </h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>
            Enter your 12 word mnemonic phrase separated by spaces.
          </p>
        </div>

        <textarea
          style={textareaStyle}
          placeholder="Enter your mnemonic phrase (12 words separated by spaces)"
          value={mnemonicInput}
          onChange={(e) => {
            setMnemonicInput(e.target.value);
            setErrorMessage("");
            setInvalidWords([]);
          }}
        />

        {errorMessage && (
          <div style={errorStyle}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <div style={buttonRowStyle}>
          <button style={secondaryButton} onClick={handleClose}>
            Cancel
          </button>
          <button
            style={primaryButton}
            onClick={validateAndUseMnemonic}
            disabled={!mnemonicInput.trim()}
          >
            Use Mnemonic
          </button>
        </div>
      </div>
    </div>
  );
}
