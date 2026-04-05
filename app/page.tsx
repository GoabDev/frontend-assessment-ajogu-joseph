import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

const principles = [
  "Typed server-side data layer",
  "URL-based filters and pagination",
  "Route metadata and not-found handling",
  "Optimized images and streaming states",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-6 py-12 lg:px-10 lg:py-20">
      <section className="grid gap-8 overflow-hidden rounded-[2.75rem] bg-[#223a5c] px-6 py-10 text-white shadow-[0_30px_80px_-48px_rgba(34,58,92,0.65)] lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#ffd39d] uppercase">
            Next.js Product Explorer
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight sm:text-6xl">
            Small scope. High signal. Clean engineering.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            This project stays deliberately compact so the code quality is the story:
            server-rendered data, shareable URL state, focused route handling, and
            performance-aware UI decisions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90"
            >
              Explore products
            </Link>
            <a
              href="https://dummyjson.com/docs/products"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              View API source
            </a>
          </div>
        </div>
        <div className="rounded-[2.25rem] bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <p className="text-sm font-semibold tracking-[0.22em] text-slate-200 uppercase">
            What this demo emphasizes
          </p>
          <div className="mt-6 grid gap-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-[1.5rem] bg-white/10 px-4 py-4 text-sm text-white"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
