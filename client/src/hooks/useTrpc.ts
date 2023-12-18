import { QueryClient } from "@tanstack/react-query";
import { httpLink } from "@trpc/client/links/httpLink";
import { useState } from "react";

import { trpc } from "@/lib/trpc";

export const useTrpc = () => {
  const [trpcQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpLink({ url: "http://localhost:4000/trpc" })],
    })
  );

  return {
    trpcQueryClient,
    trpcClient,
  };
};