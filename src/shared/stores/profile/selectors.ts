import { ProfileStore } from "@/shared/stores/profile/types.ts";

export const profileActionsSelector = (state: ProfileStore) => state.actions;

export const errorSelector = (state: ProfileStore) => state.error;

export const isLoadingSelector = (state: ProfileStore) => state.isLoading;

export const userEmailSelector = (state: ProfileStore) =>
  state.userInfo?.email || "...";

export const usernameSelector = (state: ProfileStore) =>
  state.userInfo?.name || state.userInfo?.email.split("@")[0] || "...";

export const profileFormInitValuesSelector = (state: ProfileStore) =>
  state.userInfo;
