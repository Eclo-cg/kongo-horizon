"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (
      set: (updater: (s: FavoriteState) => Partial<FavoriteState>) => void,
      get: () => FavoriteState
    ) => ({
      ids: [],
      toggle: (id: string) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x: string) => x !== id) : [...s.ids, id] })),
      has: (id: string) => get().ids.includes(id),
    }),
    { name: "kongo-horizon:favorites" }
  )
);
