"use client";

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
        className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
