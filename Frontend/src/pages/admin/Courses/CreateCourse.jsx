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
import { GetSingleCourseDetail } from "../../../Redux/actions/course.action";
import { Button } from "flowbite-react";
const CreateCourse = () => {
  // ### usestates
  const [ActiveTimeLine, setActiveTimeLine] = useState(1);
  const [courseInfo, setcourseInfo] = useState({
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
  const [isReadOnly, setisReadOnly] = useState(true);

  // ### react router dom
  const { courseId } = useParams();

  // ### redux
  const dispatch = useDispatch();
  const { SingleCourse } = useSelector((state) => state.AdminCourseState);

  const fetchSingleCourseDetail = () => {
    dispatch(GetSingleCourseDetail(courseId));
  };
  const updateStateFunction = () => {
    setcourseInfo({
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
  };

  useEffect(() => {
    if (courseId && SingleCourse?.courseDetail?._id !== courseId) {
      fetchSingleCourseDetail();
    }
    if (SingleCourse) {
      updateStateFunction();
    }
  }, [courseId, SingleCourse?.courseDetail?._id]);

  return (
    <AdminLayout>
      <div className="flex w-full h-full gap-3 max-md:flex-col-reverse">
        <div className="w-10/12 max-md:w-full">
          <div>
            {!isReadOnly ? (
              <Button color="red" onClick={() => setisReadOnly(true)}>
                Cancel Edit
              </Button>
            ) : (
              <Button onClick={() => setisReadOnly(false)}>Edit Course</Button>
            )}
          </div>
          {ActiveTimeLine === 1 && (
            <CourseInformation
              courseInfo={courseInfo}
              setcourseInfo={setcourseInfo}
              setActiveTimeLine={setActiveTimeLine}
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
              setActiveTimeLine={setActiveTimeLine}
              courseInfo={courseInfo}
              benefits={benefits}
              prerequisites={prerequisites}
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
