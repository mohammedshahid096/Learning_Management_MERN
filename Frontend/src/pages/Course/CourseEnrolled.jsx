import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { Breadcrumb, Accordion, Button, Card, Rating } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import RatingComponent from "../../utils/RatingComponent";
import { PiMonitorPlayBold } from "react-icons/pi";
import CustomLoader from "../../utils/Loader";
import { HiOutlineArrowRight } from "react-icons/hi";
import MetaData from "../../utils/MetaData";

const Skeleton = () => {
  return (
    <div role="status">
      <div className="grid grid-cols-2 gap-3 p-3 max-sm:flex max-sm:flex-col-reverse">
        <Card>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1 m-auto"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-3/5 rounded-md mb-1 m-auto"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
        </Card>
        <Card className="">
          <div className="h-72 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1 m-auto"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
        </Card>
      </div>
    </div>
  );
};

const CourseEnrolled = () => {
  const [ratingPercentage, setratingPercentage] = useState([]);
  // # react-router-dom
  const { courseId } = useParams();
  const navigate = useNavigate();

  // # react redux
  const dispatch = useDispatch();
  const { singleCourseDetails, loading, error, statusCode } = useSelector(
    (state) => state.HomeCourseState
  );
  const { user } = useSelector((state) => state.AuthState);

  // # functions
  function convertTimeString(time) {
    return time
      .replace("minutes", "min")
      .replace("minute", "min")
      .replace("seconds", "sec")
      .replace("second", "sec")
      .replace("hours", "hr")
      .replace("hour", "hr");
  }

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

  // component constant
  const ratingDetail = ratingPercentage.map((item) => (
    <Rating.Advanced percentFilled={item.percentage} className="mb-2">
      {item.rating} star
    </Rating.Advanced>
  ));

  // # useeffects
  useEffect(() => {
    const isAlreadyEnroll =
      user?.courses?.find((item) => item === courseId) || null;

    if (
      (isAlreadyEnroll &&
        courseId !== singleCourseDetails?.courseDetail?._id) ||
      user?.role === "admin" ||
      user?.role === "teacher"
    ) {
      fetchCourseDetails();
    } else if (!isAlreadyEnroll) {
      navigate(`/course/${courseId}`);
    }
  }, [courseId, user]);

  useEffect(() => {
    const ratingArray = singleCourseDetails?.courseReviews || [];
    const totalRatings = ratingArray.length;

    function CalculateRatingCounts(ratings) {
      const RatingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
      for (let i of ratings) {
        RatingCounts[i.rating] = RatingCounts[i.rating] + 1;
      }

      return RatingCounts;
    }

    function CalculateRatingPercentage(RatingCounts) {
      const RatingPercentage = [];
      for (let x in RatingCounts) {
        const count = RatingCounts[x];
        let percentage = (count / totalRatings) * 100;
        if (!percentage) {
          percentage = 0;
        }
        // RatingPercentage[x] = percentage.toFixed(2);
        RatingPercentage.push({
          percentage: Number(percentage.toFixed(2)),
          rating: x,
        });
      }
      return RatingPercentage;
    }

    if (singleCourseDetails?.courseReviews) {
      const RatingCounts = CalculateRatingCounts(ratingArray);
      const RatingPercentage = CalculateRatingPercentage(RatingCounts);
      RatingPercentage.reverse();
      setratingPercentage(RatingPercentage);
    }
  }, [singleCourseDetails?.courseReviews]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
  }, [error]);

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <>
      <MetaData title={singleCourseDetails?.courseDetail?.name} />
      <Breadcrumb
        aria-label="course bread crumb"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          {singleCourseDetails?.courseDetail?.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-5 flex gap-10 max-md:flex-col max-sm:p-0">
        <div className=" w-4/5 max-md:w-full">
          <h2 className="text-xl font-bold mb-3 max-md:px-5 max-md:py-2">
            {singleCourseDetails?.courseDetail?.name}
          </h2>

          <div className="w-full h-[75vh] bg-black max-sm:h-[50vh]">
            <ReactPlayer
              className="rounded-md"
              url={singleCourseDetails?.courseDetail?.demoUrl}
              controls={true}
              loop={false}
              thumbnail={true}
              imgSrc={singleCourseDetails?.courseDetail?.thumbnail?.url}
              width={"100%"}
              height={"100%"}
            />
          </div>

          <div className="flex justify-end mt-4 max-md:px-5">
            <Button
              color="purple"
              size="md"
              pill
              onClick={() => {
                navigate(`${singleCourseDetails?.coursesData[0]["_id"]}`);
              }}
            >
              Let's Start!
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* <br /> */}
        </div>

        <div className="w-1/5 max-md:w-full max-md:p-5">
          <div>
            <h2 className="font-semibold text-xl">Course Overview</h2>
            <Accordion className="border-non mt-3">
              <Accordion.Panel>
                <Accordion.Title>
                  {" "}
                  {singleCourseDetails?.courseDetail?.name} Topics
                </Accordion.Title>
                <Accordion.Content className="max-h-[65vh] overflow-y-auto p-0 pt-2">
                  {singleCourseDetails?.coursesData?.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 items-start px-4 py-1 mb-3 hoverCard"
                    >
                      <div className=" text-[#2acdc6]">
                        <PiMonitorPlayBold size={23} />
                      </div>
                      <div className=" inline-flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-sm">
                          {convertTimeString(
                            item.length.accessibility?.accessibilityData?.label
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="max-md:px-5">
          <h2 className="font-semibold text-2xl mb-2">Course Details</h2>
          <div>
            {" "}
            <span className=" font-poppins whitespace-break-spaces">
              {singleCourseDetails?.courseDetail?.description}
            </span>{" "}
          </div>
        </div>

        <div>
          <RatingComponent rating={singleCourseDetails?.courseDetail?.rating} />
          <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            {singleCourseDetails?.courseReviews?.length} global ratings
          </p>

          {ratingDetail}
        </div>
      </div>
    </>
  );
};

export default CourseEnrolled;
