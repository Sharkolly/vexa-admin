import API from "./api";

export const deleteProductRequest = async (url: string) => {
//   const { data } = await API.delete(`/admin/delete/${id}`);
  const { data } = await API.delete(url);
  return data;
};
