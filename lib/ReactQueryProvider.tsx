'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchInterval: false,
        staleTime: 1000 * 60 * 3, // Data remains fresh for 5 minutes
        refetchOnWindowFocus: true, // Prevent refetching when the window is focused
        refetchOnMount: true, // Prevent refetching when the component mounts
        refetchOnReconnect: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
