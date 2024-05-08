import {
  ADMIN_ALL_COURSE_LIST_FAIL,
  ADMIN_ALL_COURSE_LIST_REQUEST,
  ADMIN_ALL_COURSE_LIST_SUCCESS,
  ALL_COURSE_LIST_FAIL,
  ALL_COURSE_LIST_REQUEST,
  ALL_COURSE_LIST_SUCCESS,
  CLEAR_COURSE_ERRORS,
  FILTER_COURSE_DATA_FAIL,
  FILTER_COURSE_DATA_REQUEST,
  FILTER_COURSE_DATA_RESET,
  FILTER_COURSE_DATA_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_SINGLE_COURSE_FAIL,
  GET_SINGLE_COURSE_REQUEST,
  GET_SINGLE_COURSE_SUCCESS,
  HOME_CLEAR_COURSE_ERRORS,
  HOME_SINGLE_COURSE_FAIL,
  HOME_SINGLE_COURSE_REQUEST,
  HOME_SINGLE_COURSE_SUCCESS,
  SEARCH_COURSE_PAGE_FAIL,
  SEARCH_COURSE_PAGE_REQUEST,
  SEARCH_COURSE_PAGE_SUCCESS,
  SINGLE_COURSE_REVIEWS,
} from "../constants/course.contant";
import {
  ADMIN_ALL_ORDERS_FAIL,
  ADMIN_ALL_ORDERS_REQUEST,
  ADMIN_ALL_ORDERS_SUCCESS,
} from "../constants/order.constant";

export const AdminCourseReducer = (
  state = { courses: null, categories: null, allOrders: null },
  action
) => {
  switch (action.type) {
    case ADMIN_ALL_COURSE_LIST_REQUEST:
    case GET_SINGLE_COURSE_REQUEST:
    case GET_ALL_CATEGORIES_REQUEST:
    case ADMIN_ALL_ORDERS_REQUEST:
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
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
      };
    case ADMIN_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allOrders: action.payload.data,
      };
    case ADMIN_ALL_COURSE_LIST_FAIL:
    case GET_SINGLE_COURSE_FAIL:
    case ADMIN_ALL_ORDERS_FAIL:
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

export const HomeCourseReducer = (
  state = { courses: null, singleCourseDetails: null },
  action
) => {
  switch (action.type) {
    case ALL_COURSE_LIST_REQUEST:
    case HOME_SINGLE_COURSE_REQUEST:
    case SEARCH_COURSE_PAGE_REQUEST:
    case FILTER_COURSE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload.data,
      };
    case HOME_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleCourseDetails: {
          courseDetail: action.payload.courseDetail,
          coursesData: action.payload.coursesData,
        },
      };
    case SINGLE_COURSE_REVIEWS:
      return {
        ...state,
        loading: false,
        singleCourseDetails: {
          ...state.singleCourseDetails,
          courseReviews: action.payload.data,
        },
      };
    case SEARCH_COURSE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchPageData: action.payload.data,
      };
    case FILTER_COURSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        filterData: action.payload.data,
      };
    case FILTER_COURSE_DATA_RESET:
      return {
        ...state,
        filterData: null,
      };

    case ALL_COURSE_LIST_FAIL:
    case HOME_SINGLE_COURSE_FAIL:
    case SEARCH_COURSE_PAGE_FAIL:
    case FILTER_COURSE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case HOME_CLEAR_COURSE_ERRORS:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    default:
      return state;
  }
};
