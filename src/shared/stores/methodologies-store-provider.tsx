"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createMethodologiesStore,
  initMethodologiesStore,
  type MethodologiesStore,
} from "@/shared/stores/methodologies-store";

export type MethodologiesStoreApi = ReturnType<typeof createMethodologiesStore>;

export const MethodologiesStoreContext = createContext<
  MethodologiesStoreApi | undefined
>(undefined);

export interface MethodologiesStoreProviderProps {
  children: ReactNode;
}

export const MethodologiesStoreProvider = ({
  children,
}: MethodologiesStoreProviderProps) => {
  const storeRef = useRef<MethodologiesStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createMethodologiesStore(initMethodologiesStore());
  }

  return (
    <MethodologiesStoreContext.Provider value={storeRef.current}>
      {children}
    </MethodologiesStoreContext.Provider>
  );
};

export const useMethodologiesStore = <T,>(
  selector: (store: MethodologiesStore) => T,
): T => {
  const methodologiesStoreContext = useContext(MethodologiesStoreContext);

  if (!methodologiesStoreContext) {
    throw new Error(
      `useMethodologiesStore must be used within MethodologiesStoreProvider`,
    );
  }

  return useStore(methodologiesStoreContext, selector);
};
