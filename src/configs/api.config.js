import axios from "axios";

const apiInfo = {
  host: process.env.REACT_APP_API_HOST,
  port: process.env.REACT_APP_API_PORT
};

export const baseURL = `${apiInfo.host}:${apiInfo.port}/api-manage`;
export const uploadPath = "/uploads";

export const roleConsts = {
  ADMIN: "admin",
  MANAGER: "manager",
  MERCHANDISER: "merchandiser",
  SUPPORT: "support"
};
export const roles = [
  roleConsts.ADMIN,
  roleConsts.MANAGER,
  roleConsts.MERCHANDISER,
  roleConsts.SUPPORT
];

export default () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
};
