import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import Provider from "../components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { PublicStoreProvider } from "@/stores/public-store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reflection Journal App",
  description: "App for your daily reflection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}`}>
        <PublicStoreProvider>
          <Provider>
            <Toaster />
            {children}
          </Provider>
        </PublicStoreProvider>
      </body>
    </html>
  );
}
