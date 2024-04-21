import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useParams } from "react-router-dom";
import { Button, Card, Table, Label, Select, TextInput } from "flowbite-react";
import {
  Add_or_DeleteCourseUserAdminApi,
  GetUserAdminApi,
} from "../../../Apis/user.api";
import toast from "react-hot-toast";
import CustomLoader from "../../../utils/Loader";
import moment from "moment";
import { TiTick, TiCancel } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import CustomModal from "../../../utils/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetCourseList } from "../../../Redux/actions/course.action";
import { format } from "timeago.js";

const AddCourseToUser = ({
  addModalOpen,
  setaddModalOpen,
  userId,
  userDetail,
  setuserDetail,
}) => {
  // redux
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.AdminCourseState);

  // usestate
  const [loading, setloading] = useState(false);
  const [selectedCourse, setselectedCourse] = useState(null);

  // functions
  const fetchCoursesList = () => {
    dispatch(AdminGetCourseList());
  };

  const updateSubmitHandler = async () => {
    setloading(true);
    const response = await Add_or_DeleteCourseUserAdminApi(
      userId,
      selectedCourse,
      true
    );
    if (response.success) {
      toast.success(response.message);
      setselectedCourse(null);
      setaddModalOpen(false);
      setuserDetail(response.data);
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };
  useEffect(() => {
    if (!courses) {
      fetchCoursesList();
    }
  }, []);

  return (
    <CustomModal
      openModal={addModalOpen}
      setopenModal={setaddModalOpen}
      title="Add Course to User"
    >
      <div>
        <div className=" space-y-2">
          <h4 className="text-center">
            Do You Want to Add Course to <br />
            <span className="font-semibold">{userDetail?.name}</span> ?
          </h4>
          <div className="mb-2 block">
            <Label htmlFor="addcoursestouser" value="Select Course" />
          </div>
          <Select
            id="addcoursestouser"
            required
            value={selectedCourse}
            onChange={(e) => setselectedCourse(e.target.value)}
          >
            <option value={null} disabled={selectedCourse ? true : false}>
              Select Course
            </option>
            {courses &&
              courses.map((item) => {
                let isEnroll = userDetail?.courses.find(
                  (verifying) => verifying?._id === item._id
                );
                return (
                  <option
                    disabled={isEnroll ? true : false}
                    key={item._id}
                    value={item?._id}
                  >
                    {item?.name}
                  </option>
                );
              })}
          </Select>
          <div>
            <Label htmlFor="disabledInput1">Course Amount</Label>
          </div>
          <TextInput
            type="text"
            id="disabledInput1"
            placeholder="Disabled input"
            disabled
          />
        </div>
        <br />
        <div>
          <Button
            className="w-full"
            pill
            disabled={selectedCourse === null || loading ? true : false}
            isProcessing={loading}
            onClick={updateSubmitHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

const DeleteCoursFromUser = ({
  userId,
  setuserDetail,
  selectedDelete,
  setselectedDelete,
}) => {
  // usestate
  const [loading, setloading] = useState(false);

  // functions
  const updateSubmitHandler = async () => {
    setloading(true);
    const response = await Add_or_DeleteCourseUserAdminApi(
      userId,
      selectedDelete,
      false
    );
    if (response.success) {
      toast.success(response.message);
      setselectedDelete(null);
      setuserDetail(response.data);
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  return (
    <CustomModal
      openModal={selectedDelete ? true : false}
      setopenModal={setselectedDelete}
      title="Delete Course to User"
    >
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this Course?
        </h3>
        <h4 className="text-center font-bold mb-3">{selectedDelete}</h4>

        <div className="flex justify-between gap-4">
          <Button
            color="failure"
            isProcessing={loading}
            disabled={loading}
            onClick={updateSubmitHandler}
          >
            {"Yes, I'm sure"}
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setselectedDelete(null);
            }}
          >
            No, cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

const UserDetailPage = () => {
  // # react router dom
  const { userId } = useParams();

  // # use states
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [selectedDelete, setselectedDelete] = useState(null);

  // # functions
  const fetchUserDetail = async () => {
    setloading(true);
    const response = await GetUserAdminApi(userId);
    if (response.success) {
      setuser(response.data);
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  // # useEffect
  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <AdminLayout>
      <Card className="mx-auto  shadow-md rounded-lg ">
        <div className="text-2xl font-bold  text-center">User Details</div>
        <div className="flex justify-end">
          <Button color="success" onClick={() => setaddModalOpen(true)}>
            Add Course
          </Button>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 ">
          <Card className="break-words">
            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Name:</div>
              <div className="w-2/3">{user?.name}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Email:</div>
              <div className="w-2/3">{user?.email}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Role:</div>
              <div className="w-2/3">{user?.role}</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Socail Account:</div>
              <div className="w-2/3">
                {user?.isSocialAuth ? (
                  <TiTick size={25} />
                ) : (
                  <TiCancel size={25} />
                )}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Created On:</div>
              <div className="w-2/3">
                {user && moment(user?.createdAt).format("DD-MM-YYYY")}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-5 items-center mb-4">
              <div className="font-semibold">Profile Image:</div>
              <div className="">
                <img
                  src={user?.profile.url}
                  alt="Profile"
                  className="h-40 w-40 rounded-full"
                />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="overflow-auto" id="wantScroll">
              <div className="font-semibold mb-2">Courses:</div>
              <Table className="">
                <Table.Head>
                  <Table.HeadCell>S.NO</Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Product name</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {user &&
                    user.courses.map((course, index) => (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{course._id}</Table.Cell>
                        <Table.Cell>{course.name}</Table.Cell>
                        <Table.Cell>
                          {" "}
                          <span
                            className="cursor-pointer  hover:text-red-500"
                            onClick={() => {
                              setselectedDelete(course._id);
                            }}
                          >
                            <MdDeleteForever size={20} />
                          </span>{" "}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>
      </Card>

      <AddCourseToUser
        addModalOpen={addModalOpen}
        setaddModalOpen={setaddModalOpen}
        userId={userId}
        userDetail={user}
        setuserDetail={setuser}
      />
      <DeleteCoursFromUser
        userId={userId}
        setuserDetail={setuser}
        selectedDelete={selectedDelete}
        setselectedDelete={setselectedDelete}
      />
      <CustomLoader loading={loading} />
    </AdminLayout>
  );
};

export default UserDetailPage;
