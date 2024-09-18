/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignHash, encodeFormData } from '@/helpers/hash';
import axios from 'axios';
import { getSession } from 'next-auth/react';
// import { getSession } from 'next-auth/react';
const apiHasSignAccessToken = [''];

export const isClient = () => typeof window !== 'undefined';
const http = axios.create({
  baseURL: 'http://localhost:8017/v1',
  timeout: 1000 * 60 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.request.use(
  async (config) => {
    if (isClient()) {
      const session = await getSession();
      const token = session?.accessToken as string;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export const ApiClient = {
  post: async (url: string, data = {}, conf = {}) => {
    const formData = encodeFormData(url, data);

    return http.post(url, formData, conf);
  },
  get: async (url: string, data: any = {}, conf: any = {}) => {
    const accessToken = '';
    if (data.data) {
      if (apiHasSignAccessToken.includes(url)) {
        conf.sign = createSignHash(url, data.data, accessToken);
      } else {
        conf.sign = createSignHash(url, data.data);
      }
    }

    return http.get(url, {
      params: encodeFormData(url, data),
      ...conf,
    });
  },
};

export default http;
