import { Timeline } from "flowbite-react";
import {
  BsRecordCircleFill,
  BsRecordCircle,
  BsRecordFill,
  BsRecord,
} from "react-icons/bs";

const TimeLineItems = [
  { num: 1, title: "Course Information" },
  { num: 2, title: "Course Options" },
  { num: 3, title: "Course Content" },
  { num: 4, title: "Course Preview" },
];
const CourseTimeline = ({ ActiveTimeLine }) => {
  return (
    <Timeline className="fixed max-md:relative">
      {TimeLineItems.map((singleTimeLine) => (
        <Timeline.Item key={singleTimeLine.num}>
          <Timeline.Point
            icon={
              ActiveTimeLine >= singleTimeLine.num ? BsRecordCircleFill : null
            }
          />
          <Timeline.Content>
            <Timeline.Title>{singleTimeLine.title}</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default CourseTimeline;
