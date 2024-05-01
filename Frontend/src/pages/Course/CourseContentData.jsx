import React, { useEffect, useState, createContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { Accordion, Button, Card } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import { PiMonitorPlayBold } from "react-icons/pi";
import CustomLoader from "../../utils/Loader";
import { HiOutlineArrowRight } from "react-icons/hi";
import MetaData from "../../utils/MetaData";
import { GetContentCourseDataApi } from "../../Apis/course.api";
import ContentTab from "../../components/CourseContent/ContentTab";

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

export const ContentCourseDataStore = createContext();

const CourseContentData = () => {
  // # react-router-dom
  const { courseId, courseContentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // usestates
  const [courseContentData, setcourseContentData] = useState(null);
  const [loadingContent, setloadingContent] = useState(false);

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

  function nextObjectCourseIndexData() {
    const arr = singleCourseDetails?.coursesData || [];
    const currentCourseIndex = arr.findIndex(
      (item) => item._id === courseContentId
    );
    const nextIndex = (currentCourseIndex + 1) % arr.length;
    const nextContentCourse = arr[nextIndex];
    return nextContentCourse;
  }

  function previousObjectCourseIndexData() {
    const arr = singleCourseDetails?.coursesData || [];
    const currentCourseIndex = arr.findIndex(
      (item) => item._id === courseContentId
    );
    const nextIndex = (currentCourseIndex - 1) % arr.length;
    const nextContentCourse = arr[nextIndex];
    return nextContentCourse;
  }

  const nextLessonHandler = () => {
    const nextData = nextObjectCourseIndexData();
    const generatePath = location.pathname.replace(
      `/${courseContentId}`,
      `/${nextData?._id}`
    );
    navigate(generatePath);
  };

  const previousLessonHandler = () => {
    const previousData = previousObjectCourseIndexData();
    if (previousData) {
      const generatePath = location.pathname.replace(
        `/${courseContentId}`,
        `/${previousData?._id}`
      );
      navigate(generatePath);
    }
  };

  const customLessonHandler = (id) => {
    const generatePath = location.pathname.replace(
      `/${courseContentId}`,
      `/${id}`
    );
    navigate(generatePath);
  };

  const clearErrorFunction = () => {
    dispatch(ClearErrorHomeCourseState());
    if (statusCode === 404) {
      setTimeout(() => {
        navigate("/courses");
      }, 500);
    }
  };

  const fetchContentCourseDataHandler = async () => {
    setloadingContent(true);
    const response = await GetContentCourseDataApi(courseId, courseContentId);
    if (response.success) {
      setcourseContentData(response.data);
    }
    if (response.statusCode === 404) {
      navigate(`/course/${courseId}`);
    }
    setloadingContent(false);
  };

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
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
  }, [error]);

  useEffect(() => {
    fetchContentCourseDataHandler();
  }, [courseContentId]);

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <>
      <CustomLoader loading={loadingContent} />
      <MetaData
        title={`${singleCourseDetails?.courseDetail?.name}-${courseContentId}`}
      />
      <div className="p-10 flex gap-10 max-md:flex-col max-sm:p-0">
        <div className=" w-4/5 max-md:w-full">
          <h2 className="text-xl font-bold mb-3 max-md:px-5 max-md:py-2">
            {singleCourseDetails?.courseDetail?.name}
          </h2>

          <div className="w-full h-[75vh] max-sm:h-[50vh] bg-black">
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
          <div className="flex justify-between mt-4 max-md:px-5">
            <Button
              color="purple"
              size="md"
              pill
              disabled={
                singleCourseDetails?.coursesData[0]["_id"] === courseContentId
                  ? true
                  : false
              }
              onClick={previousLessonHandler}
            >
              <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
              Previous Lesson
            </Button>
            <Button
              color="purple"
              size="md"
              pill
              onClick={nextLessonHandler}
              disabled={
                singleCourseDetails?.coursesData[
                  singleCourseDetails?.coursesData.length - 1
                ]["_id"] === courseContentId
                  ? true
                  : false
              }
            >
              Next Lesson
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-1/5 max-md:w-full max-md:p-5">
          <div>
            <h2 className="font-semibold text-xl mb-3">Course Overview</h2>
            <Accordion collapseAll className="mt-3">
              <Accordion.Panel>
                <Accordion.Title>
                  {" "}
                  {singleCourseDetails?.courseDetail?.name} Topics
                </Accordion.Title>
                <Accordion.Content className="max-h-[65vh] overflow-y-auto p-0 pt-2">
                  {singleCourseDetails?.coursesData?.map((item) => (
                    <div
                      key={item._id}
                      className={`flex gap-3 items-start px-4 py-1 mb-3 hoverCard ${
                        courseContentId === item._id ? "activehoverCard" : ""
                      }`}
                      onClick={() => customLessonHandler(item._id)}
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

      <ContentCourseDataStore.Provider
        value={{ courseContentData, setcourseContentData }}
      >
        <ContentTab />
      </ContentCourseDataStore.Provider>
    </>
  );
};

export default CourseContentData;
