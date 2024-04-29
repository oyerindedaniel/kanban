import { env } from '@/env';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest, resHeaders: Headers) => {
  console.log('cookies---------------', cookies().get('access_refresh_token')?.value);
  console.log('header', req.headers.get('cookie'));
  // console.log('header---', req.headers.get('cookie'));
  console.log('header---', req.headers);
  // resHeaders.set(
  //   'set-cookie',
  //   cookie.serialize('secret', 'davies', {
  //     httpOnly: true,
  //     secure: Boolean(Number(process.env.COOKIE_SECURE ?? 0)),
  //     sameSite: 'lax'
  //   })
  // );
  return createTRPCContext({
    headers: req.headers,
    cookies,
    resHeaders
  });
};

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ resHeaders }) => createContext(req, resHeaders),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined
  });
};

export { handler as GET, handler as POST };
