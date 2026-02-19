import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sohan Kusuma | Data Analyst & ML Engineer",
  description:
    "Sohan Kusuma — Data Analyst, Machine Learning Engineer & Business Analyst. Transforming raw data into powerful insights and intelligent systems.",
  keywords: [
    "Sohan Kusuma",
    "Data Analyst",
    "ML Engineer",
    "Machine Learning",
    "Python",
    "Power BI",
    "TensorFlow",
    "Business Analyst",
  ],
  openGraph: {
    title: "Sohan Kusuma | Data Analyst & ML Engineer",
    description:
      "Data Analyst & ML Engineer — Transforming raw data into powerful insights and intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
