import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const AddQuestionApi = async (Details, courseDataid) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/question/add/${courseDataid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const DeleteQuestionApi = async (questionId) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.delete(
      `${URLConstant}/question/delete/${questionId}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AddAnswerApi = async (Details, questionId) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.put(
      `${URLConstant}/question/add-answer/${questionId}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

// #review

export const AddReviewApi = async (Details, courseid) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/review/add/${courseid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AddReviewReplyAdminApi = async (Details, reviewid) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/review/reply/${reviewid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
