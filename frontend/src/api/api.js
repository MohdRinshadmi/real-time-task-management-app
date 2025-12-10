import axios from "axios";
import toast from "react-toastify";
import BASE_URL from "../config/config";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
  },
  (error) => {
    console.log("error response from api", error);
    toast.error("An error occurred while processing your request.");
    return Promise.reject(error);  
  }
);

instance.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers["access-token"] = localStorage.getItem("access-token") || "";
    return config;
})

const API = instance;

export default API;