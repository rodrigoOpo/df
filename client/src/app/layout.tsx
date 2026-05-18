import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Georama } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const georama = Georama({
  subsets: ["latin"],
  weight: "variable",  // ← esto es clave para que sea variable
  variable: "--font-georama",
});

export const metadata: Metadata = {
  title: "ns q poner aquí UnU",
  description: "Creado por Rodrigo Moreno-Opo Vecchio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
