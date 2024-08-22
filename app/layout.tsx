import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blodholmen",
  description: "Play if you dare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-white bg-[url('/background.png')] ${inter.className} bg-cover`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
