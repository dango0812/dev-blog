export function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="animate-pulse">
          <div className="aspect-16/10 rounded-xl bg-muted" />
          <div className="mt-3 h-3 w-16 rounded bg-muted" />
          <div className="mt-2 h-5 w-3/4 rounded bg-muted" />
          <div className="mt-2 h-3 w-24 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
