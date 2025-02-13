"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import metadata from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <link rel="icon" href={(metadata.icons as { icon: string }).icon} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white flex flex-col min-h-screen`}
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Header />
        <main className="container mx-auto px-6 py-8 flex-grow">{children}</main>
        <footer className="w-full py-4 bg-gray-800 bg-opacity-80 text-center text-sm">
          © {new Date().getFullYear()} MoodTunes | Built with OpenAI & Spotify API
        </footer>
      </body>
    </html>
  );
}
