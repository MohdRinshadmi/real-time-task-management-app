import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    console.log('response from API KIT', response);
    
    if (response.status === 200 || response.status) {
      return response.data;
    }
  },
  (error) => {
    let shown = false;
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
      shown = true;
    } else if (error.response && error.response.status === 401) {
      toast.error("Unauthorized access. Please login again.");
      shown = true;
    }
    // console.log("error response from api", error);
    return Promise.reject(error.response.data);
  }
);

instance.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    const token = localStorage.getItem("access-token") || "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Optionally keep the custom header if needed
    // config.headers["access-token"] = token;
    return config;
})

const API = instance;

export default API;