"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Rechercher un lieu, ville, catégorie..." }: { placeholder?: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    const current = params.get("q") ?? "";
    setQ(current);
  }, [params]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usp = new URLSearchParams(params);
    if (q) usp.set("q", q); else usp.delete("q");
    router.push(`/explore?${usp.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm sm:flex">
      <Search size={16} className="text-slate-500" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-64 bg-transparent outline-none placeholder:text-slate-400"
      />
      <button type="submit" className="rounded-full bg-blue-600 px-3 py-1 text-white">Rechercher</button>
    </form>
  );
}
