import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-20 lg:px-10">
      <p className="text-sm font-semibold tracking-[0.24em] text-[var(--muted-foreground)] uppercase">
        404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--foreground)]">
        The requested product route does not exist.
      </h1>
      <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
        This demo intentionally treats missing products as a first-class route state
        instead of leaving users on a broken view.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/products"
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Return to catalog
        </Link>
        <Link
          href="/"
          className="rounded-full bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--foreground)] shadow-[0_16px_34px_-24px_rgba(30,36,48,0.28)] transition hover:-translate-y-0.5"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
