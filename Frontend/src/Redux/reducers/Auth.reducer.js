import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_CLEAR_ERRORS,
  USER_REGISTER_RESET,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_RESET,
  USER_VERIFY_FAIL,
  USER_VERIFY_DESTROY,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_RESET,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_RESET,
  SOCAIL_AUTH_SUCCESS,
  SOCAIL_AUTH_FAIL,
} from "../constants/user.constant";

export const AuthReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_VERIFY_REQUEST:
    case USER_LOGIN_REQUEST:
    case UPDATE_USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
    case SOCAIL_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        ActivationToken: action.payload.activationToken,
      };
    case USER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        AccountCreated: action.payload.success,
        message: action.payload.message,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        message: action.payload.message,
      };
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      };
    case UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        message: "successfully updated the profile",
        user: action.payload.data,
      };
    case USER_REGISTER_FAIL:
    case USER_VERIFY_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT_FAIL:
    case USER_DETAIL_FAIL:
    case UPDATE_USER_DETAIL_FAIL:
    case SOCAIL_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case USER_REGISTER_RESET:
    case USER_VERIFY_RESET:
    case USER_LOGOUT_RESET:
      return {
        ...state,
        message: null,
      };
    case UPDATE_USER_DETAIL_RESET:
      return {
        ...state,
        isUpdated: false,
        message: null,
      };
    case USER_VERIFY_DESTROY:
      return {
        ...state,
        ActivationToken: null,
        AccountCreated: false,
      };

    case USER_CLEAR_ERRORS:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    default:
      return state;
  }
};
