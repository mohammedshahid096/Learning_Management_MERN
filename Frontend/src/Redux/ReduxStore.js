import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./reducers/Auth.reducer";
import {
  AdminCourseReducer,
  HomeCourseReducer,
} from "./reducers/Course.reducer";
import { getAccessCookie } from "../config/cookie";
import { AdminUserReducer, openAccountSlice } from "./reducers/user.reducer.js";
import { DashboardUserReducer } from "./reducers/Dashboard.reducer.js";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const isLogin = getAccessCookie();
const initialState = {
  AuthState: {
    user: isLogin ? {} : null,
  },
};

const reducer = {
  OpenAccountState: openAccountSlice.reducer,
  AuthState: AuthReducer,
  AdminCourseState: AdminCourseReducer,
  HomeCourseState: HomeCourseReducer,
  AdminUserState: AdminUserReducer,
  DashboardState: DashboardUserReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
  devTools: true,
});

export default store;
