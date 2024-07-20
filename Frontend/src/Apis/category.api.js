import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

/**
 * The AddCategoryApi function sends a POST request to add a new category with the provided details.
 * @param {Object} Details - Details is an object containing the information needed to add a new category. This
 * object typically includes properties such as the category name, description, and any other relevant
 * details required for creating a new category in the system.
 * @returns {Object} The AddCategoryApi function returns the data received from the API call if successful. If
 * there is an error, it returns the response data from the error, or the error itself if no response
 * data is available.
 */
export const AddCategoryApi = async (Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/category/add`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * The UpdateCategoryApi function sends a PUT request to update a specific category with the provided
 * details.
 * @param {String} categoryid - The `categoryid` parameter is the unique identifier of the category that you
 * want to update. It is used to specify which category you are targeting for the update operation.
 * @param {Object} Details - Details is an object containing the updated details of the category that needs to
 * be updated. It may include properties such as name, description, or any other relevant information
 * related to the category.
 * @returns {Object} The UpdateCategoryApi function returns the data received from the PUT request to update a
 * category, or an error response if there is an error during the request.
 */
export const UpdateCategoryApi = async (categoryid, Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.put(
      `${URLConstant}/category/single/${categoryid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * The DeleteCategoryApi function sends a DELETE request to a specific category endpoint with the user
 * ID to delete the category.
 * @param {String} userid - The `userid` parameter in the `DeleteCategoryApi` function represents the unique
 * identifier of the category that you want to delete. This identifier is used to specify which
 * category should be deleted from the database.
 * @returns The DeleteCategoryApi function is returning the data received from the API call if
 * successful. If there is an error, it will return the response data from the error or the error
 * itself.
 */
export const DeleteCategoryApi = async (userid) => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.delete(
      `${URLConstant}/category/single/${userid}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
