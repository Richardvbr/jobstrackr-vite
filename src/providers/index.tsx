import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

import supabase from "@/lib/supabase";
import { SessionContextProvider } from "@/contexts/AuthContext";
import { AppContextProvider } from "@/contexts/AppContext";
import { toastOptions } from "@/utils/toastOptions";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Always fresh data, clear cache after 5 mins
        staleTime: 0,
        cacheTime: 300000,
      },
    },
  });

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <>
            <Toaster position='bottom-center' toastOptions={toastOptions} />
            {children}
          </>
        </QueryClientProvider>
      </AppContextProvider>
    </SessionContextProvider>
  );
};
