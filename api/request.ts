import { useUserStore } from "~/store/user-store";
import axios from "axios";
import { Alert } from "react-native";

const instance = axios.create({
  baseURL: "https://uat-console.filix.hk/",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);

    const { clearUserInfo } = useUserStore();

    if (error.message) {
      const message = error.response?.data || "Unknown Error";

      // Handle 401 unauthorized
      if (error.response?.status === 401) {
        // Clear the user's session
        clearUserInfo();
      }

      Alert.alert("Error", message);
    } else {
      Alert.alert("Network Error", "Maybe, idk yet");
    }

    return Promise.reject(error);
  }
);

export default instance;
