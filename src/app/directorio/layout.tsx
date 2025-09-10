import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/globals/Navbar";
import Footer from "@/components/globals/Footer";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DirectorioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="min-h-screen bg-slate-50">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
