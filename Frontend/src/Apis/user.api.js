import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const UpdateUserRoleApi = async (details, userid) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.patch(
      `${URLConstant}/user/role/${userid}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
};

export const DeleteUserApi = async (userid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.delete(
      `${URLConstant}/user/delete/${userid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
};
