'use client';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import axios from 'axios';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig
        value={{
          fetcher: async (url: string) => {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await axios.get(`${baseUrl}${url}`);
            return response.data;
          }
        }}
      >
        {children}
      </SWRConfig>
    </ThemeProvider>
  );
}
