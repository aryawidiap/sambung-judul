import type { Metadata } from "next";
import { geistSans, geistMono, figtree } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sambung Judul",
  description: "Ayo main sambung judul lagu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
