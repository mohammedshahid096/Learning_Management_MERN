import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import CourseTimeline from "../../components/admin/courses/CourseTimeline";
import {
  CourseInformation,
  CourseOptions,
} from "../../components/admin/courses/AddCourseComp";

const CreateCourse = () => {
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

  return (
    <AdminLayout>
      <div className="flex w-full h-full gap-3 max-md:flex-col-reverse">
        <div className="w-10/12 max-md:w-full">
          {ActiveTimeLine === 1 && (
            <CourseInformation
              courseInfo={courseInfo}
              setcourseInfo={setcourseInfo}
              setActiveTimeLine={setActiveTimeLine}
            />
          )}
          {ActiveTimeLine === 2 && (
            <CourseOptions
              setActiveTimeLine={setActiveTimeLine}
              benefits={benefits}
              setbenefits={setbenefits}
              prerequisites={prerequisites}
              setprerequisites={setprerequisites}
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
