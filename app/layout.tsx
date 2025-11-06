import type { Metadata } from "next";

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
