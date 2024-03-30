import {
  ADMIN_ALL_COURSE_LIST_FAIL,
  ADMIN_ALL_COURSE_LIST_REQUEST,
  ADMIN_ALL_COURSE_LIST_SUCCESS,
  CLEAR_COURSE_ERRORS,
  GET_SINGLE_COURSE_FAIL,
  GET_SINGLE_COURSE_REQUEST,
  GET_SINGLE_COURSE_SUCCESS,
} from "../constants/course.contant";

export const AdminCourseReducer = (state = { courses: null }, action) => {
  switch (action.type) {
    case ADMIN_ALL_COURSE_LIST_REQUEST:
    case GET_SINGLE_COURSE_REQUEST:
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

    case GET_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        SingleCourse: {
          courseDetail: action.payload.courseDetail,
          coursesData: action.payload.coursesData,
        },
      };

    case ADMIN_ALL_COURSE_LIST_FAIL:
    case GET_SINGLE_COURSE_FAIL:
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
