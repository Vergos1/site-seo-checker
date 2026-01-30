import { http } from "../http.js";

export const checkLink = async (link, type) => {
  const response = await http.post(`/check-link?${type}`, {
    link,
  });
  return response;
};

export const getChecksHistory = async () => {
  const response = await http.get(`/check-link/history`);
  console.log(response.data);
  return response;
};
