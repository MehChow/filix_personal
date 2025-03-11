import { useUserStore } from "~/store/user-store";
import axios, { AxiosResponse } from "axios";
import { ToastAndroid } from "react-native";

import translate from "~/services/localization/i18n";

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
    ToastAndroid.show(
      translate.t("alerts.session_expired"),
      ToastAndroid.SHORT
    );
  },
  // Input data is missing or corrupted, should not happen
  // since frontend should validate the data already
  MISSING: () => {
    ToastAndroid.show(translate.t("alerts.data_corrupted"), ToastAndroid.SHORT);
  },
  INVALID_CREDENTIALS: () => {
    ToastAndroid.show(translate.t("alerts.invalid_cred"), ToastAndroid.SHORT);
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
      ToastAndroid.show(translate.t("alerts.network_err"), ToastAndroid.SHORT);
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
