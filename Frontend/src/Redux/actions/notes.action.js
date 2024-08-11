import axiosInstance, { AxiosConfig } from "../../config/axiosInstance";
import { URLConstant } from "../../config/URLConstant";
import {
  ADD_NEW_POINT_FAIL,
  ADD_NEW_POINT_REQUEST,
  ADD_NEW_POINT_SUCCESS,
  ADD_USER_TO_NOTES_FAIL,
  ADD_USER_TO_NOTES_REQUEST,
  ADD_USER_TO_NOTES_SUCCESS,
  ALL_NOTES_FAIL,
  ALL_NOTES_PUSH,
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

export const AddNewPointNotesAction = (id, details) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NEW_POINT_REQUEST,
    });
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/notes/note-point/${id}`,
      details,
      config.getConfig()
    );
    dispatch({
      type: ADD_NEW_POINT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEW_POINT_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const AddRemoveAccessUserNoteAction =
  (noteid, details) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_USER_TO_NOTES_REQUEST,
      });
      const config = new AxiosConfig();
      const { data } = await axiosInstance.post(
        `${URLConstant}/notes/users/operations/${noteid}`,
        details,
        config.getConfig()
      );

      dispatch({
        type: ADD_USER_TO_NOTES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_USER_TO_NOTES_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };
