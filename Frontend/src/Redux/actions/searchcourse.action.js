import axios from "axios";
import { URLConstant } from "../../config/URLConstant";
import {
  FILTER_COURSE_DATA_FAIL,
  FILTER_COURSE_DATA_REQUEST,
  FILTER_COURSE_DATA_RESET,
  FILTER_COURSE_DATA_SUCCESS,
  SEARCH_COURSE_PAGE_FAIL,
  SEARCH_COURSE_PAGE_REQUEST,
  SEARCH_COURSE_PAGE_SUCCESS,
} from "../constants/course.contant";
import { AxiosConfig } from "../../config/axiosInstance";

export const SearchCoursesAction =
  (request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: SEARCH_COURSE_PAGE_REQUEST });
      }
      const config = new AxiosConfig();
      config.removeContentType();

      const { data } = await axios.get(
        `${URLConstant}/course/search?`,
        config.getConfig()
      );

      dispatch({
        type: SEARCH_COURSE_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_COURSE_PAGE_FAIL,
        payload: error?.response?.data || { message: error.messasge },
      });
    }
  };

export const FilterCoursesAction =
  (query = "", reset = false) =>
  async (dispatch) => {
    try {
      if (reset) {
        dispatch({ type: FILTER_COURSE_DATA_RESET });
        return;
      }
      dispatch({ type: FILTER_COURSE_DATA_REQUEST });
      const config = new AxiosConfig();
      config.removeContentType();

      const { data } = await axios.get(
        `${URLConstant}/course/search?${query}`,
        config.getConfig()
      );

      dispatch({
        type: FILTER_COURSE_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FILTER_COURSE_DATA_FAIL,
        payload: error?.response?.data || { message: error.messasge },
      });
    }
  };
