import axios from "axios";
import { URLConstant } from "./URLConstant";
import {
  createAccessCookie,
  getAccessCookie,
  removeAccessCookie,
  removeUserTokenDataCookie,
} from "./cookie";

const axiosInstance = axios.create();

const getAccessToken = async () => {
  try {
    const config = new AxiosConfig();

    const { data } = await axios.get(
      `${URLConstant}/user/refresh_token`,
      config.getConfig()
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
      removeUserTokenDataCookie();
      let currentPath = window.location.pathname;
      if (currentPath !== "/") {
        window.location.href = "/";
      }
    } else {
      return Promise.reject(error);
    }
  }
});

export class AxiosConfig {
  constructor() {
    this.config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  }

  addConfig(key, value) {
    this.config[key] = value;
  }
  addConfigHeader(key, value) {
    this.config.headers[key] = value;
  }

  removeConfig(key) {
    if (this.config.hasOwnProperty(key)) {
      delete this.config[key];
    }
  }
  removeConfigHeader(key) {
    if (this.config.headers.hasOwnProperty(key)) {
      delete this.config.headers[key];
    }
  }

  removeWithCredentials() {
    this.removeConfig("withCredentials");
  }

  removeContentType() {
    this.removeConfig("Content-Type");
  }

  getConfig() {
    return this.config;
  }
}

export default axiosInstance;
