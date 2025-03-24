import { create } from "zustand";
import api from "../auth/api.ts";
import visitorApi from "../auth/visitorApi.ts";

interface PostBoxProps {
  isOwner: boolean;
  existPostBox: boolean;
  postboxName: string;
  unreadLetterCount: number;
  getPostBoxInfo: (userId: string) => void;
  setPostboxName: (name: string) => void;
}

const usePostBox = create<PostBoxProps>(set => ({
  isOwner: false,
  existPostBox: false,
  postboxName: "",
  unreadLetterCount: 0,
  getPostBoxInfo: async userId => {
    const at = sessionStorage.getItem("accessToken");
    if(at) {
      await api
      .get(`/users/postbox/${userId}`)
      .then(res => {
        const { isOwner, existPostBox, postboxName, unreadLetterCount } = res.data.data;
        set({ postboxName, isOwner, existPostBox, unreadLetterCount });
      })
      .catch(err => console.log(err));
    } else {
      await visitorApi
      .get(`/users/postbox/${userId}`)
      .then(res => {
        const { isOwner, existPostBox, postboxName, unreadLetterCount } = res.data.data;
        set({ postboxName, isOwner, existPostBox, unreadLetterCount });
      })
      .catch(err => console.log(err));
    }
    
  },
  setPostboxName: (name: string) => set({ postboxName: name }),
}));

export { usePostBox };
