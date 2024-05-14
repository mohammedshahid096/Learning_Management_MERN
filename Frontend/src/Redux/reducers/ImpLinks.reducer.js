import {
  SCROLL_DATA_FAIL,
  SCROLL_DATA_REQUEST,
  SCROLL_DATA_SUCCESS,
  SEARCH_LINK_CLEAR_ERRORS,
  SEARCH_LINK_DATA_FAIL,
  SEARCH_LINK_DATA_REQUEST,
  SEARCH_LINK_DATA_SUCCESS,
} from "../constants/implink.constant";

const SearchImpLinkReducer = (
  state = { urlsData: null, searchType: "all" },
  action
) => {
  switch (action.type) {
    case SEARCH_LINK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCROLL_DATA_REQUEST:
      return {
        ...state,
        loadingScroll: true,
      };
    case SEARCH_LINK_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        urlsData: action.payload.data,
        totalLinks: action.payload.totalLinks,
        page: Number(action.payload.page),
        searchType: action.payload.searchType,
      };
    case SCROLL_DATA_SUCCESS:
      return {
        ...state,
        loadingScroll: false,
        urlsData:
          action.payload.data.length > 0
            ? [...state.urlsData, ...action.payload.data]
            : state.urlsData,
        totalLinks: action.payload.totalLinks,
        page: Number(action.payload.page),
      };

    case SEARCH_LINK_DATA_FAIL:
    case SCROLL_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    case SEARCH_LINK_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        statusCode: null,
      };

    default:
      return state;
  }
};

export default SearchImpLinkReducer;
