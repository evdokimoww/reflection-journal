"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createPublicStore,
  initPublicStore,
  type PublicStore,
} from "@/stores/public-store";

export type PublicStoreApi = ReturnType<typeof createPublicStore>;

export const PublicStoreContext = createContext<PublicStoreApi | undefined>(
  undefined,
);

export interface PublicStoreProviderProps {
  children: ReactNode;
}

export const PublicStoreProvider = ({ children }: PublicStoreProviderProps) => {
  const storeRef = useRef<PublicStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPublicStore(initPublicStore());
  }

  return (
    <PublicStoreContext.Provider value={storeRef.current}>
      {children}
    </PublicStoreContext.Provider>
  );
};

export const usePublicStore = <T,>(selector: (store: PublicStore) => T): T => {
  const publicStoreContext = useContext(PublicStoreContext);

  if (!publicStoreContext) {
    throw new Error(`usePublicStore must be used within PublicStoreProvider`);
  }

  return useStore(publicStoreContext, selector);
};
