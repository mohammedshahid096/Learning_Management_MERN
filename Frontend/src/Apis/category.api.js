import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const AddCategoryApi = async (Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post(
      `${URLConstant}/category/add`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const UpdateCategoryApi = async (categoryid, Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.put(
      `${URLConstant}/category/single/${categoryid}`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const DeleteCategoryApi = async (userid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.delete(
      `${URLConstant}/category/delete/${userid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
