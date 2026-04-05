"use client";

import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-20 lg:px-10">
      <p className="text-sm font-semibold tracking-[0.24em] text-[var(--danger)] uppercase">
        Data fetch failed
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
        The product feed could not be loaded.
      </h1>
      <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
        {error.message || "A temporary upstream error interrupted the request."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Try again
      </button>
      <Link
        href="/"
        className="rounded-full bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--foreground)] shadow-[0_16px_34px_-24px_rgba(30,36,48,0.28)] transition hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  );
}
