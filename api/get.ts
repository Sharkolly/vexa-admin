import API from "./api";

import { AxiosError } from "axios";

export const getUser = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, url] = queryKey;
  try {
    const getUserDetails = await API.get(url);
    return getUserDetails.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "An unexpected error occurred.";
    if (errorMessage) {
      const status = axiosError.response?.status;

      if (
        (status === 401 || status === 403) &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
      ) {
        localStorage.removeItem("token");
        location.reload();
      }
    }
  }
};

type GetSinglePropertyQueryKey = {
  queryKey: [string, string];
};
export const getRequest = async ({ queryKey }: GetSinglePropertyQueryKey) => {
  const [, url] = queryKey;
  try {
    const { data } = await API.get(url);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "An unexpected error occurred.";
    return errorMessage;
  }
};

export const fetchProperties = async ({ pageParam = 1 }) => {
  const res = await API.get(
    `/property/all-properties?page=${pageParam}&limit=6`,
  );
  return res.data;
};
