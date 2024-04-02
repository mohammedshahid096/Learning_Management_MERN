import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AdminHome from "../pages/admin/AdminHome";
import AdminAllCourses from "../pages/admin/Courses/AdminAllCourses";
import Categories from "../pages/admin/Courses/Categories";
import CreateCourse from "../pages/admin/Courses/CreateCourse";
import AdminAllUsers from "../pages/admin/users/AdminAllUsers";
import AdminTeam from "../pages/admin/users/AdminTeam";
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
    num: 4,
    path: "/admin/course/create",
    element: CreateCourse,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 5,
    path: "/admin/course/:courseId",
    element: CreateCourse,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 6,
    path: "/admin/course/all",
    element: AdminAllCourses,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 7,
    path: "/admin/user/all",
    element: AdminAllUsers,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 8,
    path: "/admin/user/team",
    element: AdminTeam,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 9,
    path: "/admin/category",
    element: Categories,
    protected: true,
    Access: ["admin"],
  },
];

export default AllRoutesItems;
