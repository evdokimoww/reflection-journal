"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createTagsStore,
  initTagsStore,
  TagsStore,
} from "@/shared/stores/tags-store";

export type TagsStoreApi = ReturnType<typeof createTagsStore>;

export const TagsStoreContext = createContext<TagsStoreApi | undefined>(
  undefined,
);

export interface TagsStoreProviderProps {
  children: ReactNode;
}

export const TagsStoreProvider = ({ children }: TagsStoreProviderProps) => {
  const storeRef = useRef<TagsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTagsStore(initTagsStore());
  }

  return (
    <TagsStoreContext.Provider value={storeRef.current}>
      {children}
    </TagsStoreContext.Provider>
  );
};

export const useTagsStore = <T,>(selector: (store: TagsStore) => T): T => {
  const tagsStoreContext = useContext(TagsStoreContext);

  if (!tagsStoreContext) {
    throw new Error(`useTagsStore must be used within TagsStoreProvider`);
  }

  return useStore(tagsStoreContext, selector);
};
