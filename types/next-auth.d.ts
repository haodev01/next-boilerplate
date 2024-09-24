/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id?: string;
      email?: string;
    };
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
