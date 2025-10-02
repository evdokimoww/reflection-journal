"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createEntryStore,
  EntryStore,
  initEntryStore,
} from "@/shared/stores/entry-store";

export type EntryStoreApi = ReturnType<typeof createEntryStore>;

export const EntryStoreContext = createContext<EntryStoreApi | undefined>(
  undefined,
);

export interface EntriesStoreProviderProps {
  children: ReactNode;
}

export const EntryStoreProvider = ({ children }: EntriesStoreProviderProps) => {
  const storeRef = useRef<EntryStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createEntryStore(initEntryStore());
  }

  return (
    <EntryStoreContext.Provider value={storeRef.current}>
      {children}
    </EntryStoreContext.Provider>
  );
};

export const useEntryStore = <T,>(selector: (store: EntryStore) => T): T => {
  const entryStoreContext = useContext(EntryStoreContext);

  if (!entryStoreContext) {
    throw new Error(`useEntriesStore must be used within EntriesStoreProvider`);
  }

  return useStore(entryStoreContext, selector);
};
