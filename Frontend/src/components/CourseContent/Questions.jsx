import React, { useContext, useState, useEffect } from "react";
import { ContentCourseDataStore } from "../../pages/Course/CourseContentData";
import { useSelector } from "react-redux";
import { Avatar, Button, Textarea, TextInput } from "flowbite-react";
import { format } from "timeago.js";
import { FaRegMessage } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdVerified, MdOutlineVerified, MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  AddAnswerApi,
  AddQuestionApi,
  DeleteQuestionApi,
} from "../../Apis/question_review.api";
import toast from "react-hot-toast";
import { GetContentCourseDataApi } from "../../Apis/course.api";
import CustomModal from "../../utils/CustomModal";
import { animate, motion } from "framer-motion";

const SingleQuestionsComponent = ({ singleData }) => {
  // # react router dom
  const { courseId, courseContentId } = useParams();

  // # react redux
  const { setcourseContentData } = useContext(ContentCourseDataStore);
  const { user } = useSelector((state) => state.AuthState);

  // # usestates
  const [isOpen, setisOpen] = useState(false);
  const [isReply, setisReply] = useState(false);
  const [answerState, setanswerState] = useState("");
  const [answerLoading, setanswerLoading] = useState(false);

  // # functions
  const AllRepliesToggleFun = (EmptyReplies = false) => {
    if (EmptyReplies) {
      setisReply(!isReply);
    } else {
      setisOpen(!isOpen);
      setisReply(!isReply);
    }
  };

  const fetchContentCourseData = async () => {
    const response = await GetContentCourseDataApi(courseId, courseContentId);
    if (response.success) {
      setcourseContentData(response.data);
    }
  };
  const SubmitAnswerHandler = async () => {
    setanswerLoading(true);
    const details = {
      answer: answerState,
      courseid: courseId,
    };
    const response = await AddAnswerApi(details, singleData?._id);
    if (response.success) {
      toast.success(response.message);
      setanswerState("");
      fetchContentCourseData();
      setisOpen(true);
    } else {
      toast.error(response.message);
    }
    setanswerLoading(false);
  };

  return (
    <div>
      <div className="flex gap-3 p-5">
        <div className="flex space-x-4 w-full">
          <div className="shrink-0">
            <Avatar
              img={singleData?.askedBy?.profile?.url}
              alt={singleData?.askedBy?.name}
              rounded
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
              {singleData?.askedBy?.name}
              {singleData?.askedBy?.role === "admin" && (
                <span className=" text-green-500">
                  <MdVerified />
                </span>
              )}
              {singleData?.askedBy?.role === "teacher" && (
                <span className=" text-cyan-400">
                  <MdOutlineVerified />
                </span>
              )}
            </p>
            <p className="truncate text-sm text-gray-500 font-bold dark:text-gray-400">
              {singleData?.question}
            </p>
            <p className="truncate text-[12px] text-gray-300 dark:text-gray-500 mb-1">
              {format(singleData?.createdAt)} -
            </p>
            <div className="truncate text-sm text-gray-300 dark:text-gray-500 flex gap-2 items-center mb-2">
              <p
                className="cursor-pointer"
                onClick={() =>
                  AllRepliesToggleFun(
                    singleData?.answers?.length === 0 ? true : false
                  )
                }
              >
                {isOpen
                  ? "Hide Replies"
                  : singleData?.answers?.length === 0
                  ? "Add Reply"
                  : "All Replies"}
              </p>
              <p className="flex gap-1 items-center">
                <FaRegMessage /> {singleData?.answers?.length}
              </p>
            </div>

            {isOpen &&
              singleData?.answers?.map((singleAnswer) => (
                <div className="flex space-x-4">
                  <div className="shrink-0">
                    <Avatar
                      img={singleAnswer?.answerBy?.profile?.url}
                      alt={singleAnswer?.answerBy?.name}
                      rounded
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
                      {singleAnswer?.answerBy?.name}
                      {singleAnswer?.answerBy?.role === "admin" && (
                        <span className=" text-green-500">
                          <MdVerified />
                        </span>
                      )}
                      {singleAnswer?.answerBy?.role === "teacher" && (
                        <span className=" text-cyan-400">
                          <MdOutlineVerified />
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 font-bold dark:text-gray-400">
                      {singleAnswer?.ans}
                    </p>
                    <p className="truncate text-[12px] text-gray-300 dark:text-gray-500 mb-1">
                      {format(singleAnswer?.answerOn)} -
                    </p>
                  </div>
                </div>
              ))}
            {isReply && (
              <div className="w-full flex gap-2 mt-2 max-sm:flex-col">
                <TextInput
                  placeholder="Enter Your Ans.."
                  className="w-full"
                  value={answerState}
                  onChange={(e) => setanswerState(e.target.value)}
                />
                <Button
                  size={"sm"}
                  color="green"
                  disabled={answerState === "" || answerLoading ? true : false}
                  isProcessing={answerLoading}
                  onClick={SubmitAnswerHandler}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSingleQuestionsComponent = ({
  singleData,
  setdeleteModal,
  setselectedQuestionid,
}) => {
  // # react router dom
  const { courseId, courseContentId } = useParams();

  // # react redux
  const { setcourseContentData } = useContext(ContentCourseDataStore);
  const { user } = useSelector((state) => state.AuthState);

  // # usestates
  const [isOpen, setisOpen] = useState(false);
  const [isReply, setisReply] = useState(false);
  const [answerState, setanswerState] = useState("");
  const [answerLoading, setanswerLoading] = useState(false);

  // # functions
  const AllRepliesToggleFun = (EmptyReplies = false) => {
    if (EmptyReplies) {
      setisReply(!isReply);
    } else {
      setisOpen(!isOpen);
      setisReply(!isReply);
    }
  };

  const fetchContentCourseData = async () => {
    const response = await GetContentCourseDataApi(courseId, courseContentId);
    if (response.success) {
      setcourseContentData(response.data);
    }
  };

  const SubmitAnswerHandler = async () => {
    setanswerLoading(true);
    const details = {
      answer: answerState,
      courseid: courseId,
    };
    const response = await AddAnswerApi(details, singleData?._id);
    if (response.success) {
      toast.success(response.message);
      setanswerState("");
      fetchContentCourseData();
      setisOpen(true);
    } else {
      toast.error(response.message);
    }
    setanswerLoading(false);
  };

  return (
    <div>
      <div className="flex gap-3 p-5">
        <div className="flex space-x-4 w-full">
          <div className="shrink-0">
            <Avatar
              img={singleData?.askedBy?.profile?.url}
              alt={singleData?.askedBy?.name}
              rounded
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between">
              <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
                {singleData?.askedBy?.name}
                {singleData?.askedBy?.role === "admin" && (
                  <span className=" text-green-500">
                    <MdVerified />
                  </span>
                )}
                {singleData?.askedBy?.role === "teacher" && (
                  <span className=" text-cyan-400">
                    <MdOutlineVerified />
                  </span>
                )}
              </p>
              <div className="cursor-pointer ">
                <MdDelete
                  color="red"
                  onClick={() => {
                    setdeleteModal(true);
                    setselectedQuestionid(singleData);
                  }}
                />
              </div>
            </div>
            <p className="truncate text-sm text-gray-500 font-bold dark:text-gray-400">
              {singleData?.question}
            </p>
            <p className="truncate text-[12px] text-gray-300 dark:text-gray-500 mb-1">
              {format(singleData?.createdAt)} -
            </p>
            <div className="truncate text-sm text-gray-300 dark:text-gray-500 flex gap-2 items-center mb-2">
              <p
                className="cursor-pointer"
                onClick={() =>
                  AllRepliesToggleFun(
                    singleData?.answers?.length === 0 ? true : false
                  )
                }
              >
                {isOpen
                  ? "Hide Replies"
                  : singleData?.answers?.length === 0
                  ? "Add Reply"
                  : "All Replies"}
              </p>
              <p className="flex gap-1 items-center">
                <FaRegMessage /> {singleData?.answers?.length}
              </p>
            </div>

            {isOpen &&
              singleData?.answers?.map((singleAnswer) => (
                <div className="flex space-x-4">
                  <div className="shrink-0">
                    <Avatar
                      img={singleAnswer?.answerBy?.profile?.url}
                      alt={singleAnswer?.answerBy?.name}
                      rounded
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-normal text-gray-900 dark:text-white flex items-center gap-1">
                      {singleAnswer?.answerBy?.name}
                      {singleAnswer?.answerBy?.role === "admin" && (
                        <span className=" text-green-500">
                          <MdVerified />
                        </span>
                      )}
                      {singleAnswer?.answerBy?.role === "teacher" && (
                        <span className=" text-cyan-400">
                          <MdOutlineVerified />
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 font-bold dark:text-gray-400">
                      {singleAnswer?.ans}
                    </p>
                    <p className="truncate text-[12px] text-gray-300 dark:text-gray-500 mb-1">
                      {format(singleAnswer?.answerOn)} -
                    </p>
                  </div>
                </div>
              ))}
            {isReply && (
              <div className="w-full flex gap-2 mt-2 max-sm:flex-col">
                <TextInput
                  placeholder="Enter Your Ans.."
                  className="w-full"
                  value={answerState}
                  onChange={(e) => setanswerState(e.target.value)}
                />
                <Button
                  size={"sm"}
                  color="green"
                  disabled={answerState === "" || answerLoading ? true : false}
                  isProcessing={answerLoading}
                  onClick={SubmitAnswerHandler}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  // # react router dom
  const { courseId, courseContentId } = useParams();

  // # react redux
  const { courseContentData, setcourseContentData } = useContext(
    ContentCourseDataStore
  );
  const { user } = useSelector((state) => state.AuthState);
  // # usestates
  const [questionState, setquestionState] = useState("");
  const [questionLoading, setquestionLoading] = useState(false);
  const [selectedQuestionid, setselectedQuestionid] = useState(null);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  // # funtions
  const fetchContentCourseData = async () => {
    const response = await GetContentCourseDataApi(courseId, courseContentId);
    if (response.success) {
      setcourseContentData(response.data);
    }
  };

  const SubmitQuestionHandler = async () => {
    setquestionLoading(true);
    const details = {
      courseid: courseId,
      question: questionState,
    };
    const response = await AddQuestionApi(details, courseContentId);
    if (response.success) {
      toast.success(response.message);
      setquestionState("");
      fetchContentCourseData();
    } else {
      toast.error(response.message);
    }
    setquestionLoading(false);
  };

  const deleteSubmitHandler = async () => {
    setdeleteLoading(true);
    const response = await DeleteQuestionApi(selectedQuestionid?._id);
    if (response.success) {
      toast.success(response.message);
      fetchContentCourseData();
      setdeleteModal(false);
    } else {
      toast.error(response.message);
    }
    setdeleteLoading(false);
  };

  useEffect(() => {
    if (!deleteModal) {
      setselectedQuestionid(null);
    }
  }, [deleteModal]);
  return (
    <>
      <div className="flex gap-3 p-5">
        <div>
          <Avatar img={user?.profile?.url} alt={user?.name} rounded bordered />
        </div>
        <div className="w-full flex items-end gap-3 max-sm:flex-col">
          <Textarea
            placeholder="Write Your Question..."
            required
            rows={5}
            value={questionState}
            onChange={(e) => setquestionState(e.target.value)}
          />

          <Button
            onClick={SubmitQuestionHandler}
            disabled={questionState === "" || questionLoading ? true : false}
            isProcessing={questionLoading}
          >
            Submit
          </Button>
        </div>
      </div>

      {user?.role === "user" &&
        courseContentData?.questionData?.map((item) => (
          <SingleQuestionsComponent singleData={item} key={item?._id} />
        ))}

      {(user?.role === "admin" || user?.role === "teacher") &&
        courseContentData?.questionData?.map((item) => (
          <AdminSingleQuestionsComponent
            singleData={item}
            setdeleteModal={setdeleteModal}
            setselectedQuestionid={setselectedQuestionid}
            selectedQuestionid={selectedQuestionid}
            key={item?._id}
          />
        ))}

      {/* delete popup */}
      <CustomModal
        openModal={deleteModal}
        setopenModal={setdeleteModal}
        title={"Delete Question"}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the Question of{" "}
            {selectedQuestionid?.askedBy?.name} ?
          </h3>
          <h2 className="font-bold mb-5">
            {selectedQuestionid?._id}({selectedQuestionid?.question})
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              disabled={deleteLoading}
              isProcessing={deleteLoading}
              onClick={deleteSubmitHandler}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={() => setdeleteModal(false)}
              disabled={deleteLoading}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default Questions;
