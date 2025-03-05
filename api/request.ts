import { useUserStore } from "~/store/user-store";
import axios from "axios";

const instance = axios.create({
  // baseURL: "https://uat-console.filix.hk/",
  baseURL: "http://192.168.50.192:80/",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const { clearUserInfo } = useUserStore();

        // Handle unauthorized access
        clearUserInfo();
        alert("Session expired. Please log in again.");
      } else {
        // Log other errors for debugging
        console.error("API Error:", error.response);
      }
    } else {
      // Handle network or other errors
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
