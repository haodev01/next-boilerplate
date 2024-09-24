import http from '@/lib/http';

export const blogApi = {
  getList: async () => {
    const response = await http.get(http.api.getAllPost);

    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await http.get(`${http.api.getAllPost}/${slug}`);

    return response.data;
  },
};
