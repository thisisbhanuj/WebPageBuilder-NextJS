import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Page Builder",
  description: "Web Page Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://unpkg.com/grapesjs-component-countdown"></Script>
      <Script src="https://unpkg.com/grapesjs-plugin-forms"></Script>
      <Script src="https://unpkg.com/grapesjs"></Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
