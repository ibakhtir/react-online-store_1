import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

function transformData(data) {
  if (data) {
    return Object.keys(data).map((key) => ({
      ...data[key]
    }));
  } else {
    return [];
  }
}

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (res) {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Что-то пошло не так. Попробуйте позже.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};
export default httpService;
