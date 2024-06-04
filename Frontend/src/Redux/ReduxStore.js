import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./reducers/Auth.reducer";
import {
  AdminCourseReducer,
  HomeCourseReducer,
} from "./reducers/Course.reducer";
import { getAccessCookie, getUserTokenDataCookie } from "../config/cookie";
import {
  AdminUserReducer,
  UserPersonalReducer,
  openAccountSlice,
} from "./reducers/user.reducer.js";
import { DashboardUserReducer } from "./reducers/Dashboard.reducer.js";
import SearchImpLinkReducer from "./reducers/ImpLinks.reducer.js";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const isLogin = getUserTokenDataCookie();

const initialState = {
  AuthState: {
    user: isLogin ? JSON.parse(isLogin) : null,
  },
};

const reducer = {
  OpenAccountState: openAccountSlice.reducer,
  AuthState: AuthReducer,
  UserPersonalState: UserPersonalReducer,
  AdminCourseState: AdminCourseReducer,
  HomeCourseState: HomeCourseReducer,
  AdminUserState: AdminUserReducer,
  DashboardState: DashboardUserReducer,
  URLState: SearchImpLinkReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
  devTools:
    import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? false : true,
});

export default store;
