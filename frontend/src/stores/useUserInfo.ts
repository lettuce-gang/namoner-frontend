import { create } from "zustand";
import api from "../auth/api.ts";

interface UserInfoProps {
  isUserLogin: boolean;
  userId: string;
  setUserLogin: () => void;
  checkUserLogin: () => void;
  setUserId: (id: string) => void;
  logout: () => void;
  withdraw: (reason?: string) => Promise<boolean>;
}

const useUserInfo = create<UserInfoProps>(set => ({
  isUserLogin: false,
  userId: "",
  setUserLogin() {
    set({ isUserLogin: true });
  },
  checkUserLogin() {
    const at = sessionStorage.getItem("accessToken");
    if (at) {
      set({ isUserLogin: true });
    } else {
      set({ isUserLogin: false });
    }
  },
  setUserId(id) {
    set({ userId: id });
  },
  logout() {
    set({ isUserLogin: false, userId: "" });
    sessionStorage.clear();
    localStorage.clear();
  },
  withdraw: async (reason?: string) => {
    try {
      await api.delete(`/users${reason ? `?reason=${reason}` : ''}`);
      set({ isUserLogin: false, userId: "" });
      sessionStorage.clear();
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      return false;
    }
  },
}));

export { useUserInfo };
