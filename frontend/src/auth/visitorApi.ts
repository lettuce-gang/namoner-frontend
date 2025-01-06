import axios from 'axios';

const visitorApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default visitorApi;
