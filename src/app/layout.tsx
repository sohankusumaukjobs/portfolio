import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StarBackground from "@/components/StarBackground";

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
    "Data Analytics and ML graduate with expertise in Python, SQL, Power BI, TensorFlow, and GenAI. Open to data analyst and ML roles in London, UK.",
  keywords: ["Data Analyst", "ML Engineer", "Python", "Power BI", "London"],
  openGraph: {
    title: "Sohan Kusuma | Data Analyst",
    description: "Turning data into decisions.",
    url: "https://sohankusumaukjobs.github.io/portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[var(--font-inter)] antialiased relative overflow-x-hidden">
        <StarBackground />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="w-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
