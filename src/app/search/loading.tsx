export default function Loading() {
  return (
    <div className="max-w-[var(--container-width)] mx-auto py-8">
      <div className="w-full relative mb-18 mt-5">
        <div className="h-10 bg-gray-200 animate-pulse rounded-lg max-w-[500px] mx-auto mb-8"></div>
      </div>

      <div className="space-y-8">
        <div className="h-8 bg-gray-200 animate-pulse rounded-lg max-w-[300px] mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-[var(--border-radius)] overflow-hidden bg-white">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-4/5"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/5 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 