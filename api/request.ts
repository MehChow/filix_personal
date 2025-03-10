import { useUserStore } from "~/store/user-store";
import axios, { AxiosResponse } from "axios";

interface ApiResponse<T = unknown> {
  ret: number;
  code: string;
  data?: T;
  msg: string;
}

const instance = axios.create({
  // read from env file
  baseURL: process.env.EXPO_PUBLIC_BASEURL,
  timeout: 10000,
});

const ERROR_HANDLERS: Record<string, () => void> = {
  // Session expired
  INVALID_TOKEN: () => {
    const clearUserInfo = useUserStore.getState().clearUserInfo;
    clearUserInfo();
    alert("Session expired. Please log in again.");
  },
  // Input data is missing or corrupted, should not happen
  // since frontend should validate the data already
  MISSING: () => {
    alert("Input data is missing or corrupted.");
  },
};

instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Success response
    if (response.data.ret === 0) {
      return response;
    }

    // Error response, not catched by catch block due to backend api design pattern
    const errorCode = response.data.code;
    const errorHandler = ERROR_HANDLERS[errorCode];

    if (errorHandler) {
      errorHandler();
    } else {
      console.warn(`Unhandled error code: ${errorCode}`);
    }
    return Promise.reject(errorCode);
  },
  (error) => {
    // Network error
    if (error.response) {
      console.error("API Error:", error.response);
    } else {
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
