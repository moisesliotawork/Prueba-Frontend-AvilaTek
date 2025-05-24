import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel App",
  description: "Minimalist travel booking experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          {children}
        </main>
      </body>
    </html>
  );
}