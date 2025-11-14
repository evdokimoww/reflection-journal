import { create } from "zustand";
import { ProfileState, ProfileStore } from "@/shared/stores/profile/types.ts";
import {
  getUserInfoRequest,
  updateUserInfoRequest,
} from "@/shared/api/profile.ts";
import { ResponseType, UserInfo } from "@/shared/types";

export const defaultInitState: ProfileState = {
  userInfo: null,
  isLoading: true,
  error: null,
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...defaultInitState,
  actions: {
    fetchUserInfo: async () => {
      try {
        set({ error: null });

        const { data, error }: ResponseType<UserInfo> =
          await getUserInfoRequest();

        set({
          userInfo: {
            email: data?.email || "",
            name: data?.name || "",
          },
        });

        if (error) throw error;
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    updateUserInfo: async (formData: UserInfo, showSuccessMessage) => {
      try {
        set({ isLoading: true, error: null });

        const { error }: ResponseType<boolean> =
          await updateUserInfoRequest(formData);

        if (error) throw error;

        showSuccessMessage("Данные о пользователе успешно обновлены");

        get().actions.fetchUserInfo();
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
  },
}));
