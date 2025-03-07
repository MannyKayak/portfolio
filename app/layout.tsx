import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const gameBoyFont = localFont({
  variable: "--font-gameboy",
  src: "../public/fonts/EarlyGameBoy.ttf",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manfredi Rizza | Portfolio",
  description: "Portfolio di Manfredi Rizza, ex atleta e sviluppatore web.",
  icons: ["u_spiddu_logo.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gameBoyFont.className}>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
