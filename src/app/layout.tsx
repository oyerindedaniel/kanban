import '@/styles/globals.css';

import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster as ToasterSonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { onUnhandledRequest } from '@/mocks/msw.utils';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Providers } from '../providers';

import { TRPCReactProvider } from '@/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata = {
  title: '',
  description: '',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const { worker } = await import('../mocks/browser');

    // await worker.start();
    // await worker.start({ onUnhandledRequest });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>
            {children}
            <ToasterSonner />
            <Toaster />
            <ModalProvider />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
