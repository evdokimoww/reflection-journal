import { ResponseError, TagItem } from "@/shared/types";

export interface TagsState {
  isTagsLoading: boolean;
  error: ResponseError;
  searchedTags: TagItem[];
}

export interface TagsActions {
  fetchSearchedTags: (searchString: string) => Promise<void>;
}

export interface TagsStore extends TagsState {
  actions: TagsActions;
}
