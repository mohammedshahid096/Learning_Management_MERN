import React, { useEffect } from "react";
import { Button, Card, Tooltip } from "flowbite-react";
import RatingComponent from "../../utils/RatingComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeCourseListAction } from "../../Redux/actions/course.action";
import { PiStudent } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";

const Skeleton = () => {
  return (
    <div role="status">
      <Card className="max-sm:justify-center">
        <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1 m-auto"></div>
        <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-3/5 rounded-md mb-1 m-auto"></div>

        <div className="flex items-baseline mt-4 max-sm:flex-col max-sm:gap-3">
          {Array.from({ length: 5 }, (v, i) => i).map((item) => (
            <div
              key={item}
              className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700 max-sm:m-auto"
            >
              <div className="h-40 bg-gray-200  dark:bg-gray-500 w-full mb-2"></div>
              <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-2 m-auto"></div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500 rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
              </div>
              <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-2 m-auto"></div>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500 rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
              </div>

              <br />

              <div className="h-6 bg-gray-200 w-11/12 m-auto dark:bg-gray-500  rounded-full mb-2"></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const HomeCourseList = () => {
  const navigate = useNavigate();

  // ### redux
  const dispatch = useDispatch();
  const { loading, courses } = useSelector((state) => state.HomeCourseState);
  const { user } = useSelector((state) => state.AuthState);

  // functions
  const fetchCoursesList = () => {
    dispatch(HomeCourseListAction());
  };

  const redirectToCoursePage = (courseId) => {
    const isAlreadyEnroll =
      user?.courses.find((item) => item === courseId) || null;

    if (isAlreadyEnroll || user?.role === "admin" || user?.role === "teacher") {
      navigate(`/course-access/${courseId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  // useeffects
  useEffect(() => {
    if (!courses) {
      fetchCoursesList();
    }
  }, []);

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <h4 className="text-center my-4 font-bold text-2xl">Latest Courses :</h4>
      <div className="flex gap-5 overflow-auto w-[95%] m-auto max-sm:flex-col max-sm:w-full">
        {courses?.slice(0, 6).map((singleCourse) => (
          <div key={singleCourse?._id} className="max-sm:cardMobileStyle">
            <Card
              key={singleCourse?._id}
              className="w-[300px] h-[415px] overflow-auto"
              imgAlt={singleCourse?.course?.name}
              imgSrc={singleCourse?.course?.thumbnail?.url}
            >
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center underline">
                {singleCourse?.course?.name}
              </h5>
              <div className="flex justify-between">
                <p>Level :</p> <p>{singleCourse?.course?.level}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  <RatingComponent
                    rating={singleCourse?.course?.rating}
                    NumberRating={false}
                  />
                </span>

                <p className="text-sm inline-flex gap-1 items-center">
                  <PiStudent />
                  <span className=" text-slate-400 font-bold">
                    {singleCourse?.course?.purchase}
                  </span>{" "}
                  Students
                </p>
              </div>

              <div className="flex justify-between">
                <p>
                  <span className=" line-through">
                    {singleCourse?.course?.estimatedprice}₹{" "}
                  </span>
                  <sup> {singleCourse?.course?.price}₹</sup>{" "}
                </p>{" "}
                <p className="text-sm inline-flex gap-1 items-center">
                  <FaListUl />
                  <span className="text-slate-400 font-bold">
                    {singleCourse?.coursesData?.length}
                  </span>{" "}
                  Lectures
                </p>
              </div>

              <Button
                color="green"
                pill
                className="w-full"
                onClick={() => redirectToCoursePage(singleCourse?._id)}
              >
                <Tooltip content="Redirect to the course details page">
                  Course Details
                </Tooltip>
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeCourseList;
