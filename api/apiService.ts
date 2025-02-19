import { useUserStore } from "@/store/user-store";
import request from "./request";
import queryString from "query-string";

const apiService = {
  get: async (url: string, params?: object) => {
    const { token } = useUserStore.getState().userInfo;

    return request({
      url,
      method: "GET",
      params: {
        ...params,
        token,
      },
    });
  },
  post: async (url: string, data: object) => {
    const { token } = useUserStore.getState().userInfo;

    return request({
      url,
      method: "POST",
      data: queryString.stringify({
        ...data,
        token,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
};

export default apiService;
