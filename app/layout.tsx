import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Agenlabs Agency - Websites that stand out and make a difference |Aceternity Template",
  description:
    "Agency Template is a website template for Next.js. It's built with Tailwind CSS, TypeScript, and is fully customizable.",
  openGraph: {
    images: ["https://agency.aceternity.com/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white antialiased h-full w-full")}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
