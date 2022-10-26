import axios from "axios";

export const API = axios.create({
  baseURL: "https://oyanow-api.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});
