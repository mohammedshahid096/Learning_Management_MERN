import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { singleCourseDetails, loading, error, statusCode } = useSelector(
    (state) => state.HomeCourseState
  );

  const fetchCourseDetails = () => {
    dispatch(HomeSingleCourseAction(courseId));
  };

  const clearErrorFunction = () => {
    dispatch(ClearErrorHomeCourseState());
    if (statusCode === 404) {
      setTimeout(() => {
        navigate("/courses");
      }, 500);
    }
  };

  useEffect(() => {
    if (courseId !== singleCourseDetails?.courseDetail?._id) {
      fetchCourseDetails();
    }
  }, [courseId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
  }, [error]);

  return <div>CourseDetails</div>;
};

export default CourseDetails;
