export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
      <div className="h-6 w-56 animate-pulse rounded-full bg-[var(--surface)]" />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="aspect-square animate-pulse rounded-[2rem] bg-[var(--surface)]" />
        <div className="space-y-4">
          <div className="h-8 animate-pulse rounded-full bg-[var(--surface)]" />
          <div className="h-24 animate-pulse rounded-[2rem] bg-[var(--surface)]" />
          <div className="h-10 w-48 animate-pulse rounded-full bg-[var(--surface)]" />
        </div>
      </div>
    </main>
  );
}
