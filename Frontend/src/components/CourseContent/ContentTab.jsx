import React, { useContext } from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { ContentCourseDataStore } from "../../pages/Course/CourseContentData";
import Questions from "./Questions";
import Review from "./Review";

const ContentTab = () => {
  const { courseContentData } = useContext(ContentCourseDataStore);
  return (
    <div className="overflow-x-auto">
      <Tabs aria-label="Full width tabs" style="fullWidth">
        <Tabs.Item title="Overview" icon={HiUserCircle}>
          <div>
            {" "}
            <span className=" font-poppins whitespace-break-spaces">
              {courseContentData?.coursesData?.description}
            </span>{" "}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Resources" icon={MdDashboard}>
          Resources
        </Tabs.Item>
        <Tabs.Item active title="Questions" icon={HiAdjustments}>
          <Questions />
        </Tabs.Item>
        <Tabs.Item title="Review" icon={HiClipboardList}>
          <Review />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default ContentTab;
