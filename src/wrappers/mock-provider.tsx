'use client';

import { onUnhandledRequest } from '@/mocks/msw.utils';
import { useEffect, useState } from 'react';

export async function MockProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mockingEnabled, enableMocking] = useState(false);

  useEffect(() => {
    async function enableApiMocking() {
      // if (process.env.NODE_ENV !== 'development') {
      //   return;
      // }

      /**
       * @fixme Next puts this import to the top of
       * this module and runs it during the build
       * in Node.js. This makes "msw/browser" import to fail.
       */

      enableMocking(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    enableApiMocking();
  }, []);

  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
