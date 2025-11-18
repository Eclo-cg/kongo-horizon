import { Suspense } from 'react';
import { ItinerariesContent } from './itineraries-content';

export const dynamic = 'force-dynamic';

export default function ItinerariesPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-10 w-64 animate-pulse rounded-md bg-slate-200 mb-8"></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-slate-200"></div>
          ))}
        </div>
      </div>
    }>
      <ItinerariesContent />
    </Suspense>
  );
}
