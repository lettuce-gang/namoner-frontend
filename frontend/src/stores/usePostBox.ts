import { create } from "zustand";
import api from "../auth/api.ts";
import visitorApi from "../auth/visitorApi.ts";

interface PostBoxProps {
  postboxName: string;
  letterCount: number;
  getPostBoxInfo: (userId: string) => void;
}

const usePostBox = create<PostBoxProps>(set => ({
  postboxName: "",
  letterCount: 0,
  getPostBoxInfo: async userId => {
    await visitorApi
      .get(`/users/postbox/${userId}`)
      .then(res => {
        const { postboxName } = res.data.data;
        set({ postboxName });
      })
      .catch(err => console.log(err));
  },
}));

export { usePostBox };
