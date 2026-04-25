/* eslint-disable no-unused-vars */

import TeamSkeleton from "./TeamSkeleton";

export default function TeamSkeletonSection() {
  return (
    <section className="mb-20">
      {/* title skeleton */}
      <div className="text-center mb-10">
        <div className="h-8 w-52 bg-blue-100 rounded mx-auto" />

        <div className="w-20 h-1 bg-blue-100 mx-auto mt-3 rounded-full" />
      </div>

      {/* cards */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}