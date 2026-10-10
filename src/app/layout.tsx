import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Ticker from "@/components/ticker";
import { getLang } from "@/lib/language";
import "./globals.css";

// a font that supports Bangla and English
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "আজকের বাজারের দাম এক নজরে — Today's market prices at a glance",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getLang();

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={hindSiliguri.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <Ticker />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* the small messages (toasts) are shown here */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
