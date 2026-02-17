import axios from "axios";

const api = axios.create({
  baseURL: "https://bankapp-dcft.onrender.com/api",
  withCredentials: true,
});

export default api;
