import { SectionHeader } from "@/components/section-header";
import { Timeline } from "@/components/timeline";

const items = [
  { year: "XVe s.", title: "Royaume du Kongo", description: "Puissance régionale influente en Afrique centrale." },
  { year: "1880", title: "Traité de Makoko", description: "Début de la période coloniale française." },
  { year: "1960", title: "Indépendance", description: "Naissance de la République du Congo." },
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader title="Histoire du Congo" description="Une timeline synthétique des moments clés." />
      <Timeline items={items} />
    </div>
  );
}
