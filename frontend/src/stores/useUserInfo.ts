import { create } from "zustand";
import api from "../auth/api.ts";

interface UserInfoProps {
  isUserLogin: boolean;
  setUserLogin: () => void;
  checkUserLogin: () => void;
}

const useUserInfo = create<UserInfoProps>(set => ({
  isUserLogin: false,
  setUserLogin() {
    set({isUserLogin: true})
  },
  checkUserLogin() {
    const at = sessionStorage.getItem("accessToken");
    if (at) {
      set({isUserLogin: true})
    } else {
      set({isUserLogin: false})
    }
  },
}));

export { useUserInfo };
