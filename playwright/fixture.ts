/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { test as base } from '@playwright/test';
import { createServer, type Server } from 'http';
import { http } from 'msw';
import type { SetupServerApi } from 'msw/node';
import { setupServer } from 'msw/node';
import { type AddressInfo } from 'net';
import next from 'next';
import path, { dirname } from 'path';
import { fileURLToPath, parse } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const test = base.extend<{ port: string; requestInterceptor: SetupServerApi; http: typeof http }>({
  // @ts-ignore
  port: [
    async ({}, use) => {
      const app = next({ dev: true, dir: path.resolve(__dirname, '..') });
      await app.prepare();

      const handleNextRequests = app.getRequestHandler();

      const server: Server = await new Promise((resolve) => {
        const server = createServer((req, res) => {
          // @ts-ignore
          const parsedUrl = parse(req.url, true);
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleNextRequests(req, res, parsedUrl);
        });
        // @ts-ignore
        server.listen((error) => {
          if (error) throw error;
          resolve(server);
        });
      });
      const port = String((server.address() as AddressInfo).port);
      await use(port);
    },
    {
      scope: 'worker',
      auto: true
    }
  ],
  // @ts-ignore
  requestInterceptor: [
    async ({}, use) => {
      await use(
        (() => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const requestInterceptor = setupServer();

          requestInterceptor.listen({
            onUnhandledRequest: 'bypass'
          });

          return requestInterceptor;
        })()
      );
    },
    {
      scope: 'worker'
    }
  ],
  http
});

export default test;
