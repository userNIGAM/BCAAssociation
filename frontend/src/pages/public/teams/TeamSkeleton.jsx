// /* eslint-disable no-unused-vars */

export default function TeamSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 text-center">
        {/* image skeleton */}
        <div className="flex justify-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-100" />
        </div>

        {/* text skeleton */}
        <div className="mt-5 space-y-3 flex flex-col items-center">
          <div className="h-5 w-40 rounded bg-blue-100" />

          <div className="h-4 w-32 rounded bg-slate-100" />

          <div className="h-4 w-24 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}