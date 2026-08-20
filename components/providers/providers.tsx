'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '../ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Example: data becomes stale after 1 minute
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();
export interface ProvidersProps {
  children: React.ReactNode;
  // themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-center" theme={'light'} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TooltipProvider>
  );
}
