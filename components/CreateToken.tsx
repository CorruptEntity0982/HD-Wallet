import { useState } from "react";

export default function TokenPage() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function createToken() {
    console.log("Creating token with details:");
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Token Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Token Symbol"
        />
      </div>
      <div>
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          placeholder="Initial Supply"
        />
      </div>
      <div>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
      </div>

      <button onClick={createToken}>Create Token</button>
    </div>
  );
}
