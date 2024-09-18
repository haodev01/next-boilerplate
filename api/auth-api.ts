import { listApi } from '@/constants/listApi';
import { ApiClient } from '@/lib';
import http from '@/lib/http';

type FormLogin = {
  email: string;
  password: string;
};
export const authApi = {
  login: async (formData: FormLogin) => {
    return http.post(listApi.Login, formData);
  },
  logout: () => {
    return Promise.resolve();
  },
  refreshToken: async (refreshToken: string) => {
    return http.put(listApi.RefreshToken, { refreshToken });
  },
  profile: async () => {
    return ApiClient.get(listApi.GameAccountInfo);
  },
};
