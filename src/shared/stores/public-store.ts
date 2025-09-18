import { createStore } from "zustand/vanilla";
import { signOutRequest } from "@/shared/api/auth";

export type PublicState = {
  isLoading: boolean;
  error: Error | null;
};

export type PublicActions = {
  fetchSignOut: () => Promise<void>;
};

export type PublicStore = PublicState & PublicActions;

export const initPublicStore = (): PublicState => {
  return { isLoading: false, error: null };
};

export const defaultInitState: PublicState = {
  isLoading: false,
  error: null,
};

export const createPublicStore = (
  initState: PublicState = defaultInitState,
) => {
  return createStore<PublicStore>()((set) => ({
    ...initState,
    fetchSignOut: async () => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await signOutRequest();

        if (error) throw error;
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
  }));
};
