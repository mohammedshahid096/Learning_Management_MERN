import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const CreateCourseApi = async (Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post(
      `${URLConstant}/course/uploadCourse`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const UpdateCourseApi = async (courseid, Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.put(
      `${URLConstant}/course/single/${courseid}`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const UpdateCourseDataApi = async (courseid, Details) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.put(
      `${URLConstant}/course/coursedata/single/${courseid}`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const DeleteCourseApi = async (courseid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.delete(
      `${URLConstant}/course/single/${courseid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
