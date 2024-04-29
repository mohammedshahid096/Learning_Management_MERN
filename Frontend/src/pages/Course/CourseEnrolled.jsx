import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { List, Accordion, Button, Card } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import RatingComponent from "../../utils/RatingComponent";
import { PiMonitorPlayBold } from "react-icons/pi";
import CustomLoader from "../../utils/Loader";
import { HiOutlineArrowRight } from "react-icons/hi";
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
    const isAlreadyEnroll = user?.courses.find((item) => item === courseId);
    if (isAlreadyEnroll) {
      dispatch(HomeSingleCourseAction(courseId));
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const clearErrorFunction = () => {
    dispatch(ClearErrorHomeCourseState());
    if (statusCode === 404) {
      setTimeout(() => {
        navigate("/courses");
      }, 500);
    }
  };

  // # useeffects
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

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <>
      <div className="p-10 flex gap-10 max-md:flex-col-reverse max-sm:p-0">
        <div className=" w-4/5 max-md:w-full max-md:p-7">
          <h2 className="text-xl font-bold mb-3">
            {singleCourseDetails?.courseDetail?.name}
          </h2>

          <div className="w-full h-[75vh]">
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
          <div className="flex justify-end mt-4">
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

          <br />
          <div>
            <h2 className="font-semibold text-2xl mb-2">Course Details</h2>
            <div>
              {" "}
              <span className=" font-poppins whitespace-break-spaces">
                {singleCourseDetails?.courseDetail?.description}
              </span>{" "}
            </div>
          </div>
        </div>

        <div className="w-1/5 max-md:w-full">
          <div>
            <h2 className="font-semibold text-2xl mb-2">Course Overview</h2>
            <Accordion collapseAll className="border-non mt-5">
              <Accordion.Panel>
                <Accordion.Title>
                  {" "}
                  {singleCourseDetails?.courseDetail?.name} Topics
                </Accordion.Title>
                <Accordion.Content className="max-h-[63vh] overflow-y-auto p-0 pt-2">
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
    </>
  );
};

export default CourseEnrolled;
