interface ShowAddressesProps {
    addresses: string[];
}


export default function ShowAddresses({addresses}: ShowAddressesProps) {
    return (
        <div>
            <h3>Your Generated Addresses:</h3>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>
                        {index + 1}. {address}
                    </li>
                ))}
            </ul>
        </div>
    )
}