import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/auth';
import { StatusCodes } from 'http-status-codes';

// export const config = {
//   matcher: '/',
// };

const publicPaths = new Set([
  '/',
  '/api/user/register',
  '/api/user/login',
  '/api/user/logout',
  '/api/courses/all',
]);

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isPublicPath = publicPaths.has(path);
  const requestHeaders = new Headers(req.headers);
  if (!isPublicPath && path.startsWith('/api')) {
    const payload = await verifyJWT(req).catch((err) => {
      console.error(err);
    });
    // console.log(payload);
    if (!payload) {
      if (path.startsWith('/api')) {
        return NextResponse.json(
          { msg: 'Unauthorized' },
          { status: StatusCodes.UNAUTHORIZED }
        );
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
    requestHeaders.set('user', payload.userId);
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export default middleware;
