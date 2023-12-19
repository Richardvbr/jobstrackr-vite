import { useSearchParams, useLocation } from "react-router-dom";

type Params = {
  [key: string]: string;
};

export const useQueryParam = (query: string) => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get(query);

  return param;
};

export const useQueryParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let params: Params = {};

  for (let param of searchParams) {
    params[param[0]] = param[1];
  }

  return params;
};