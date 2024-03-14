import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./reducers/Auth.reducer";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const initialState = {};

const reducer = {
  AuthState: AuthReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
  devTools: true,
});

export default store;
