import axios, { AxiosError } from "axios";
import { create } from "zustand";

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
const REDIRECT_URI = "http://localhost:3000/oauth/naver"; // Callback URL
const STATE = "false";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

interface NaverLoginProps {
  isLoading: boolean;
  error: AxiosError | null;
  startLogin: () => void;
  sendAuthCode: (authCode: string) => void;
}

const useNaverLogin = create<NaverLoginProps>(set => ({
  isLoading: false,
  error: null,
  startLogin() {
    window.location.href = NAVER_AUTH_URL;
  },
  sendAuthCode: async authCode => {
    set({ isLoading: true });
    axios
      .post(process.env.REACT_APP_BASE_URL + `/login/naver/${authCode}`)
      .then(res => console.log(res))
      .catch(error => set({ error }))
      .finally(() => set({ isLoading: false }));
  },
}));

export { useNaverLogin };
