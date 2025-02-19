import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  user_name: string;
  user_id: number;
  nickname: string;
  birthday: number;
  token: string;
  sex: number;
}

interface UserState {
  isLogin: boolean;
  userInfo: UserInfo;
  setUserInfo: (data: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLogin: false,
      userInfo: {
        user_name: "",
        user_id: 0,
        nickname: "",
        birthday: 0,
        token: "",
        sex: 0,
      },
      setUserInfo: (data) => set({ userInfo: data, isLogin: true }),
      clearUserInfo: () => set({ userInfo: {} as UserInfo, isLogin: false }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
