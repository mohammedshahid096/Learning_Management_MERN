import {
  COURSE_DASHBOARD_FAIL,
  COURSE_DASHBOARD_REQUEST,
  COURSE_DASHBOARD_SUCCESS,
  DASHBOARD_ERROR_RESET,
  USER_DASHBOARD_FAIL,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_SUCCESS,
} from "../constants/dashboard.constant";

// ### user
export const DashboardUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DASHBOARD_REQUEST:
    case COURSE_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        UserAnalytics: action.payload.data,
      };

    case COURSE_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        CourseAnalytics: action.payload.data,
      };

    case USER_DASHBOARD_FAIL:
    case COURSE_DASHBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case DASHBOARD_ERROR_RESET:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    default:
      return state;
  }
};
