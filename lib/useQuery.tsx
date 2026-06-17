import {
  useQuery,
  useMutation,
  useQueryClient,
  // useInfiniteQuery,
} from "@tanstack/react-query";
import { postLoginForm } from "../api/post";
import { getRequest } from "../api/get";

import { AxiosError } from "axios";
import API from "../api/api";
// import Swal from "sweetalert2";


export const useQueryUserFunction = () => {
  const pathname = window.location.pathname;

  const disabledRoutes = ["/login", "/signup"];
  
  const enabled = !disabledRoutes.includes(pathname);  

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      try {
        const response = await API.get("/admin", {
          withCredentials: true,
          headers: { "Cache-Control": "no-cache" },
        });
        return response.data;
      } catch (error) {
        if (error) {
          const axiosError = error as AxiosError<{ message?: string }>;
          return axiosError;
        }
      }
    },
    enabled,
    retry: 4,
  });

  return { data, error, isLoading, refetch };
};

export const useQueryProduct = (url: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", url],
    queryFn: getRequest,
  });
  return { data, error, isLoading };
};
// // get single product
// export const useQueryAllProduct = (url: string) => {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["products", url],
//     queryFn: getRequest,
//   });
//   return { data, error, isLoading };
// };

export const useMutationContactMessageFunction = (queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginDetails: { email: string; password: string }) =>
      postLoginForm(loginDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};
