import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const accessToken = sessionStorage.getItem("accessToken");

// 기본 Authorization 헤더 설정
api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export default api;
