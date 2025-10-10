import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/globals/Navbar";
import Footer from "@/components/globals/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DGO Tech Hub",
  description: "La comunidad tecnologica mas grande de Durango",
 icons: [
    {
      rel: "icon",
      url: "/LogoFlatAzul.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async
        src="https://umami.ipstests.ovh/script.js"
        data-website-id="6fdc1c97-45aa-41f9-ba85-84db7fc6d2cf"
        />
      </head>
      <body
        
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <main>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
