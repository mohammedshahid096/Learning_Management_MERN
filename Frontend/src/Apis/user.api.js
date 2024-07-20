import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";

/**
 * The function `UpdateUserRoleApi` sends a PATCH request to update a user's role using Axios with
 * error handling.
 * @param {Object} details  details The `details` parameter in the `UpdateUserRoleApi` function likely contains the
 * information needed to update the user's role. This could include data such as the new role ID,
 * permissions, or any other relevant details required to update the user's role in the system.
 * @param {String} userid  - The `userid` parameter in the `UpdateUserRoleApi` function represents the unique
 * identifier of the user whose role is being updated. It is used to specify which user's role should
 * be modified in the backend system.
 * @return {Object} The UpdateUserRoleApi function returns the data received from the API call if successful.
 * If there is an error, it returns the response data from the error or the error message itself.
 */
export const UpdateUserRoleApi = async (details, userid) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.patch(
      `${URLConstant}/user/role/${userid}`,
      details,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
};

/**
 * The DeleteUserApi function sends a request to delete a user with the specified userid using
 * axiosInstance.
 * @param {String} userid - The `userid` parameter in the `DeleteUserApi` function is the unique identifier of
 * the user that you want to delete from the system. This identifier is used to specify which user
 * should be deleted when making a request to the server to delete the user's data.
 * @returns {Object} The DeleteUserApi function returns the data received from the API call if successful. If
 * there is an error, it returns the response data from the error or the error message itself.
 */
export const DeleteUserApi = async (userid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.delete(
      `${URLConstant}/user/delete/${userid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
};

/**
 * This function retrieves user admin data from an API endpoint using the provided user ID.
 * @param {String} userid - The `userid` parameter in the `GetUserAdminApi` function is the unique identifier of
 * the user for whom you want to retrieve administrative information. This parameter is used to make a
 * GET request to the API endpoint `/user/users/` in order to fetch the user's
 * data
 * @returns The `GetUserAdminApi` function returns the data fetched from the API endpoint
 * `/user/users/` using axiosInstance. If successful, it returns the fetched
 * data. If there is an error, it returns the error response data or the error itself.
 */
export const GetUserAdminApi = async (userid) => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.get(
      `${URLConstant}/user/users/${userid}`,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * This function is used to add or delete a course for a user with admin privileges in a web
 * application.
 * @param {String} userid - The `userid` parameter is the unique identifier of the user for whom you want to add
 * or delete a course.
 * @param {String} courseid - The `courseid` parameter represents the unique identifier of the course that is
 * being added or deleted for a user.
 * @param {boolean} isUpdate - The `isUpdate` parameter in the `AddDeleteCourseUserAdminApi` function is a
 * boolean value that indicates whether the operation is an update or a delete action. If `isUpdate` is
 * `true`, the function will send a PATCH request to update the user's course information. If `
 * @returns {Object} The function `AddDeleteCourseUserAdminApi` returns the data received from the API call if
 * successful. If there is an error, it returns the response data from the error or the error itself.
 */
export const Add_or_DeleteCourseUserAdminApi = async (
  userid,
  courseid,
  isUpdate
) => {
  try {
    const config = new AxiosConfig();

    if (isUpdate) {
      const { data } = await axiosInstance.patch(
        `${URLConstant}/user/users/${userid}`,
        { courseid },
        config.getConfig()
      );
      return data;
    } else {
      config.addConfig("data", { courseid });
      const { data } = await axiosInstance.delete(
        `${URLConstant}/user/users/${userid}`,
        config.getConfig()
      );
      return data;
    }
  } catch (error) {
    return error?.response?.data || error;
  }
};
