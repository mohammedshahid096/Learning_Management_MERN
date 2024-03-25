import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./reducers/Auth.reducer";
import { AdminCourseReducer } from "./reducers/Course.reducer";
import { getAccessCookie } from "../config/cookie";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const isLogin = getAccessCookie();
const initialState = {
  AuthState: {
    user: isLogin ? {} : null,
  },
};

const reducer = {
  AuthState: AuthReducer,
  AdminCourseState: AdminCourseReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
  devTools: true,
});

export default store;
