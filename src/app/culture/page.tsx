import { SectionHeader } from "@/components/section-header";

export default function CulturePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader title="Culture" description="Danses, peuples, rites, arts, langues — aperçu éditorial." />
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">Danses et Musiques</h3>
          <p className="text-slate-600">Panorama des rythmes traditionnels et contemporains.</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">Peuples et Langues</h3>
          <p className="text-slate-600">Diversité ethnique et linguistique du Congo.</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h3 className="mb-2 text-lg font-semibold">Arts et Artisanat</h3>
          <p className="text-slate-600">Sculptures, masques, tissages et savoir-faire.</p>
        </article>
      </div>
    </div>
  );
}
