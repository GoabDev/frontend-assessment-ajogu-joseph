export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
      <div className="h-40 animate-pulse rounded-[2rem] bg-[var(--surface)]" />
      <div className="h-28 animate-pulse rounded-[2rem] bg-[var(--surface)]" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-[26rem] animate-pulse rounded-[2rem] bg-[var(--surface)]" />
        ))}
      </div>
    </main>
  );
}
