import {
  MY_USER_COURSES_LIST_FAIL,
  MY_USER_COURSES_LIST_REQUEST,
  MY_USER_COURSES_LIST_SUCCESS,
} from "../constants/course.contant";
import {
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  MY_USER_PURCHASE_FAIL,
  MY_USER_PURCHASE_REQUEST,
  MY_USER_PURCHASE_SUCCESS,
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

export const UserPersonalReducer = (
  state = { myCourses: null, purchases: null },
  action
) => {
  switch (action.type) {
    case MY_USER_COURSES_LIST_REQUEST:
    case MY_USER_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MY_USER_COURSES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        myCourses: action.payload.data?.courses,
      };
    case MY_USER_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: action.payload.data,
      };
    case MY_USER_COURSES_LIST_FAIL:
    case MY_USER_PURCHASE_FAIL:
      return {
        ...state,
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    default:
      return state;
  }
};

export const openAccountSlice = createSlice({
  initialState: {
    isAccountPopUpOpen: false,
    AccountDetails: null,
  },
  name: "OPEN_USER_LOGIN_ACCOUNT",
  reducers: {
    openLoginAccount: (state) => {
      state.isAccountPopUpOpen = true;
    },
    closeLoginAccount: (state) => {
      state.isAccountPopUpOpen = false;
    },
    openLoginAccountWithDetails: (state, action) => {
      state.isAccountPopUpOpen = true;
      state.AccountDetails = action.payload;
    },
    closeLoginAccountWithDetails: (state) => {
      state.AccountDetails = null;
    },
  },
});

export const {
  openLoginAccount,
  closeLoginAccount,
  openLoginAccountWithDetails,
  closeLoginAccountWithDetails,
} = openAccountSlice.actions;
