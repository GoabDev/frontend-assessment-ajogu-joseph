import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Product Explorer",
    template: "%s | Product Explorer",
  },
  description:
    "A compact Next.js App Router catalog focused on URL state, metadata, performance, and clean server-first architecture.",
  openGraph: {
    title: "Product Explorer",
    description:
      "A compact Next.js App Router catalog focused on URL state, metadata, performance, and clean server-first architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_40px_-32px_rgba(31,29,26,0.4)]">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[var(--accent-foreground)] uppercase">
                Store
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--foreground)]">
                Product Explorer
              </span>
            </Link>
            <Link
              href="/products"
              className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              Catalog
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
