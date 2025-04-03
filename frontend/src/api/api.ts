import axios, { AxiosInstance } from "axios";

export let BASE_URL: string = "";

export let BASE_URL_REST_API: string = "";

let IS_PROD: boolean = true;

if (IS_PROD) {
  BASE_URL = "/graphql";
  BASE_URL_REST_API = "/";
} else {
  BASE_URL = "http://localhost:5001/graphql";
  BASE_URL_REST_API = "http://localhost:5001/";
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivateRestApi: AxiosInstance = axios.create({
  baseURL: BASE_URL_REST_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
