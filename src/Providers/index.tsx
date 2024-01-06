'use client';

import { ThemeProvider } from './theme-provider';
import { ReduxProviders } from '@/store/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProviders>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </ReduxProviders>
  );
}
