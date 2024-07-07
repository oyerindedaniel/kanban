'use client';

import { ReduxProviders } from '@/store/provider';
import { ThemeProvider } from '@/providers/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <MockProvider>
    <ReduxProviders>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ReduxProviders>
    // </MockProvider>
  );
}
