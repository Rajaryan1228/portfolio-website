import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.seo.url),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} font-sans bg-dark text-light antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
