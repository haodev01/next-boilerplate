/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

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
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: {
      id?: string;
      email?: string;
    };
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
