import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const CreateCourseOrderAPI = async (Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post(
      `${URLConstant}/order/addnew`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const GetSingleOrderDetailAPI = async (orderid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.get(
      `${URLConstant}/order/admin/${orderid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
