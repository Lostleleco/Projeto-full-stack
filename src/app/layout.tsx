/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";  // Corrigido para a versão client-side
import { ptBR } from '@clerk/localizations'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={clsx("bg-slate-700", geistSans.variable, geistMono.variable, "antialiased")}>
          <Navbar />
          <main className="h-screen p-16">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
