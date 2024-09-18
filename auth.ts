import { authApi } from '@/api';
import { jwtDecode } from 'jwt-decode';
import NextAuth, { NextAuthConfig } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
type User = {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await authApi.login({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });
        const { data } = response;
        const user: User = {
          id: data?.id,
          email: data?.email,
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        };

        if (!user) {
          throw new Error('User not found.');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const tokenVerify = jwtDecode(user?.accessToken);
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = tokenVerify.exp as number;
        token.user = {
          id: user.id,
          email: user.email as string,
        };

        return token;
      }
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }

      const response = await authApi.refreshToken(token.refreshToken as string);
      const { data } = response;
      token.accessToken = data?.accessToken;
      token.refreshToken = data?.refreshToken;
      const tokenVerify = jwtDecode(data?.accessToken as string);
      token.accessTokenExpires = tokenVerify?.exp as number;

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = token.user as AdapterUser;

      return session;
    },
  },
} satisfies NextAuthConfig);
