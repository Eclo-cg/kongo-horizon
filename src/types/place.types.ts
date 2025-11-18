export type Place = {
  id: string;
  name: string;
  city: string;
  category: "nature" | "histoire" | "culture" | "gastronomie" | "art";
  coords: { lat: number; lng: number };
  cover: string;
  images: string[];
  description: string;
  history?: string;
};
