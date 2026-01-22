import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import React from "react";
import Provider from "../components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { InstallPrompt } from "@/components/public/InstallPrompt";
import { ServiceWorkerRegistration } from "@/components/public/ServiceWorkerRegistration";

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
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="RefJournal" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable}`}>
        <ServiceWorkerRegistration />
        <Provider>
          <InstallPrompt />
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
