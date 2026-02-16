import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinehaven Ventures LLC — Vertical SaaS Products for Energy & AI",
  description: "Pinehaven Ventures builds and operates vertical SaaS products. Power Digital Intelligence, Power Queue Tracker, and AutoReels.ai — serving energy markets, data center developers, and content creators.",
  openGraph: {
    title: "Pinehaven Ventures LLC",
    description: "Vertical SaaS products for energy markets, data center developers, and content creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
