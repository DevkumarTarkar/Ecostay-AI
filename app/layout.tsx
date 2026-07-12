import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoStay AI | Luxury Villas & Eco Stays",
  description: "Experience the ultimate luxury with sustainable travel and curated stays across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background dark:bg-black text-foreground transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
