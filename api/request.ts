import { useUserStore } from "~/store/user-store";
import axios from "axios";

const instance = axios.create({
  // baseURL: "https://uat-console.filix.hk/",
  baseURL: "http://192.168.50.192:80/",
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // API reached the server, but there are some errors about the response
    if (error.response) {
      // e.g. Unauthorized
      if (error.response.status === 401) {
        const { clearUserInfo } = useUserStore();

        clearUserInfo();
        alert("Session expired. Please log in again.");
      } else {
        // Log other errors for debugging
        console.error("API Error:", error.response);
      }
    }
    // API did not reach the server
    else {
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
