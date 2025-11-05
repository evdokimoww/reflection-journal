import { TagsStore } from "@/shared/stores/tags/types";

export const tagsActionsSelector = (state: TagsStore) => state.actions;

export const searchedTagsSelector = (state: TagsStore) => state.searchedTags;

export const isTagsLoadingSelector = (state: TagsStore) => state.isTagsLoading;

export const tagsErrorSelector = (state: TagsStore) => state.error;
