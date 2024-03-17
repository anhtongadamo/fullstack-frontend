import axios from "axios";

const axiosSetting = () => {
  const baseURL = process.env.VUE_APP_BASE_API_URL ?? null;
  const token = process.env.VUE_APP_ACCESS_TOKEN ?? null;

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const axiosInstance = axiosSetting();

const http = {
  install(Vue) {
    Vue.prototype.$http = axiosInstance;
  },
};

export { http, axiosInstance };
