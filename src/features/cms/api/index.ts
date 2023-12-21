import { useQuery } from "@tanstack/react-query";

import { cmsRequest } from "@/lib/datocms";
import {
  type SharedContent,
  type ApplicationsContent,
  type DocumentsContent,
  SHARED,
  APPLICATIONS,
  DOCUMENTS,
} from "@/features/cms";

export const getSharedContentQuery = () => {
  return useQuery({
    queryKey: ["get-cms-shared"],
    queryFn: async () => {
      const { shared } = await cmsRequest<SharedContent>({ query: SHARED });

      return shared;
    },
  });
};

export const getApplicationsContentQuery = () => {
  return useQuery({
    queryKey: ["get-cms-applications"],
    queryFn: async () => {
      const { applicationsPage } = await cmsRequest<ApplicationsContent>({
        query: APPLICATIONS,
      });

      return applicationsPage;
    },
  });
};

export const getDocumentsContentQuery = () => {
  return useQuery({
    queryKey: ["get-cms-documents"],
    queryFn: async () => {
      const { documentsPage } = await cmsRequest<DocumentsContent>({
        query: DOCUMENTS,
      });

      return documentsPage;
    },
  });
};
