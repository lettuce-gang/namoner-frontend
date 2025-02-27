import { create } from "zustand";

interface UserInfoProps {
  isUserLogin: boolean;
  userId: string;
  setUserLogin: () => void;
  checkUserLogin: () => void;
  setUserId: (id: string) => void;
  logout: () => void;
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
}));

export { useUserInfo };
