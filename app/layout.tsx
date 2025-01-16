import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={poppins.className}>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
