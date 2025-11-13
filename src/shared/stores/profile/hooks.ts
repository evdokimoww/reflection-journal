import { ProfileStore } from "@/shared/stores/profile/types.ts";
import { useProfileStore } from "@/shared/stores/profile/profile-store.ts";
import {
  errorSelector,
  isLoadingSelector,
  profileActionsSelector,
  profileFormInitValuesSelector,
  userEmailSelector,
  usernameSelector,
} from "@/shared/stores/profile/selectors.ts";

export const useProfileActions = (): ProfileStore["actions"] =>
  useProfileStore(profileActionsSelector);

export const useProfileError = (): ProfileStore["error"] =>
  useProfileStore(errorSelector);

export const useIsProfileLoading = (): ProfileStore["isLoading"] =>
  useProfileStore(isLoadingSelector);

export const useUserEmail = (): string => useProfileStore(userEmailSelector);

export const useUsername = (): string => useProfileStore(usernameSelector);

export const useProfileFormInitValues = (): ProfileStore["userInfo"] =>
  useProfileStore(profileFormInitValuesSelector);
