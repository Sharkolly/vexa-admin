import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  // useInfiniteQuery,
} from "@tanstack/react-query";
import { postLoginForm } from "../api/post";
import { fetchProductsByCategory, getRequest } from "../api/get";

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

export const useVendorProduct = (product: string | undefined, page: number) => {
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["products", product, page],

    queryFn: () =>
      // fetchProductsByCategory(product, page),
      fetchProductsByCategory(product ?? "", page),

    // enabled: !!product || !!page,
    // enabled: !!product,
    placeholderData: keepPreviousData,
  });

  return {
    data,
    refetch,
    isLoading,
    isFetching,
  };
};

export const useQueryProduct = (url: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", url],
    queryFn: getRequest,
  });
  return { data, error, isLoading, refetch };
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

export const useMutationAdminAddProductFunction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      url,
      formData,
    }: {
      url: string;
      formData: FormData;
    }) => {
      const response = await API.post(url, formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Failed to delete product:", error);
    // },
  });
};
export const useMutationEditStickStatusFunction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, stock }: { url: string; stock: string }) => {
      const response = await API.patch(
        url,
        { stock },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Failed to delete product:", error);
    // },
  });
};

export const useMutationDeleteProductFunction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (url: string) => {
      try {
        const response = await API.delete(url, {
          withCredentials: true,
          headers: { "Cache-Control": "no-cache" },
        });
        return response;
      } catch (error) {
        if (error) {
          const axiosError = error as AxiosError<{ message?: string }>;
          return axiosError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });
};
