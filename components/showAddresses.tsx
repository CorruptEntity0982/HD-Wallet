interface ShowAddressesProps {
    addresses: [string, string][];
}


export default function ShowAddresses({addresses}: ShowAddressesProps) {
    return (
        <div>
            <h3>Your Generated Addresses:</h3>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>
                        <div>{index + 1}. Public Key: {address[0]}</div>
                        <div>Private Key: {address[1]}</div>
                        <div>
                            <button>Check Balance</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}