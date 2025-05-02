import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "~/types/user-info";

interface UserState {
  isAuthenticated: boolean;
  isPersistedLogin: boolean;
  userInfo: UserInfo;
  setIsPersistedLogin: (value: boolean) => void;
  setUserInfo: (data: UserInfo) => void;
  clearUserInfo: () => void;
}

/**
 * A Zustand store that stores the user info and login status
 *
 * @description
 * userInfo is set when user login successfully. Token is included, where it is used for authentication for subsequent API requests.
 * isAuthenticated is set when user login successfully.
 * isPersistedLogin is set when user login successfully, and they have checked the keep sign in checkbox.
 */
export const useUserStore = create<UserState>()(
  // persist only user info and isPersistedLogin
  persist(
    (set) => ({
      isAuthenticated: false,
      isPersistedLogin: false,
      userInfo: {
        user_name: "",
        user_id: 0,
        nickname: "",
        birthday: 0,
        token: "",
        sex: 0,
      },
      setIsPersistedLogin: (value) => set({ isPersistedLogin: value }),
      setUserInfo: (data) => set({ userInfo: data, isAuthenticated: true }),
      clearUserInfo: () =>
        set({
          userInfo: {} as UserInfo,
          isAuthenticated: false,
          isPersistedLogin: false,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPersistedLogin: state.isPersistedLogin,
        userInfo: state.userInfo,
      }),
    }
  )
);
