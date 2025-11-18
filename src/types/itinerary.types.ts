export type Itinerary = {
  id: string;
  name: string;
  duration: string; // e.g., "2 jours"
  cover: string;
  places: string[]; // Place ids
};
