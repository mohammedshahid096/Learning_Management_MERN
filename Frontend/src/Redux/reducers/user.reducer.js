import {
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  USER_CLEAR_ERRORS_2,
} from "../constants/user.constant";
import { createSlice } from "@reduxjs/toolkit";

export const AdminUserReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case ADMIN_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data,
      };

    case ADMIN_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case USER_CLEAR_ERRORS_2:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    default:
      return state;
  }
};

export const openAccountSlice = createSlice({
  initialState: {
    isAccountPopUpOpen: false,
  },
  name: "OPEN_USER_LOGIN_ACCOUNT",
  reducers: {
    openLoginAccount: (state) => {
      state.isAccountPopUpOpen = true;
    },
    closeLoginAccount: (state) => {
      state.isAccountPopUpOpen = false;
    },
  },
});

export const { openLoginAccount, closeLoginAccount } = openAccountSlice.actions;
