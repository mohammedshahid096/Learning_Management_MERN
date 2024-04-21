import axios from "axios";
import { URLConstant } from "./URLConstant";
import {
  createAccessCookie,
  getAccessCookie,
  removeAccessCookie,
} from "./cookie";

const axiosInstance = axios.create();

const getAccessToken = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${URLConstant}/user/refresh_token`,
      config
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.request.use(async (res) => {
  try {
    const haveAAccessKey = getAccessCookie();
    if (!haveAAccessKey) {
      const response = await getAccessToken();
      if (response.success) {
        createAccessCookie();
        return res;
      }
    }
    return res;
  } catch (error) {
    if (error.response.data.statusCode === 401) {
      removeAccessCookie();
      let currentPath = window.location.pathname;
      if (currentPath !== "/") {
        window.location.href = "/";
      }
    } else {
      return Promise.reject(error);
    }
  }
});

export default axiosInstance;
