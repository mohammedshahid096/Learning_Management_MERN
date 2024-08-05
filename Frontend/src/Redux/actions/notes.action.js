import axiosInstance, { AxiosConfig } from "../../config/axiosInstance";
import { URLConstant } from "../../config/URLConstant";
import {
  ALL_NOTES_FAIL,
  ALL_NOTES_REQUEST,
  ALL_NOTES_SUCCESS,
  CLEAR_NOTES_ERRORS,
  SINGLE_NOTES_FAIL,
  SINGLE_NOTES_REQUEST,
  SINGLE_NOTES_SUCCESS,
} from "../constants/notes.constant";

export const ClearNotesErrorAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_NOTES_ERRORS,
  });
};

export const GetAllNotesAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NOTES_REQUEST });
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(
      `${URLConstant}/notes/all`,
      config.getConfig()
    );
    dispatch({
      type: ALL_NOTES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_NOTES_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const GetSingleNotesAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_NOTES_REQUEST });
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(
      `${URLConstant}/notes/all/${id}`,
      config.getConfig()
    );
    dispatch({
      type: SINGLE_NOTES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_NOTES_FAIL,
      payload: error?.response?.data || error,
    });
  }
};
