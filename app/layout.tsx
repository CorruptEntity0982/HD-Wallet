import type { Metadata } from "next";
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata: Metadata = {
  title: "Web Wallet HD",
  description: "Hierarchical Deterministic Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
