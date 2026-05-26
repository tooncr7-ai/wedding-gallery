import type { Metadata } from "next";
import "./globals.css";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Memorymhee",
  description: "A beautiful collection of wedding memories",
  openGraph: {
    title: "Memorymhee",
    description: "A beautiful collection of wedding memories",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Gallery",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-cream min-h-screen">
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
