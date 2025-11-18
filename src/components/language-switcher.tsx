"use client";

import { useState } from "react";
import { Languages } from "lucide-react";

const langs = [
  { code: "fr", label: "Fr" },
  { code: "en", label: "En" },
];

export function LanguageSwitcher({ initial = "fr", variant = "light" }: { initial?: "fr" | "en"; variant?: "light" | "dark" }) {
  const [lang, setLang] = useState<"fr" | "en">(initial);
  const isDark = variant === "dark";
  return (
    <div className={`inline-flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
      <Languages size={16} />
      <div className={`inline-flex rounded-md p-1 ${isDark ? "border border-white/25" : "border border-slate-200"}`}>
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code as "fr" | "en")}
            aria-pressed={lang === l.code}
            className={`px-2 py-1 text-sm rounded ${lang === l.code ? (isDark ? "bg-white/10" : "bg-slate-100") : ""}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
