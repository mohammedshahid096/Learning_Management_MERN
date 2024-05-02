import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import AllCoursesComponent from "../../../components/admin/courses/AllCoursesComponent";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetCourseList } from "../../../Redux/actions/course.action";
import CustomModal from "../../../utils/CustomModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";
import { DeleteCourseApi, UpdateCourseApi } from "../../../Apis/course.api";
import toast from "react-hot-toast";
import MetaData from "../../../utils/MetaData";
import CustomLoader from "../../../utils/Loader";

const AdminAllCourses = () => {
  // ### usestates
  const [selectedCourseid, setselectedCourseid] = useState(null);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [activeLoading, setactiveLoading] = useState(false);

  // ### redux
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.AdminCourseState);

  // functions
  const fetchCoursesList = () => {
    dispatch(AdminGetCourseList());
  };

  const deleteSubmitHandler = async () => {
    setdeleteLoading(true);
    const response = await DeleteCourseApi(selectedCourseid);
    if (response.success) {
      dispatch(AdminGetCourseList(false));
      toast.success(response.message);
      setdeleteModal(false);
    } else {
      toast.error(response.message);
    }
    setdeleteLoading(false);
  };

  const active_disableSubmitHandler = async (status, courseid) => {
    setactiveLoading(true);
    const response = await UpdateCourseApi(courseid, { isActive: status });
    if (response.success) {
      dispatch(AdminGetCourseList(false));
      toast.success(response.message);
      setdeleteModal(false);
    } else {
      toast.error(response.message);
    }
    setactiveLoading(false);
  };

  // useeffects
  useEffect(() => {
    if (!courses) {
      fetchCoursesList();
    }
  }, []);

  useEffect(() => {
    if (selectedCourseid) {
      setdeleteModal(true);
    }
  }, [selectedCourseid]);

  useEffect(() => {
    if (!deleteModal) {
      setselectedCourseid(null);
    }
  }, [deleteModal]);

  return (
    <AdminLayout>
      <MetaData title="Admin- All Courses" />
      <h1 className="text-center text-2xl font-bold pb-2 ">Course List</h1>
      <AllCoursesComponent
        setselectedCourseid={setselectedCourseid}
        active_disableSubmitHandler={active_disableSubmitHandler}
        activeLoading={activeLoading}
      />

      {/* delete popup */}
      <CustomModal
        openModal={deleteModal}
        setopenModal={setdeleteModal}
        title={"Delete Course"}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this Course?
          </h3>
          <h2 className="font-bold mb-5">{selectedCourseid}</h2>
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

      <CustomLoader loading={activeLoading} />
    </AdminLayout>
  );
};

export default AdminAllCourses;
