import { URLConstant } from "../../config/URLConstant";
import {
  USER_CLEAR_ERRORS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_RESET,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_DESTROY,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/user.constant";
import axios from "axios";

export const RegisterUserAction =
  (Details, Reset = false) =>
  async (dispatch) => {
    try {
      if (Reset) {
        dispatch({ type: USER_REGISTER_RESET });
        return;
      }

      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URLConstant}/user/register`,
        Details,
        config
      );
      // const data = {
      //   success: true,
      //   message: "sdjkdf dflfkdjfldj",
      //   activationToken: "djfkdfkdfkdjkfjdklfjlklkjlj",
      // };

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error?.response?.data || error.message,
      });
    }
  };

export const VerifyUserAction =
  (Details, Reset = false, Destroy = false) =>
  async (dispatch) => {
    try {
      if (Reset) {
        dispatch({ type: USER_VERIFY_RESET });
        return;
      }

      if (Destroy) {
        dispatch({ type: USER_VERIFY_DESTROY });
        return;
      }

      dispatch({ type: USER_VERIFY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URLConstant}/user/verify`,
        Details,
        config
      );
      //  const data =  { message: "user created successfully", success: true }

      dispatch({
        type: USER_VERIFY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_VERIFY_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const LoginUserAction = (Details) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/login`,
      Details,
      config
    );
    //  const data =  { message: "user created successfully", success: true }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const ClearAuthReducer = () => (dispatch) => {
  dispatch({
    type: USER_CLEAR_ERRORS,
  });
};
