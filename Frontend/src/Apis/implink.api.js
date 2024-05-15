import axios from "axios";
import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const AddImpLinkAPI = async (Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post(
      `${URLConstant}/impurl/add`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const SearchImpLinkAPI = async (searchKey) => {
  try {
    const { data } = await axios.get(
      `${URLConstant}/impurl/search?search=${searchKey}`
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AdminSingleImpLinkAPI = async (id) => {
  try {
    const { data } = await axios.get(
      `${URLConstant}/impurl/admin/single/${id}`
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AdminUpdateImpLinkAPI = async (id, details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axiosInstance.put(
      `${URLConstant}/impurl/admin/single/${id}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
