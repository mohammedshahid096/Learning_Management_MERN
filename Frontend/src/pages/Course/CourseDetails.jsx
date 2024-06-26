import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorHomeCourseState,
  HomeSingleCourseAction,
} from "../../Redux/actions/course.action";
import toast from "react-hot-toast";
import { List, Accordion, Button, Card, Rating, Toast } from "flowbite-react";
import { HiCheckCircle, HiFire } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import RatingComponent from "../../utils/RatingComponent";
import { PiMonitorPlayBold } from "react-icons/pi";
import CustomLoader from "../../utils/Loader";
import { openLoginAccount } from "../../Redux/reducers/user.reducer";
import { CreateRazorPayOrderAPI } from "../../Apis/payment.api";
import { URLConstant } from "../../config/URLConstant";
import { CreateCourseOrderAPI } from "../../Apis/order.api";
import MetaData from "../../utils/MetaData";
import { PiStudent } from "react-icons/pi";
import { GetRelatedCourseDataApi } from "../../Apis/course.api";
import { UserDetailProfileAction } from "../../Redux/actions/auth.action";
import CustomSpeedDail from "../../utils/SpeedDial";

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

const RelatedCourses = ({ id }) => {
  const [relatedData, setrelatedData] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthState);

  const fetchRelatedCategoryData = async () => {
    let update = id?.map((item) => item._id).join(",");
    const response = await GetRelatedCourseDataApi(update);
    if (response.success) {
      setrelatedData(response.data);
    }
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

  useEffect(() => {
    if (id) {
      fetchRelatedCategoryData();
    }
  }, [id]);
  return (
    <div className="flex gap-5 overflow-auto w-[95%] m-auto max-sm:flex-col max-sm:w-full">
      {relatedData?.slice(0, 6).map((singleCourse) => (
        <div key={singleCourse?._id} className="max-sm:m-auto">
          <Card
            key={singleCourse?._id}
            className="w-[300px] max-sm:w-full h-[415px] overflow-auto"
            imgAlt={singleCourse?.name}
            imgSrc={singleCourse?.thumbnail?.url}
          >
            <h5 className="truncate text-wrap text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center underline">
              {singleCourse?.name}
            </h5>
            <div className="flex justify-between">
              <p>Level :</p> <p>{singleCourse?.level}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                <RatingComponent
                  rating={singleCourse?.rating}
                  NumberRating={false}
                />
              </span>

              <p className="text-sm inline-flex gap-1 items-center">
                <PiStudent />
                <span className=" text-slate-400 font-bold">
                  {singleCourse?.purchase}
                </span>{" "}
                Students
              </p>
            </div>

            <div className="flex justify-between">
              <p>
                <span className="line-through">
                  {singleCourse?.estimatedprice}₹{" "}
                </span>
                <sup className="text-red-500"> {singleCourse?.price}₹</sup>{" "}
              </p>{" "}
            </div>

            <Button
              color="green"
              pill
              className="w-full"
              onClick={() => redirectToCoursePage(singleCourse?._id)}
            >
              Buy for {singleCourse?.price} ₹
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};

const CourseDetails = () => {
  // # react-router-dom
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // usesstates
  const [verifingCourse, setverifingCourse] = useState(false);
  const [ratingPercentage, setratingPercentage] = useState([]);

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

  const purchaseCourseHandler = async () => {
    if (!user) {
      dispatch(openLoginAccount());
    } else if (user?.courses.find((item) => item === courseId)) {
      navigate(`/course-access/${courseId}`);
    } else {
      const details = {
        amount: singleCourseDetails?.courseDetail?.price,
        courseid: courseId,
      };
      const response = await CreateRazorPayOrderAPI(details);
      if (response.success) {
        const options = {
          key: import.meta.env.VITE_RAZOPAY_KEY, // Enter the Key ID generated from the Dashboard
          amount: response.data.orderInfo.amount, // Amount is in currency subunits.
          currency: "INR",
          name: "Mohammed Shahid",
          description: "Test Transaction",
          image:
            "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png",
          order_id: response.data.orderInfo.id,
          callback_url: `${URLConstant}/payment/verify`,
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorPayInstance = new window.Razorpay(options);
        razorPayInstance.open();
      } else {
        toast.error(response.message);
      }
    }
  };

  const addCoursePurchaseHandler = async () => {
    const details = {
      order_id: searchParams.get("order_id"),
      uuid: searchParams.get("uuid"),
    };
    const response = await CreateCourseOrderAPI(details);
    if (response.success) {
      dispatch(UserDetailProfileAction());
      toast.success(response.message);
      setSearchParams({});
      navigate(`/course-access/${courseId}`);
    } else {
      toast.error(response.message);
    }
    setverifingCourse(false);
  };

  // # useeffects
  useEffect(() => {
    const isAlreadyEnroll =
      user?.courses.find((item) => item === courseId) || null;

    if (isAlreadyEnroll || user?.role === "admin" || user?.role === "teacher") {
      navigate(`/course-access/${courseId}`);
    } else if (courseId !== singleCourseDetails?.courseDetail?._id) {
      fetchCourseDetails();
    }
  }, [courseId, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
  }, [error]);

  useEffect(() => {
    if (searchParams.get("order_id") && searchParams.get("uuid")) {
      toast.success("payment is done successfully");
      setverifingCourse(true);
      addCoursePurchaseHandler();
    }
  }, [searchParams]);

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

  // component constant
  const ratingDetail = ratingPercentage.map((item) => (
    <Rating.Advanced percentFilled={item.percentage} className="mb-2">
      {item.rating} star
    </Rating.Advanced>
  ));

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <>
      <MetaData title={singleCourseDetails?.courseDetail?.name} />
      <div className="p-10 flex gap-10 max-md:flex-col-reverse max-sm:p-0">
        <div className=" w-3/5 max-md:w-full max-md:p-7">
          <div className="absolute top-3 left-1/3 max-sm:left-2">
            {/* <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                <HiFire className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                SuccessFull UPI Payment :
                <p className="text-green-500 font-bold text-center">
                  success@razorpay
                </p>{" "}
              </div>
              <Toast.Toggle />
            </Toast> */}
          </div>
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
                <List.Item icon={HiCheckCircle} key={item._id}>
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
                <List.Item icon={HiCheckCircle} key={item._id}>
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

          <br />
          <div>
            <RatingComponent
              rating={singleCourseDetails?.courseDetail?.rating}
            />
            <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              {singleCourseDetails?.courseReviews?.length} global ratings
            </p>

            {ratingDetail}
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
            <Button color="failure" pill onClick={purchaseCourseHandler}>
              Buy Now {singleCourseDetails?.courseDetail?.price} ₹
            </Button>
          </div>
        </div>
      </div>
      <div className="px-10 pb-10">
        <h2 className="text-xl font-bold mb-5">Related Category Courses :</h2>
        <RelatedCourses id={singleCourseDetails?.courseDetail?.categories} />
      </div>
      <CustomSpeedDail status={true} />
      <CustomLoader loading={verifingCourse} />
    </>
  );
};

export default CourseDetails;
