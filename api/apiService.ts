import { useUserStore } from "~/store/user-store";
import request from "./request";
import qs from "qs";

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
      data: qs.stringify({
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
