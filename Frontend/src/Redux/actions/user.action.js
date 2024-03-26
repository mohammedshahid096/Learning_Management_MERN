import { URLConstant } from "../../config/URLConstant";
import axiosInstance from "../../config/axiosInstance";
import { ADMIN_ALL_COURSE_LIST_REQUEST } from "../constants/course.contant";
import {
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_SUCCESS,
  USER_CLEAR_ERRORS_2,
} from "../constants/user.constant";

export const AdminGetUsersList =
  (loading = true) =>
  async (dispatch) => {
    try {
      if (loading) {
        dispatch({ type: ADMIN_ALL_COURSE_LIST_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/user/users/all`,
        config
      );

      dispatch({
        type: ADMIN_ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ALL_USERS_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const ClearUserReducer = () => {
  dispatch({
    type: USER_CLEAR_ERRORS_2,
  });
};
