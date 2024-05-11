import Cookies from "js-cookie";

const ACCESS_KEY = "Valid_Access_Token";
const USER_TOKEN_KEY = "lms_user_token";

export const getUserTokenDataCookie = () => {
  let data = Cookies.get(USER_TOKEN_KEY);
  return data;
};

export const createAccessCookie = () => {
  Cookies.set(ACCESS_KEY, true, {
    expires: import.meta.env.VITE_ACCESS_TOKEN_KEY_TIME_COOKIE / (60 * 24),
  });
};

export const getAccessCookie = () => {
  let havecookie = Cookies.get(ACCESS_KEY);
  return havecookie;
};

export const removeAccessCookie = () => {
  Cookies.remove(ACCESS_KEY);
};
