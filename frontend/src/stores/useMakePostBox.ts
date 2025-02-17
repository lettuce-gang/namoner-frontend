import { create } from "zustand";
import axios, { AxiosError } from "axios";
import api from "../auth/api.ts";

interface MakePostBoxProp {
  isLoading: boolean;
  error: AxiosError | null;
  makePostBox: (postBoxName: string, isPhoneConnected: boolean, navigate: (path: string) => void) => void;
}

const useMakePostBox = create<MakePostBoxProp>(set => ({
  isLoading: false,
  error: null,
  makePostBox: async (postBoxName, isPhoneConnected, navigate) => {
    set({ isLoading: true });
    await api
      .post(process.env.REACT_APP_BASE_URL + `/users/join`, {
        postBoxName: postBoxName,
        isPhoneConnected: isPhoneConnected,
      })
      .then(res => {
        const { userId } = res.data.data;
        navigate(`/postbox/${userId}`);
      })
      .catch(err => console.log(err))
      .finally(() => set({ isLoading: false }));
  },
}));

export { useMakePostBox };
