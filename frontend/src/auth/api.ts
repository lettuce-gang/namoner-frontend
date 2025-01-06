import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


// 기본 Authorization 헤더 설정
api.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("accessToken")}`;

export default api;
