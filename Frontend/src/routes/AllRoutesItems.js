import AboutPage from "../pages/AboutPage";
import CourseContentData from "../pages/Course/CourseContentData";
import CourseDetails from "../pages/Course/CourseDetails";
import CourseEnrolled from "../pages/Course/CourseEnrolled";
import Courses from "../pages/Course/Courses";
import FaqPage from "../pages/FaqPage";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Profile from "../pages/Profile";
import AdminHome from "../pages/admin/AdminHome";
import AdminAllCourses from "../pages/admin/Courses/AdminAllCourses";
import Categories from "../pages/admin/Courses/Categories";
import CreateCourse from "../pages/admin/Courses/CreateCourse";
import CourseDashboardPage from "../pages/admin/Dashboard/CourseDashboardPage";
import UserDashboardPage from "../pages/admin/Dashboard/UserDashboardPage";
import { AllOrdersComponent } from "../pages/admin/orders/AllOrdersComponent";
import OrderDetail from "../pages/admin/orders/OrderDetail";
import AdminAllUsers from "../pages/admin/users/AdminAllUsers";
import AdminTeam from "../pages/admin/users/AdminTeam";
import UserDetailPage from "../pages/admin/users/UserDetailPage";
const AllUSers = ["admin", "user"];

const AllRoutesItems = [
  { num: 1.1, path: "/", element: Home, protected: false, Access: [] },
  { num: 1, path: "/*", element: PageNotFound, protected: false, Access: [] },
  {
    num: 2,
    path: "/profile",
    element: Profile,
    protected: true,
    Access: AllUSers,
  },
  {
    num: 2.3,
    path: "/faq",
    element: FaqPage,
    protected: false,
    Access: [],
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
  {
    num: 10,
    path: "/admin/dashboard/user",
    element: UserDashboardPage,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 11,
    path: "/admin/dashboard/course",
    element: CourseDashboardPage,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 12,
    path: "/admin/user/:userId",
    element: UserDetailPage,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 13,
    path: "/course/:courseId",
    element: CourseDetails,
    protected: false,
    Access: [],
  },
  {
    num: 14,
    path: "/course-access/:courseId",
    element: CourseEnrolled,
    protected: true,
    Access: AllUSers,
  },
  {
    num: 15,
    path: "/course-access/:courseId/:courseContentId",
    element: CourseContentData,
    protected: true,
    Access: AllUSers,
  },
  {
    num: 16,
    path: "/privacy-policy",
    element: PrivacyPolicy,
    protected: false,
    Access: [],
  },
  {
    num: 16,
    path: "/search-courses",
    element: Courses,
    protected: false,
    Access: [],
  },
  {
    num: 17,
    path: "/admin/orders/all",
    element: AllOrdersComponent,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 18,
    path: "/admin/orders/:orderid",
    element: OrderDetail,
    protected: true,
    Access: ["admin"],
  },
  {
    num: 19,
    path: "/about",
    element: AboutPage,
    protected: false,
    Access: [],
  },
];

export default AllRoutesItems;
