import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const CreateRazorPayOrderAPI = async (Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/payment/order`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
