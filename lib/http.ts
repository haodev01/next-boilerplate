/* eslint-disable @typescript-eslint/no-explicit-any */
import { listApi } from '@/configs';
import axios from 'axios';

export const isClient = () => typeof window !== 'undefined';
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

request.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

const http = {
  post: async (url: string, data = {}, conf = {}) => {
    return request.post(url, data, conf);
  },
  get: async (url: string, params = {}, conf = {}) => {
    return request.get(url, {
      params,
      ...conf,
    });
  },
  put: async () => {},
  delete: () => {},
  api: listApi,
};

export default http;
