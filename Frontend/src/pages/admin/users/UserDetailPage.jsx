import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useParams } from "react-router-dom";
import { Button, Card, Table, Label, Select, TextInput } from "flowbite-react";
import { GetUserAdminApi } from "../../../Apis/user.api";
import toast from "react-hot-toast";
import CustomLoader from "../../../utils/Loader";
import moment from "moment";
import { TiTick, TiCancel } from "react-icons/ti";
import CustomModal from "../../../utils/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetCourseList } from "../../../Redux/actions/course.action";

const AddCourseToUser = ({
  addModalOpen,
  setaddModalOpen,
  userId,
  userDetail,
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
            // onClick={updateUserHandler}
          >
            Submit
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
        <div className="grid grid-cols-2 max-md:block gap-3 ">
          <Card>
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

            <div className="flex items-center mb-4">
              <div className="w-1/3 font-semibold">Profile Image:</div>
              <div className="w-2/3">
                <img
                  src={user?.profile.url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full"
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="overflow-auto" id="wantScroll">
              <div className="font-semibold mb-2">Courses:</div>
              <Table className="">
                <Table.Head>
                  <Table.HeadCell>S.NO</Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Product name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {user &&
                    user.courses.map((course, index) => (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{course._id}</Table.Cell>
                        <Table.Cell>{course.name}</Table.Cell>
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
      />
      <CustomLoader loading={loading} />
    </AdminLayout>
  );
};

export default UserDetailPage;
