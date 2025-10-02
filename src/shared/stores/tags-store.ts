import { createStore } from "zustand/vanilla";
import { ITag } from "@/shared/types/entry.types";
import { getTagsRequest } from "@/shared/api/tags";

export type TagsState = {
  isTagsLoading: boolean;
  error: Error | null;
  searchedTags: ITag[];
};

export type TagsActions = {
  fetchSearchedTags: (searchString: string) => Promise<void>;
};

export type TagsStore = TagsState & TagsActions;

export const initTagsStore = (): TagsState => {
  return { searchedTags: [], isTagsLoading: false, error: null };
};

export const defaultInitState: TagsState = {
  searchedTags: [],
  isTagsLoading: false,
  error: null,
};

export const createTagsStore = (initState: TagsState = defaultInitState) => {
  return createStore<TagsStore>()((set) => ({
    ...initState,
    fetchSearchedTags: async (searchString: string) => {
      try {
        set({ isTagsLoading: true, error: null });

        if (!searchString) {
          set({ searchedTags: [] });
          return;
        }

        const {
          data,
          error,
        }: {
          data: ITag[] | null;
          error: Error | null;
        } = await getTagsRequest(searchString);

        if (error) throw error;

        if (data) {
          set({ searchedTags: data });
        }
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isTagsLoading: false });
      }
    },
  }));
};
