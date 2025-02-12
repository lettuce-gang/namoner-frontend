import { create } from "zustand";
import api from "../auth/api.ts";

interface PostBoxProps {
  isOwner: boolean;
  existPostBox: boolean;
  postboxName: string;
  unreadLetterCount: number;
  getPostBoxInfo: (userId: string) => void;
}

const usePostBox = create<PostBoxProps>(set => ({
  isOwner: false,
  existPostBox: false,
  postboxName: "",
  unreadLetterCount: 0,
  getPostBoxInfo: async userId => {
    await api
      .get(`/users/postbox/${userId}`)
      .then(res => {
        const { isOwner, existPostBox, postboxName, unreadLetterCount } = res.data.data;
        set({ postboxName, isOwner, existPostBox, unreadLetterCount });
      })
      .catch(err => console.log(err));
  },
}));

export { usePostBox };
