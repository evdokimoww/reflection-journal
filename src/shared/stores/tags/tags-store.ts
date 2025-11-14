import { getTagsRequest } from "@/shared/api/tags";
import { TagsState, TagsStore } from "@/shared/stores/tags/types";
import { create } from "zustand";
import { ResponseType, TagItem } from "@/shared/types";

export const defaultInitState: TagsState = {
  searchedTags: [],
  isTagsLoading: false,
  error: null,
};

export const useTagsStore = create<TagsStore>((set) => ({
  ...defaultInitState,
  actions: {
    fetchSearchedTags: async (searchString: string) => {
      try {
        set({ isTagsLoading: true, error: null });

        if (!searchString) {
          set({ searchedTags: [] });
          return;
        }

        const { data, error }: ResponseType<TagItem[]> =
          await getTagsRequest(searchString);

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
  },
}));
