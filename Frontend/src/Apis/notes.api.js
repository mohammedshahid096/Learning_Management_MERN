import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const GetAllNotesApi = async () => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(`${URLConstant}/notes/all`);
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
