import axios, { type InternalAxiosRequestConfig } from "axios";
import { api, refreshApi } from "./client";
import { ApiError } from "@/utils/errors/ApiError";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const refreshAccessToken = async () => {
  await refreshApi.post("/v1/auth/refresh-access");
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const config = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true;

      try {
        await refreshAccessToken();

        return api(config);
      } catch (error) {}
    }

    const response = error.response;

    return Promise.reject(
      new ApiError(
        response?.data?.message ?? "Something went wrong",
        response?.status,
        response?.data?.code,
        response?.data,
      ),
    );
  },
);
