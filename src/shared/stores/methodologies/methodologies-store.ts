import type { Methodology } from "@/shared/types";
import { getMethodologiesRequest } from "@/shared/api/methodologies";
import {
  MethodologiesState,
  MethodologiesStore,
} from "@/shared/stores/methodologies/types";
import { create } from "zustand";

export const defaultInitState: MethodologiesState = {
  methodologies: [],
  isLoading: false,
  error: null,
};

export const useMethodologiesStore = create<MethodologiesStore>((set) => ({
  ...defaultInitState,
  actions: {
    fetchMethodologies: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data,
          error,
        }: { data: Methodology[] | null; error: ResponseError } =
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
  },
}));
