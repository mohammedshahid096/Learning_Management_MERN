import axios from "axios";
import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const AddImpLinkAPI = async (Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/impurl/add`,
      Details,
      config.getConfig()
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
    const config = new AxiosConfig();

    const { data } = await axios.get(
      `${URLConstant}/impurl/admin/single/${id}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AdminUpdateImpLinkAPI = async (id, details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.put(
      `${URLConstant}/impurl/admin/single/${id}`,
      details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
