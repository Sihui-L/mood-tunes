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
  title: "MoodTunes 🎵",
  description: "AI-powered music recommendations based on your mood.",
  icons: {
    icon: "/MoodTunes-Logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        <header className="w-full py-4 bg-gray-800 text-center text-xl font-bold">
          🎶 MoodTunes - AI Music Generator
        </header>
        
        <main className="container mx-auto px-6 py-8">{children}</main>
        
        <footer className="w-full py-4 bg-gray-800 text-center text-sm">
          © {new Date().getFullYear()} MoodTunes | Built with OpenAI & Spotify API
        </footer>
      </body>
    </html>
  );
}
