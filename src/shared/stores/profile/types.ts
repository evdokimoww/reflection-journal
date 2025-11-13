import { ResponseError, UserInfo } from "@/shared/types";

export interface ProfileState {
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: ResponseError;
}

export interface ProfileActions {
  fetchUserInfo: () => Promise<void>;
  updateUserInfo: (
    data: UserInfo,
    showSuccessMessage: (message: string) => void,
  ) => Promise<void>;
}

export interface ProfileStore extends ProfileState {
  actions: ProfileActions;
}
