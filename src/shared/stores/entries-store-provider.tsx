"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createEntriesStore,
  type EntriesStore,
  initEntriesStore,
} from "@/shared/stores/entries-store";

export type EntriesStoreApi = ReturnType<typeof createEntriesStore>;

export const EntriesStoreContext = createContext<EntriesStoreApi | undefined>(
  undefined,
);

export interface EntriesStoreProviderProps {
  children: ReactNode;
}

export const EntriesStoreProvider = ({
  children,
}: EntriesStoreProviderProps) => {
  const storeRef = useRef<EntriesStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createEntriesStore(initEntriesStore());
  }

  return (
    <EntriesStoreContext.Provider value={storeRef.current}>
      {children}
    </EntriesStoreContext.Provider>
  );
};

export const useEntriesStore = <T,>(
  selector: (store: EntriesStore) => T,
): T => {
  const entriesStoreContext = useContext(EntriesStoreContext);

  if (!entriesStoreContext) {
    throw new Error(`useEntriesStore must be used within EntriesStoreProvider`);
  }

  return useStore(entriesStoreContext, selector);
};

export const useEntriesStoreApi = (): EntriesStoreApi => {
  const store = useContext(EntriesStoreContext);
  if (!store) {
    throw new Error(
      "useEntriesStoreApi must be used within EntriesStoreProvider",
    );
  }
  return store;
};
