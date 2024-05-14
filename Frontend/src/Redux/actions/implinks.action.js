import axios from "axios";
import { URLConstant } from "../../config/URLConstant";
import {
  SCROLL_DATA_FAIL,
  SCROLL_DATA_REQUEST,
  SCROLL_DATA_SUCCESS,
  SEARCH_LINK_CLEAR_ERRORS,
  SEARCH_LINK_DATA_FAIL,
  SEARCH_LINK_DATA_REQUEST,
  SEARCH_LINK_DATA_SUCCESS,
} from "../constants/implink.constant";
// import axiosInstance from "../../config/axiosInstance";

export const SearchUrlLinksAction =
  (query, request = true) =>
  async (dispatch) => {
    try {
      const { limit = 10, page = 1, type = "all" } = query;
      if (request) {
        dispatch({ type: SEARCH_LINK_DATA_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${URLConstant}/impurl/getall?limit=${limit}&page=${page}&type=${type}`,
        config
      );

      dispatch({
        type: SEARCH_LINK_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_LINK_DATA_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const ScrollUrlLinksAction =
  (query, request = true) =>
  async (dispatch) => {
    try {
      const { limit = 10, page = 1, type = "all" } = query;
      if (request) {
        dispatch({ type: SCROLL_DATA_REQUEST });
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${URLConstant}/impurl/getall?limit=${limit}&page=${page}&type=${type}`,
        config
      );

      dispatch({
        type: SCROLL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SCROLL_DATA_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const ClearErrorUrlsState = () => (dispatch) => {
  dispatch({ type: SEARCH_LINK_CLEAR_ERRORS });
};
