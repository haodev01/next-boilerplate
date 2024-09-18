import { auth } from '@/auth';
import { NextRequest } from 'next/server';

const publicRoutes = ['/signin', '/signup'];
export default auth((req: NextRequest & { auth?: unknown }) => {
  if (req?.auth && publicRoutes.includes(req?.nextUrl?.pathname)) {
    return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
  }
  if (!req?.auth && req?.nextUrl?.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
