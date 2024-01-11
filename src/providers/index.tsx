import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import { SessionContextProvider } from "@/contexts/AuthContext";
import { AppContextProvider } from "@/contexts/AppContext";
import { toastOptions } from "@/utils/toastOptions";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Always fresh data, clear cache after 5 mins
        staleTime: 0,
        cacheTime: 300000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ThemeProvider defaultTheme='system'>
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Toaster position='bottom-center' toastOptions={toastOptions} />
            {children}
          </AppContextProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
};
