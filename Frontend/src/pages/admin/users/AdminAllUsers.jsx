import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import AllCoursesComponent from "../../../components/admin/courses/AllCoursesComponent";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetCourseList } from "../../../Redux/actions/course.action";

const AdminAllUsers = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.AdminCourseState);

  const fetchCoursesList = () => {
    dispatch(AdminGetCourseList());
  };

  useEffect(() => {
    if (!courses) {
      fetchCoursesList();
    }
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-center text-2xl font-bold pb-2 ">Users List</h1>
      <AllCoursesComponent />
    </AdminLayout>
  );
};

export default AdminAllUsers;
