import axios from "axios";
import { URLConstant } from "../../config/URLConstant";
import axiosInstance from "../../config/axiosInstance";
import {
  ADMIN_ALL_COURSE_LIST_FAIL,
  ADMIN_ALL_COURSE_LIST_REQUEST,
  ADMIN_ALL_COURSE_LIST_SUCCESS,
  ALL_COURSE_LIST_FAIL,
  ALL_COURSE_LIST_REQUEST,
  ALL_COURSE_LIST_SUCCESS,
  CLEAR_COURSE_ERRORS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_SINGLE_COURSE_FAIL,
  GET_SINGLE_COURSE_REQUEST,
  GET_SINGLE_COURSE_SUCCESS,
} from "../constants/course.contant";

export const AdminGetCourseList =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: ADMIN_ALL_COURSE_LIST_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/course/courses/list`,
        config
      );

      dispatch({
        type: ADMIN_ALL_COURSE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ALL_COURSE_LIST_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const GetCategoriesList =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/category/all`,
        config
      );

      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

export const GetSingleCourseDetail = (courseid) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_COURSE_REQUEST });
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.get(
      `${URLConstant}/course/single/${courseid}`,
      config
    );

    dispatch({
      type: GET_SINGLE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_COURSE_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const ClearErrorAdminCourseState = () => (dispatch) => {
  dispatch({ type: CLEAR_COURSE_ERRORS });
};

//  -------------------------------------CORSES HOME-----------------------------------------
export const HomeCourseListAction =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: ALL_COURSE_LIST_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(`${URLConstant}/course/all`, config);

      dispatch({
        type: ALL_COURSE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_COURSE_LIST_FAIL,
        payload: error?.response?.data || { message: error.messasge },
      });
    }
  };
