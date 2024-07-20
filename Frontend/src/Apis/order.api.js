import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const CreateCourseOrderAPI = async (Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/order/addnew`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const GetSingleOrderDetailAPI = async (orderid) => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(
      `${URLConstant}/order/admin/${orderid}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
