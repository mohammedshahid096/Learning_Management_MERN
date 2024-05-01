import { URLConstant } from "../config/URLConstant";
import axiosInstance from "../config/axiosInstance";

export const AddQuestionApi = async (Details, courseDataid) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post(
      `${URLConstant}/question/add/${courseDataid}`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const DeleteQuestionApi = async (questionId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.delete(
      `${URLConstant}/question/delete/${questionId}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AddAnswerApi = async (Details, questionId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.put(
      `${URLConstant}/question/add-answer/${questionId}`,
      Details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
