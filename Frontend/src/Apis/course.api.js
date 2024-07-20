import axios from "axios";
import { URLConstant } from "../config/URLConstant";
import axiosInstance, { AxiosConfig } from "../config/axiosInstance";
/**
 * The function CreateCourseApi sends a POST request to upload course details to a specific URL with
 * axiosInstance and returns the response data.
 * @param {Object} Details - The `Details` parameter in the `CreateCourseApi` function likely contains the
 * information needed to create a new course. This information could include details such as the course
 * title, description, instructor information, course duration, pricing, and any other relevant data
 * required to create a course. This data is sent
 * @returns The `CreateCourseApi` function is returning the data received from the POST request to the
 * specified URL (`/course/uploadCourse`) with the provided `Details` payload. If the
 * request is successful, it returns the `data` from the response. If there is an error, it returns the
 * error response data or the error itself.
 */

export const CreateCourseApi = async (Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.post(
      `${URLConstant}/course/uploadCourse`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * The UpdateCourseApi function sends a PUT request to update course details using axiosInstance with
 * error handling.
 * @param {String} courseid - The `courseid` parameter is the unique identifier of the course that you want to
 * update. It is used to specify which course's details should be updated in the database.
 * @param {Object} Details - Details is an object containing the updated details of a course. It may include
 * properties such as course title, description, instructor, duration, etc.
 * @returns The UpdateCourseApi function returns the data received from the PUT request to update a
 * course, or an error response if there is an error during the request.
 */
export const UpdateCourseApi = async (courseid, Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.put(
      `${URLConstant}/course/single/${courseid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * The function `UpdateCourseDataApi` sends a PUT request to update course data with the provided
 * details and returns the response data or error.
 * @param {String} courseid - The `courseid` parameter is the unique identifier of the course for which you
 * want to update the data. It is used to specify which course's data you are updating in the API
 * call.
 * @param {Objecte} Details - The `Details` parameter in the `UpdateCourseDataApi` function likely contains the
 * updated information or details of the course that you want to update. This information could
 * include things like the course title, description, instructor details, schedule, or any other
 * relevant data associated with the course.
 * @returns The function `UpdateCourseDataApi` is returning the data received from the API call if
 * successful. If there is an error, it will return the response data from the error, or the error
 * object itself.
 */
export const UpdateCourseDataApi = async (courseid, Details) => {
  try {
    const config = new AxiosConfig();

    const { data } = await axiosInstance.put(
      `${URLConstant}/course/coursedata/single/${courseid}`,
      Details,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

/**
 * The DeleteCourseApi function sends a DELETE request to delete a course with the specified course ID.
 * @param {String} courseid - The `courseid` parameter is the unique identifier of the course that you want to
 * delete from the API.
 * @returns The `DeleteCourseApi` function is returning the data received from the DELETE request to
 * the specified URL (`/course/single/`) if the request is successful. If
 * there is an error, it will return the response data from the error object or the error itself.
 */
export const DeleteCourseApi = async (courseid) => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.delete(
      `${URLConstant}/course/single/${courseid}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const GetContentCourseDataApi = async (courseid, contentid) => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axiosInstance.get(
      `${URLConstant}/course/course-single-content/${courseid}/${contentid}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const GetRelatedCourseDataApi = async (categoryid) => {
  try {
    const config = new AxiosConfig();
    config.removeContentType();

    const { data } = await axios.get(
      `${URLConstant}/course/related?category=${categoryid}`,
      config.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
