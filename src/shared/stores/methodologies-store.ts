import { createStore } from "zustand/vanilla";
import type { IMethodology } from "@/shared/data/methodolodies.data";
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

        const result = await getMethodologiesRequest();

        if ("error" in result && result.error) throw result.error;

        set({ methodologies: result as IMethodology[] });
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
  }));
};
