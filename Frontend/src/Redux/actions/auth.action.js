import { URLConstant } from "../../config/URLConstant";
import axiosInstance from "../../config/axiosInstance";
import {
  createAccessCookie,
  getAccessCookie,
  removeAccessCookie,
  removeUserTokenDataCookie,
} from "../../config/cookie";
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
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_RESET,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_RESET,
  SOCAIL_AUTH_SUCCESS,
  SOCAIL_AUTH_FAIL,
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
    createAccessCookie();
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

export const SocialUserLoginAction = (Details) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/socialAuth`,
      Details,
      config
    );

    createAccessCookie();

    dispatch({
      type: SOCAIL_AUTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SOCAIL_AUTH_FAIL,
      payload: error?.response?.data || error,
    });
  }
};

export const UserLogoutAction =
  (reset = false) =>
  async (dispatch) => {
    try {
      if (reset) {
        dispatch({ type: USER_LOGOUT_RESET });
        return;
      }
      const config = {
        withCredentials: true,
      };

      const { data } = await axiosInstance.get(
        `${URLConstant}/user/logout`,
        config
      );

      removeAccessCookie();
      removeUserTokenDataCookie();

      dispatch({
        type: USER_LOGOUT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      removeAccessCookie();
      removeUserTokenDataCookie();
      dispatch({
        type: USER_LOGOUT_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const UserDetailProfileAction = () => async (dispatch) => {
  const haveToken = getAccessCookie();
  try {
    const config = {
      withCredentials: true,
    };

    if (haveToken) {
      const { data } = await axiosInstance.get(
        `${URLConstant}/user/me`,
        config
      );
      dispatch({
        type: USER_DETAIL_SUCCESS,
        payload: data,
      });
    } else {
      const response = await axios.get(
        `${URLConstant}/user/refresh_token`,
        config
      );
      if (response.data.success) {
        createAccessCookie();
        const { data } = await axios.get(`${URLConstant}/user/me`, config);
        if (data.success) {
          dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data,
          });
        }
      }
    }
  } catch (error) {
    // dispatch({
    //   type: USER_DETAIL_FAIL,
    //   payload: error?.response?.data || error,
    // });
  }
};

export const UpdateUserDetailAction =
  (Details, image, Reset = false) =>
  async (dispatch) => {
    try {
      if (Reset) {
        dispatch({ type: UPDATE_USER_DETAIL_RESET });
        return;
      }
      dispatch({ type: UPDATE_USER_DETAIL_REQUEST });
      const config = {
        withCredentials: true,
      };
      const { data } = await axiosInstance.put(
        `${URLConstant}/user/me`,
        Details,
        config
      );

      if (image) {
        const formData = new FormData();
        formData.append("ProfileAvatar", image);
        let response = await axiosInstance.put(
          `${URLConstant}/user/me/avatar`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data.success) {
          dispatch({
            type: UPDATE_USER_DETAIL_SUCCESS,
            payload: response.data,
          });
          return;
        }
      }
      dispatch({
        type: UPDATE_USER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_DETAIL_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };

export const ClearAuthReducer = () => (dispatch) => {
  dispatch({
    type: USER_CLEAR_ERRORS,
  });
};
