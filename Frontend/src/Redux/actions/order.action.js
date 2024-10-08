import { URLConstant } from "../../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../../config/axiosInstance";
import {
  ADMIN_ALL_ORDERS_FAIL,
  ADMIN_ALL_ORDERS_REQUEST,
  ADMIN_ALL_ORDERS_SUCCESS,
} from "../constants/order.constant";

export const AdminGetAllOrdersList =
  (limit = 10, page = 1, request = true) =>
  async (dispatch) => {
    try {
      if (request) {
        dispatch({ type: ADMIN_ALL_ORDERS_REQUEST });
      }
      const config = new AxiosConfig();
      config.removeContentType();

      const { data } = await axiosInstance.get(
        `${URLConstant}/order/admin/allorders?limit=${limit}&page=${page}`,
        config.getConfig()
      );

      dispatch({
        type: ADMIN_ALL_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ALL_ORDERS_FAIL,
        payload: error?.response?.data || error,
      });
    }
  };
