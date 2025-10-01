import { createStore } from "zustand/vanilla";
import type { IMethodology } from "@/shared/types/methodologies.types";
import { getMethodologiesRequest } from "@/shared/api/methodologies";

export type MethodologiesState = {
  methodologies: IMethodology[];
  isLoading: boolean;
  error: Error | null;
};

export type MethodologiesActions = {
  fetchMethodologies: () => Promise<void>;
};

export type MethodologiesStore = MethodologiesState & MethodologiesActions;

export const initMethodologiesStore = (): MethodologiesState => {
  return { methodologies: [], isLoading: false, error: null };
};

export const defaultInitState: MethodologiesState = {
  methodologies: [],
  isLoading: false,
  error: null,
};

export const createMethodologiesStore = (
  initState: MethodologiesState = defaultInitState,
) => {
  return createStore<MethodologiesStore>()((set) => ({
    ...initState,
    fetchMethodologies: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data,
          error,
        }: { data: IMethodology[] | null; error: Error | null } =
          await getMethodologiesRequest();

        if (error) throw error;

        if (data) {
          set({ methodologies: data });
        }
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
  }));
};
