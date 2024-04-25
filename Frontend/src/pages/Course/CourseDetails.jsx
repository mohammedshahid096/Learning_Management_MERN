import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { List, Card, Button } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

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

  return loading ? null : (
    <div className="p-10 grid grid-cols-2 gap-3">
      <div>
        <div>
          <h3 className="font-bold text-2xl">
            {singleCourseDetails?.courseDetail?.price} ₹{" "}
            <sup className=" line-through">
              {singleCourseDetails?.courseDetail?.estimatedprice}₹
            </sup>{" "}
            <span className=" text-red-600">
              {parseInt(
                ((singleCourseDetails?.courseDetail?.estimatedprice -
                  singleCourseDetails?.courseDetail?.price) /
                  singleCourseDetails?.courseDetail?.estimatedprice) *
                  100
              )}
              % Off
            </span>
          </h3>
        </div>

        <div>
          <Button color="failure" pill>
            Buy Now {singleCourseDetails?.courseDetail?.price} ₹
          </Button>
        </div>

        <div>
          {" "}
          <pre className=" whitespace-break-spaces">
            {singleCourseDetails?.courseDetail?.description}
          </pre>{" "}
        </div>
        <div>
          <h2 className="font-semibold text-2xl mb-2">
            What are the benefits for students in this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.benefits?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-2xl">
            What are the prerequisites for students in this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.prerequsites?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <div>
        <div>
          <h2 className="font-semibold text-2xl mb-2">
            What are the benefits for students in this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.benefits?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-2xl">
            What are the prerequisites for students in this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.prerequsites?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
