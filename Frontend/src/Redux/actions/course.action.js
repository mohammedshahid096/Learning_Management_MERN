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
  HOME_CLEAR_COURSE_ERRORS,
  HOME_SINGLE_COURSE_FAIL,
  HOME_SINGLE_COURSE_REQUEST,
  HOME_SINGLE_COURSE_SUCCESS,
  MY_USER_COURSES_LIST_FAIL,
  MY_USER_COURSES_LIST_REQUEST,
  MY_USER_COURSES_LIST_SUCCESS,
  SINGLE_COURSE_REVIEWS,
} from "../constants/course.contant";
import {
  MY_USER_PURCHASE_FAIL,
  MY_USER_PURCHASE_REQUEST,
  MY_USER_PURCHASE_SUCCESS,
} from "../constants/user.constant";
import {
  ADMIN_ALL_LINK_FAIL,
  ADMIN_ALL_LINK_REQUEST,
  ADMIN_ALL_LINK_SUCCESS,
} from "../constants/implink.constant";

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

      const { data } = await axios.get(`${URLConstant}/category/all`, config);

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

export const HomeSingleCourseAction =
  (courseid, request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: HOME_SINGLE_COURSE_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${URLConstant}/course/single/${courseid}`,
        config
      );

      const { data: data2 } = await axios.get(
        `${URLConstant}/review/all/${courseid}`,
        config
      );

      dispatch({
        type: HOME_SINGLE_COURSE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: SINGLE_COURSE_REVIEWS,
        payload: data2,
      });
    } catch (error) {
      dispatch({
        type: HOME_SINGLE_COURSE_FAIL,
        payload: error?.response?.data || { message: error.messasge },
      });
    }
  };

export const ReviewRefreshAction = (courseid) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${URLConstant}/review/all/${courseid}`,
      config
    );

    dispatch({
      type: SINGLE_COURSE_REVIEWS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ------------------------ user profile courses--------------------------------------------
export const userMyCoursesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_USER_COURSES_LIST_REQUEST });
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${URLConstant}/user/me/courses`, config);

    dispatch({
      type: MY_USER_COURSES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_USER_COURSES_LIST_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const userMyPurchaseAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_USER_PURCHASE_REQUEST });
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${URLConstant}/user/me/orders`, config);

    dispatch({
      type: MY_USER_PURCHASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_USER_PURCHASE_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const ClearErrorHomeCourseState = () => (dispatch) => {
  dispatch({ type: HOME_CLEAR_COURSE_ERRORS });
};

// ------------------------ important links ----------------------------------------------
export const adminAllLinksAction =
  (limit = 10, page = 1, request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: ADMIN_ALL_LINK_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/impurl/admin/all?limit=${limit}&page=${page}`,
        config
      );

      dispatch({
        type: ADMIN_ALL_LINK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ALL_LINK_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };
