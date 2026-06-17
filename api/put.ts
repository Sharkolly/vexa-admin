import API from "./api";

export const putMessageNotificationRequest = async (id: string) => {
  const { data } = await API.put(`/notification/message/${id}`);
  return data;
};
