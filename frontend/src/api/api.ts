import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response from API KIT', response);

    if (response.status === 200 || response.status) {
      return response.data;
    }
  },
  (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      toast.error("Unauthorized access. Please login again.");
    }
    // console.log("error response from api", error);
    return Promise.reject(error.response ? error.response.data : error);
  }
);

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Content-Type', 'application/json');
  config.headers.set('Accept', 'application/json');
  const token = localStorage.getItem("access-token") || "";
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  // Optionally keep the custom header if needed
  // config.headers["access-token"] = token;
  return config;
})

const API = instance;

export default API;