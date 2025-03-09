import { create } from "zustand";
import api from "../auth/api.ts";

interface UserActionProps {
  moveMyPostbox: (navigator: (path: string) => void) => void;
}

const useUserAction = create<UserActionProps>(set => ({
  async moveMyPostbox(navigator) {
    await api
      .get("/users")
      .then(res => {
        navigator(`/postbox/${res.data.data.userId}`);
      })
      .catch(err => console.log(err));
  },
}));

export { useUserAction };
