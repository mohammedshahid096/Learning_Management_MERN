import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CourseTimeline from "../../../components/admin/courses/CourseTimeline";
import {
  CourseContent,
  CourseInformation,
  CourseOptions,
  CoursePreview,
} from "../../../components/admin/courses/AddCourseComp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCategoriesList,
  GetSingleCourseDetail,
  AdminGetCourseList,
} from "../../../Redux/actions/course.action";
import { Button } from "flowbite-react";
import { CreateCourseApi, UpdateCourseApi } from "../../../Apis/course.api";
import toast from "react-hot-toast";
import MetaData from "../../../utils/MetaData";

const CreateCourse = () => {
  // ### react router dom
  const { courseId } = useParams();

  // ### usestates
  const [ActiveTimeLine, setActiveTimeLine] = useState(1);
  const [courseInfo, setcourseInfo] = useState({
    playlistid: "",
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "Beginner",
    demorurl: "",
    thumbnail: "",
  });
  const [benefits, setbenefits] = useState([{ title: "" }]);
  const [prerequisites, setprerequisites] = useState([{ title: "" }]);
  const [selectedCategories, setselectedCategories] = useState([]);
  const [isReadOnly, setisReadOnly] = useState(courseId ? true : false);
  const [actionLoading, setactionLoading] = useState(false);

  // ### redux
  const dispatch = useDispatch();
  const { SingleCourse, categories } = useSelector(
    (state) => state.AdminCourseState
  );

  // ### functions
  const fetchSingleCourseDetail = () => {
    dispatch(GetSingleCourseDetail(courseId));
  };

  const fetchCategoryList = () => {
    dispatch(GetCategoriesList(false));
  };

  const updateStateFunction = () => {
    setcourseInfo({
      playlistid: SingleCourse?.courseDetail?.playlistid,
      name: SingleCourse?.courseDetail?.name,
      description: SingleCourse?.courseDetail?.description,
      price: SingleCourse?.courseDetail?.price,
      estimatedPrice: SingleCourse?.courseDetail?.estimatedprice,
      tags: SingleCourse?.courseDetail?.tags,
      level: SingleCourse?.courseDetail?.level,
      demorurl: SingleCourse?.courseDetail?.demoUrl,
      thumbnail: SingleCourse?.courseDetail?.thumbnail?.url,
      rating: SingleCourse?.courseDetail?.rating,
    });

    let updateBenifts = SingleCourse?.courseDetail?.benefits.map((item) => ({
      title: item.title,
    }));
    setbenefits(updateBenifts);
    let updatePrerequsites = SingleCourse?.courseDetail?.prerequsites.map(
      (item) => ({ title: item.title })
    );
    setprerequisites(updatePrerequsites);
    let updateCategories = SingleCourse?.courseDetail?.categories.map(
      (item) => ({ value: item._id, label: item.name })
    );
    setselectedCategories(updateCategories);
  };

  const createNewCoureSubmitHandler = async () => {
    setactionLoading(true);
    const details = {
      playlistid: courseInfo?.playlistid,
      price: courseInfo?.price,
      estimatedprice: courseInfo?.estimatedPrice,
      tags: courseInfo?.tags,
      level: courseInfo?.level,
      benefits: benefits.map((item) => ({ title: item?.title })),
      prerequsites: prerequisites.map((item) => ({ title: item?.title })),
    };
    const response = await CreateCourseApi(details);
    if (response.success) {
      toast.success("successfully a new course is added");
      dispatch(AdminGetCourseList(false));
    } else {
      toast.error(response.message);
    }
    setactionLoading(false);
  };

  const updateCourseSubmitHandler = async () => {
    setactionLoading(true);
    const details = {
      name: courseInfo?.name,
      description: courseInfo?.description,
      price: courseInfo?.price,
      estimatedprice: courseInfo?.estimatedPrice,
      tags: courseInfo?.tags,
      level: courseInfo?.level,
      demourl: courseInfo?.demorurl,
      categories: selectedCategories.map((item) => item.value),
      benefits: benefits.map((item) => ({ title: item?.title })),
      prerequsites: prerequisites.map((item) => ({ title: item?.title })),
    };
    const response = await UpdateCourseApi(courseId, details);
    if (response.success) {
      toast.success("successfully a new course is added");
      setisReadOnly(true);
      fetchSingleCourseDetail();
    } else {
      toast.error(response.message);
    }
    setactionLoading(false);
  };

  // ### useeffects
  useEffect(() => {
    if (courseId && SingleCourse?.courseDetail?._id !== courseId) {
      fetchSingleCourseDetail();
    }
    if (SingleCourse) {
      updateStateFunction();
    }
    if (!categories) {
      fetchCategoryList();
    }
  }, [courseId, SingleCourse?.courseDetail?._id, categories]);

  return (
    <AdminLayout>
      <MetaData
        title={
          courseId
            ? `Admin- ${SingleCourse?.courseDetail?.name}`
            : "Admin- Create Course"
        }
      />
      <div className="flex w-full h-full gap-3 max-md:flex-col-reverse">
        <div className="w-10/12 max-md:w-full">
          <div>
            {courseId &&
              ActiveTimeLine !== 3 &&
              (!isReadOnly ? (
                <Button color="red" onClick={() => setisReadOnly(true)}>
                  Cancel Edit
                </Button>
              ) : (
                <Button onClick={() => setisReadOnly(false)}>
                  Edit Course
                </Button>
              ))}
          </div>
          {ActiveTimeLine === 1 && (
            <CourseInformation
              courseInfo={courseInfo}
              setcourseInfo={setcourseInfo}
              setActiveTimeLine={setActiveTimeLine}
              categories={categories}
              selectedCategories={selectedCategories}
              setselectedCategories={setselectedCategories}
              isReadOnly={isReadOnly}
            />
          )}
          {ActiveTimeLine === 2 && (
            <CourseOptions
              setActiveTimeLine={setActiveTimeLine}
              benefits={benefits}
              setbenefits={setbenefits}
              prerequisites={prerequisites}
              setprerequisites={setprerequisites}
              isReadOnly={isReadOnly}
            />
          )}
          {ActiveTimeLine === 3 && courseId && (
            <CourseContent
              setActiveTimeLine={setActiveTimeLine}
              isReadOnly={isReadOnly}
            />
          )}
          {ActiveTimeLine === 4 && (
            <CoursePreview
              isReadOnly={isReadOnly}
              setActiveTimeLine={setActiveTimeLine}
              courseInfo={courseInfo}
              benefits={benefits}
              prerequisites={prerequisites}
              categories={categories}
              selectedCategories={selectedCategories}
              createNewCoureSubmitHandler={createNewCoureSubmitHandler}
              updateCourseSubmitHandler={updateCourseSubmitHandler}
              actionLoading={actionLoading}
            />
          )}
        </div>

        <div className="w-2/12 relative max-md:w-full">
          <CourseTimeline ActiveTimeLine={ActiveTimeLine} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCourse;
