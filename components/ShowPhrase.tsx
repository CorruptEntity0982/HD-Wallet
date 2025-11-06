interface ShowPhraseProps {
    phrase: string;
}

export function ShowPhrase({ phrase }: ShowPhraseProps) {
    const words = phrase.split(" ");
    return (
        <div>
            <h3>Your Mnemonic Phrase:</h3>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>
                        {index + 1}. {word}
                    </li>
                ))}
            </ul>
        </div>
    )
}
