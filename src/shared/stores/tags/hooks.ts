import { TagsStore } from "@/shared/stores/tags/types";
import { useTagsStore } from "@/shared/stores/tags/tags-store";
import {
  isTagsLoadingSelector,
  searchedTagsSelector,
  tagsActionsSelector,
  tagsErrorSelector,
} from "@/shared/stores/tags/selectors";

export const useTagsActions = (): TagsStore["actions"] =>
  useTagsStore(tagsActionsSelector);

export const useTagsError = (): TagsStore["error"] =>
  useTagsStore(tagsErrorSelector);

export const useIsTagsLoading = (): TagsStore["isTagsLoading"] =>
  useTagsStore(isTagsLoadingSelector);

export const useSearchedTags = (): TagsStore["searchedTags"] =>
  useTagsStore(searchedTagsSelector);
