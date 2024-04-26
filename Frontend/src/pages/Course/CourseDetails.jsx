import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { List, Accordion, Button } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import RatingComponent from "../../utils/RatingComponent";
import { PiMonitorPlayFill, PiMonitorPlayBold } from "react-icons/pi";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { singleCourseDetails, loading, error, statusCode } = useSelector(
    (state) => state.HomeCourseState
  );

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
    <div className="p-10 flex gap-10 max-md:flex-col-reverse max-sm:p-0">
      <div className=" w-3/5 max-md:w-full max-md:p-7">
        <h2 className="text-xl font-bold">
          {singleCourseDetails?.courseDetail?.name}
        </h2>

        <div className="flex justify-between my-3">
          <div>
            <RatingComponent
              rating={singleCourseDetails?.courseDetail?.rating}
            />
          </div>
          <div>{singleCourseDetails?.courseDetail?.purchase} Students</div>
        </div>

        <br />
        <div>
          <h2 className="font-semibold text-2xl mb-2">
            What you will learn from this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.benefits?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center mt-2">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        <br />
        <br />

        <div>
          <h2 className="font-semibold mb-2 text-2xl">
            What are the prerequisites for starting this course?
          </h2>

          <List unstyled>
            {singleCourseDetails?.courseDetail?.prerequsites?.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center mt-2">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        <br />

        <div>
          <h2 className="font-semibold text-2xl mb-2">Course Overview</h2>
          <Accordion collapseAll className="border-non mt-5">
            <Accordion.Panel>
              <Accordion.Title>
                {" "}
                {singleCourseDetails?.courseDetail?.name} Topics
              </Accordion.Title>
              <Accordion.Content>
                {singleCourseDetails?.coursesData?.map((item) => (
                  <div key={item._id} className="flex gap-3 items-start mb-3">
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

      <div className="w-2/5 max-md:w-full">
        <div className="w-full h-72">
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
        <br />
        <div className="max-md:px-5">
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
        <br />

        <div className="max-md:px-5">
          <Button color="failure" pill>
            Buy Now {singleCourseDetails?.courseDetail?.price} ₹
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
