import { env } from "@/config/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10_000,
});

const refreshApi = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10_000,
});

export { api, refreshApi };
