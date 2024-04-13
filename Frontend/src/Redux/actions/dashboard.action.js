import { URLConstant } from "../../config/URLConstant";
import axiosInstance from "../../config/axiosInstance";
import {
  COURSE_DASHBOARD_FAIL,
  COURSE_DASHBOARD_REQUEST,
  COURSE_DASHBOARD_SUCCESS,
  USER_DASHBOARD_FAIL,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_SUCCESS,
} from "../constants/dashboard.constant";

export const AdminUserAnalysisAction =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: USER_DASHBOARD_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/dashboard/admin/users`,
        config
      );

      dispatch({
        type: USER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DASHBOARD_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const AdminCourseAnalysisAction =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: COURSE_DASHBOARD_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/dashboard/admin/courses`,
        config
      );

      dispatch({
        type: COURSE_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_DASHBOARD_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };
