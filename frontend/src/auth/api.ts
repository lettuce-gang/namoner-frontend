import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


const isTokenExpired = () => {
  const expiredTime = sessionStorage.getItem("atExpiredTime");
  if (!expiredTime) return true;
  
  return new Date().getTime() > new Date(expiredTime).getTime();
};

// 토큰 리프레시 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
      refreshToken
    });
    
    const { accessToken, accessTokenExpiredTime } = response.data.data.token;
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("atExpiredTime", accessTokenExpiredTime);
    
    return accessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우
    sessionStorage.clear();
    localStorage.clear();
    alert("로그인 토큰이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = "/signup"; // 로그인 페이지로 리다이렉트
    return null;
  }
};

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    if (isTokenExpired()) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } else {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
