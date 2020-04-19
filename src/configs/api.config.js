import axios from "axios";

const apiInfo = {
  host: process.env.REACT_APP_API_HOST,
  port: process.env.REACT_APP_API_PORT
};

export const baseURL = `${apiInfo.host}:${apiInfo.port}/api`;
export const uploadPath = "/uploads";

export default () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
};
