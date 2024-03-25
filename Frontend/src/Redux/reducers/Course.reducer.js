import {
  ADMIN_ALL_COURSE_LIST_FAIL,
  ADMIN_ALL_COURSE_LIST_REQUEST,
  ADMIN_ALL_COURSE_LIST_SUCCESS,
  CLEAR_COURSE_ERRORS,
} from "../constants/course.contant";

export const AdminCourseReducer = (state = { courses: null }, action) => {
  switch (action.type) {
    case ADMIN_ALL_COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ALL_COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload.data,
      };

    case ADMIN_ALL_COURSE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case CLEAR_COURSE_ERRORS:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    default:
      return state;
  }
};
