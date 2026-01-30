import { http } from "../http.js";

export const checkLink = async (link, type) => {
  const response = await http.post(`/check-link?type=${type}`, {
    link,
  });

  return response.data;
};

export const getChecksHistory = async () => {
  const response = await http.get(`/check-link/history`);

  return response.data;
};
