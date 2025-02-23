import { create } from "zustand";
import api from "../auth/api.ts";

interface UserInfoProps {
  isUserLogin: boolean;
  userId: string;
  setUserLogin: () => void;
  checkUserLogin: () => void;
  setUserId: (id: string) =>void;
}

const useUserInfo = create<UserInfoProps>(set => ({
  isUserLogin: false,
  userId: "",
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
  setUserId(id) {
    set({userId: id})
  },
}));

export { useUserInfo };
