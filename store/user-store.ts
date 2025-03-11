import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "~/types/user-info";

interface UserState {
  isAuthenticated: boolean;
  isPersistedLogin: boolean;
  userInfo: UserInfo;
  setIsPersistedLogin: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setUserInfo: (data: UserInfo) => void;
  clearUserInfo: () => void;
}

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
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUserInfo: (data) =>
        set({ userInfo: data, isAuthenticated: true, isPersistedLogin: true }),
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
