import ReduxStore from "../Redux/ReduxStore";
import { ALL_NOTES_PUSH } from "../Redux/constants/notes.constant";
import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

export const GetAllNotesApi = async () => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(`${URLConstant}/notes/all`);
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const AddNewNotesApi = async (details) => {
  try {
    const config = new AxiosConfig();
    const { data } = await axiosInstance.post(
      `${URLConstant}/notes/new-note`,
      details,
      config.getConfig()
    );
    if (data?.success) {
      ReduxStore.dispatch({ type: ALL_NOTES_PUSH, payload: data });
    }
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
