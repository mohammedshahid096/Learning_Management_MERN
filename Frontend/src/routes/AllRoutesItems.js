import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AdminHome from "../pages/admin/AdminHome";
import AdminAllCourses from "../pages/admin/Courses/AdminAllCourses";
import CreateCourse from "../pages/admin/CreateCourse";
import AdminAllUsers from "../pages/admin/users/AdminAllUsers";

const AllUSers = ["admin", "user"];

const AllRoutesItems = [
  { num: 1, path: "/", element: Home, protected: false, Access: [] },
  {
    num: 2,
    path: "/profile",
    element: Profile,
    protected: true,
    Access: AllUSers,
  },
  {
    num: 3,
    path: "/admin",
    element: AdminHome,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 3,
    path: "/admin/course/create",
    element: CreateCourse,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 4,
    path: "/admin/course/all",
    element: AdminAllCourses,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 5,
    path: "/admin/user/all",
    element: AdminAllUsers,
    protected: true,
    Access: ["admin"],
  },
];

export default AllRoutesItems;
