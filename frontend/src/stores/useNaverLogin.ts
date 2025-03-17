import axios, { AxiosError } from "axios";
import { create, useStore } from "zustand";
import api from "../auth/api.ts";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI; // Callback URL
const STATE = "false";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

interface NaverLoginProps {
  isLoading: boolean;
  error: AxiosError | null;
  startLogin: (fromUserId?: string) => void;
  sendAuthCode: (authCode: string, state: string, navigate: (path: string) => void, userId: string) => void;
  userId: string;
  postBoxName: string;
  fromUserId: string;
  setPostBoxName: (postBoxName: string) => void;
}

const useNaverLogin = create<NaverLoginProps>(set => {
  return {
    isLoading: false,
    error: null,
    userId: "",
    postBoxName: "",
    fromUserId: "",
    startLogin(fui?: string) {
      if (fui) {
        set({ fromUserId: fui });
      }
      window.location.href = NAVER_AUTH_URL;
    },
    sendAuthCode: async (authCode, state, navigate, fromUserId) => {
      set({ isLoading: true });
      axios
        .post(process.env.REACT_APP_BASE_URL + `/auth/naver`, {
          code: authCode,
          state: state.toString(),
        })
        .then(res => {
          console.log(res);
          const { isFirstVisit, userId, token, postBoxName } = res.data.data;
          const { accessToken, accessTokenExpiredTime, refreshToken } = token;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("atExpiredTime", accessTokenExpiredTime);
          localStorage.setItem("refreshToken", refreshToken);
          set({ userId, postBoxName });

          if (isFirstVisit) {
            navigate("/makePostBox");
          } else {
            if (fromUserId) {
              navigate(`/postbox/${fromUserId}`);
            } else {
              navigate(`/postbox/${userId}`);
            }
          }
        })
        .catch(error => set({ error }))
        .finally(() => set({ isLoading: false }));
    },
    setPostBoxName: async (postBoxName: string) => {
      set({ isLoading: true });
      await api
        .patch(`/users/postbox?name=${postBoxName}`)
        .then(res => {
          set({ postBoxName: postBoxName });
        })
        .catch(err => alert("오류 발생! 잠시 후 시도해주세요🥲"))
        .finally(() => set({ isLoading: false }));
    },
  };
});

export { useNaverLogin };
