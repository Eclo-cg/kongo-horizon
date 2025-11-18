"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ total, pageSize = 9 }: { total: number; pageSize?: number }) {
  const params = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(params.get("page") || 1));
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const setPage = (p: number) => {
    const usp = new URLSearchParams(params);
    usp.set("page", String(p));
    router.push(`?${usp.toString()}`);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        className="h-9 rounded-md border border-slate-200 px-3 text-sm disabled:opacity-50"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Précédent
      </button>
      <div className="text-sm text-slate-600">
        Page {page} / {totalPages}
      </div>
      <button
        className="h-9 rounded-md border border-slate-200 px-3 text-sm disabled:opacity-50"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Suivant
      </button>
    </div>
  );
}
