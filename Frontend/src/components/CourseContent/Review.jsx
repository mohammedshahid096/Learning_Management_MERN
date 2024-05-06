import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Avatar, Button, Textarea, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddReviewApi,
  AddReviewReplyAdminApi,
} from "../../Apis/question_review.api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import { MdVerified, MdOutlineVerified } from "react-icons/md";
import { ReviewRefreshAction } from "../../Redux/actions/course.action";
import CustomLoader from "../../utils/Loader";

const AdminReplyMessage = ({ id, courseId }) => {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const submitReplyMessageHandler = async () => {
    setloading(true);
    const response = await AddReviewReplyAdminApi({ reply: message }, id);
    if (response.success) {
      toast.success(response.message);
      dispatch(ReviewRefreshAction(courseId));
      setloading(false);
      setmessage("");
    } else {
      toast.error(response.message);
    }

    setloading(false);
  };
  return (
    <>
      <div className="flex w-full gap-2">
        <TextInput
          placeholder="enter the text"
          className="w-full"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <Button
          disabled={message === "" || loading ? true : false}
          onClick={submitReplyMessageHandler}
        >
          Send
        </Button>
      </div>
      <CustomLoader loading={loading} />
    </>
  );
};

const Review = () => {
  // react router dom
  const { courseId } = useParams();

  // # usestates
  const [rating, setRating] = useState(0);
  const [reviewMessage, setreviewMessage] = useState("");
  const [loading, setloading] = useState(false);

  // # redux store
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthState);
  const { singleCourseDetails } = useSelector((state) => state.HomeCourseState);

  // # funtions
  const handleRating = (rate) => {
    setRating(rate);
  };

  const SubmitReviewHandler = async () => {
    setloading(true);
    const details = {
      rating,
      courseid: courseId,
      review: reviewMessage,
    };
    const response = await AddReviewApi(details, courseId);
    if (response.success) {
      toast.success(response.message);
      setRating(0);
      setreviewMessage("");
      dispatch(ReviewRefreshAction(courseId));
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  return (
    <>
      {!singleCourseDetails?.courseReviews?.find(
        (item) => item?.user?._id === user._id
      ) && (
        <div className="flex space-x-4 w-full p-5">
          <div className="shrink-0">
            <Avatar
              img={user?.profile?.url}
              alt={user?.name}
              rounded
              bordered
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
              Give A Rating
            </p>
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRating}
              size={25}
            />
            <div className="pr-5 mt-1">
              <Textarea
                placeholder="Write Your Question..."
                required
                rows={3}
                value={reviewMessage}
                onChange={(e) => setreviewMessage(e.target.value)}
              />

              <div className="flex justify-end mt-3">
                <Button
                  color="yellow"
                  onClick={SubmitReviewHandler}
                  disabled={rating === 0 || loading ? true : false}
                  isProcessing={loading}
                  pill
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {singleCourseDetails?.courseReviews?.map((singleReview) => (
        <div className="flex space-x-4 mt-2">
          <div className="shrink-0">
            <Avatar
              img={singleReview?.user?.profile?.url}
              alt={singleReview?.user?.name}
              rounded
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
              {singleReview?.user?.name}
              {singleReview?.user?.role === "admin" && (
                <span className=" text-green-500">
                  <MdVerified />
                </span>
              )}
              {singleReview?.user?.role === "teacher" && (
                <span className=" text-cyan-400">
                  <MdOutlineVerified />
                </span>
              )}
            </p>
            <div className="text-sm text-gray-500 font-bold dark:text-gray-400">
              <ReactStars
                value={singleReview?.rating}
                isHalf={true}
                edit={false}
              />
            </div>
            <p className="text-sm text-gray-500 font-bold dark:text-gray-400">
              {singleReview?.review}
            </p>
            <p className="truncate text-[12px] text-gray-300 dark:text-gray-500 mb-1">
              {format(singleReview?.createdAt)} -
            </p>

            {singleReview?.reply && (
              <div className="flex space-x-4 mt-2">
                <div className="shrink-0">
                  <Avatar
                    img={singleReview?.reply?.replyBy?.profile?.url}
                    alt={singleReview?.reply?.replyBy?.name}
                    rounded
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
                    {singleReview?.reply?.replyBy?.name}
                    {singleReview?.reply?.replyBy?.role === "admin" && (
                      <span className=" text-green-500">
                        <MdVerified />
                      </span>
                    )}
                    {singleReview?.user?.role === "teacher" && (
                      <span className=" text-cyan-400">
                        <MdOutlineVerified />
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 font-bold dark:text-gray-400">
                    {singleReview?.reply?.message}
                  </p>
                </div>
              </div>
            )}

            {user?.role === "admin" && !singleReview?.reply && (
              <AdminReplyMessage id={singleReview?._id} courseId={courseId} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Review;
