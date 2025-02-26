import axios, { AxiosError } from "axios";
import { create, useStore } from "zustand";



const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
const REDIRECT_URI = "http://dev.namoner.site/oauth/naver"; // Callback URL
const STATE = "false";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

interface NaverLoginProps {
  isLoading: boolean;
  error: AxiosError | null;
  startLogin: () => void;
  sendAuthCode: (authCode: string, state: string, navigate: (path: string) => void, loginSetter: () => void) => void;
  userId: string;
  postBoxName: string;
}

const useNaverLogin = create<NaverLoginProps>(set => {

  return {
    isLoading: false,
    error: null,
    userId: "",
    postBoxName: "",
    startLogin() {
      window.location.href = NAVER_AUTH_URL;
    },
    sendAuthCode: async (authCode, state, navigate, loginSetter) => {
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
          set({userId, postBoxName})

          if (isFirstVisit) {
            navigate("/makePostBox");
          } else {
            navigate(`/postbox/${userId}`);
          }
        })
        .catch(error => set({ error }))
        .finally(() => set({ isLoading: false }));
    },
  };
});

export { useNaverLogin };
