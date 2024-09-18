import { listApi } from '@/constants/list-api';
import http from '@/lib/http';
import { FormLogin } from '@/types/user';

export const authApi = {
  login: async (formValues: FormLogin) => {
    return http.post(listApi.Login, formValues);
  },
  logout: () => {
    return Promise.resolve();
  },
  refreshToken: async (refreshToken: string) => {
    return http.put(listApi.RefreshToken, { refreshToken });
  },
};
