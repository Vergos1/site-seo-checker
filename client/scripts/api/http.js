import instance from "./client.js";

function httpRequest(method, url, request) {
  return instance[method](url, request).then((response) => response);
}

export const http = {
  get(url, request) {
    return httpRequest("get", url, request);
  },

  delete(url, request) {
    return httpRequest("delete", url, request);
  },

  post(url, request) {
    return httpRequest("post", url, request);
  },

  put(url, request) {
    return httpRequest("put", url, request);
  },

  patch(url, request) {
    return httpRequest("patch", url, request);
  },
};
