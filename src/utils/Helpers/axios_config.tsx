import axios from "axios";
import { AUTH_TOKEN, BaseUrl } from "../Constants/ApiConstants/api_constants";

export const appAxiosInstance = axios.create({
  baseURL: BaseUrl,
});

appAxiosInstance.defaults.withCredentials = true;

export const appAxiosAuthInstance = axios.create({
  baseURL: BaseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Alter defaults after instance has been created
//appAxiosAuthInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
