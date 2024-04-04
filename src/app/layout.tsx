import '@/styles/globals.css';

import { Providers } from '@/Providers';
import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>
            {children}
            <ModalProvider />
            <Toaster />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
