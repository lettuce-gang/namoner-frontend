import axios from "axios";
import { useStore } from "zustand";
import { useUserInfo } from "../stores/useUserInfo.ts";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// 사용자 정의 훅으로 변경
const useRefreshAccessToken = () => {
  const { logout } = useStore(useUserInfo);

  const refreshAccessToken = async () => {
    try {
      const _refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reissue`, {
        refreshToken: _refreshToken,
      });

      const { accessToken, refreshToken, accessTokenExpiredTime } = response.data.token;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("atExpiredTime", accessTokenExpiredTime);
      localStorage.setItem("refreshToken", refreshToken);

      return accessToken;
    } catch (error) {
      // 리프레시 토큰도 만료된 경우
      logout();
      alert("로그인 토큰이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/signup"; // 로그인 페이지로 리다이렉트
      return null;
    }
  };

  return refreshAccessToken;
};

// Request Interceptor
api.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 500) && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정
      const refreshAccessToken = useRefreshAccessToken(); // 훅 호출
      const newToken = await refreshAccessToken(); // 리프레쉬 토큰으로 엑세스 토큰 재발급
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // 새로운 토큰으로 헤더 업데이트
        return api(originalRequest); // 원래 요청 재시도
      }
    }
    return Promise.reject(error);
  },
);

export default api;
