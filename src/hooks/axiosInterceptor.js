import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.oyaanow.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});
