import AboutPage from "../pages/static/AboutPage";
import CourseContentData from "../pages/Course/CourseContentData";
import CourseDetails from "../pages/Course/CourseDetails";
import CourseEnrolled from "../pages/Course/CourseEnrolled";
import Courses from "../pages/Course/Courses";
import FaqPage from "../pages/static/FaqPage";
import Home from "../pages/Home";
import ImpLinksPage from "../pages/ImpLinksPage";
import PageNotFound from "../pages/static/PageNotFound";
import PrivacyPolicy from "../pages/static/PrivacyPolicy";
import Profile from "../pages/Profile";
import AdminHome from "../pages/admin/AdminHome";
import AdminAllCourses from "../pages/admin/Courses/AdminAllCourses";
import Categories from "../pages/admin/Courses/Categories";
import CreateCourse from "../pages/admin/Courses/CreateCourse";
import CourseDashboardPage from "../pages/admin/Dashboard/CourseDashboardPage";
import UserDashboardPage from "../pages/admin/Dashboard/UserDashboardPage";
import AllLinkPage from "../pages/admin/ImpLink/AllLinkPage";
import SingleImpLink from "../pages/admin/ImpLink/SingleImpLink";
import { AllOrdersComponent } from "../pages/admin/orders/AllOrdersComponent";
import OrderDetail from "../pages/admin/orders/OrderDetail";
import AdminAllUsers from "../pages/admin/users/AdminAllUsers";
import AdminTeam from "../pages/admin/users/AdminTeam";
import UserDetailPage from "../pages/admin/users/UserDetailPage";
import AllNotes from "../pages/notes/AllNotes";
import NotesDetails from "../pages/notes/NotesDetails";
import SnippetPage from "../pages/snippet/SnippetPage";
const AllUSers = ["admin", "teacher", "user"];

const AllRoutesItems_1 = [
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
    Access: ["admin", "teacher"],
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
    Access: ["admin", "teacher"],
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
    Access: ["admin", "teacher"],
  },
  {
    num: 11,
    path: "/admin/dashboard/course",
    element: CourseDashboardPage,
    protected: true,
    Access: ["admin", "teacher"],
  },
  {
    num: 12,
    path: "/admin/user/:userId",
    element: UserDetailPage,
    protected: true,
    Access: ["admin", "teacher"],
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
    Access: ["admin", "teacher"],
  },
  {
    num: 18,
    path: "/admin/orders/:orderid",
    element: OrderDetail,
    protected: true,
    Access: ["admin", "teacher"],
  },
  {
    num: 19,
    path: "/about",
    element: AboutPage,
    protected: false,
    Access: [],
  },
  {
    num: 20,
    path: "/admin/implinks",
    element: AllLinkPage,
    protected: true,
    Access: ["admin", "teacher"],
  },
  {
    num: 21,
    path: "/websites",
    element: ImpLinksPage,
    protected: false,
    Access: [],
  },
  {
    num: 22,
    path: "/admin/implinks/:linkId",
    element: SingleImpLink,
    protected: true,
    Access: ["admin", "teacher"],
  },
];

const RoleBasedRoutes = {
  // public routes
  public: [
    {
      category: "Home",
      routes: [
        { num: 1.1, path: "/", element: Home, protected: false, Access: [] },
        {
          num: 1,
          path: "/*",
          element: PageNotFound,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Static Pages",
      routes: [
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
          num: 19,
          path: "/about",
          element: AboutPage,
          protected: false,
          Access: [],
        },
        {
          num: 21,
          path: "/websites",
          element: ImpLinksPage,
          protected: false,
          Access: [],
        },
        {
          num: 2.3,
          path: "/faq",
          element: FaqPage,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Courses",
      routes: [
        {
          num: 13,
          path: "/course/:courseId",
          element: CourseDetails,
          protected: false,
          Access: [],
        },
      ],
    },
  ],

  // user routes
  user: [
    {
      category: "Home",
      routes: [
        { num: 1.1, path: "/", element: Home, protected: false, Access: [] },
        {
          num: 1,
          path: "/*",
          element: PageNotFound,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Profile",
      routes: [
        {
          num: 2,
          path: "/profile",
          element: Profile,
          protected: true,
          Access: ["user"],
        },
      ],
    },
    {
      category: "Courses",
      routes: [
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
          Access: ["user"],
        },
        {
          num: 15,
          path: "/course-access/:courseId/:courseContentId",
          element: CourseContentData,
          protected: true,
          Access: ["user"],
        },
      ],
    },
    {
      category: "Static Pages",
      routes: [
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
          num: 19,
          path: "/about",
          element: AboutPage,
          protected: false,
          Access: [],
        },
        {
          num: 21,
          path: "/websites",
          element: ImpLinksPage,
          protected: false,
          Access: [],
        },
        {
          num: 2.3,
          path: "/faq",
          element: FaqPage,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Notes",
      routes: [
        {
          num: 123,
          path: "/notes",
          element: AllNotes,
          protected: true,
          Access: ["user"],
        },
        {
          num: 1234,
          path: "/notes/:notesId",
          element: NotesDetails,
          protected: true,
          Access: ["user"],
        },
      ],
    },
  ],

  //  teacher routes
  teacher: [
    {
      category: "Home",
      routes: [
        { num: 1.1, path: "/", element: Home, protected: false, Access: [] },
        {
          num: 1,
          path: "/*",
          element: PageNotFound,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Profile",
      routes: [
        {
          num: 2,
          path: "/profile",
          element: Profile,
          protected: true,
          Access: ["teacher"],
        },
      ],
    },
    {
      category: "Admin",
      routes: [
        {
          num: 3,
          path: "/admin",
          element: AdminHome,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 7,
          path: "/admin/user/all",
          element: AdminAllUsers,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 10,
          path: "/admin/dashboard/user",
          element: UserDashboardPage,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 11,
          path: "/admin/dashboard/course",
          element: CourseDashboardPage,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 12,
          path: "/admin/user/:userId",
          element: UserDetailPage,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 17,
          path: "/admin/orders/all",
          element: AllOrdersComponent,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 18,
          path: "/admin/orders/:orderid",
          element: OrderDetail,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 20,
          path: "/admin/implinks",
          element: AllLinkPage,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 22,
          path: "/admin/implinks/:linkId",
          element: SingleImpLink,
          protected: true,
          Access: ["teacher"],
        },
      ],
    },
    {
      category: "Courses",
      routes: [
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
          Access: ["teacher"],
        },
        {
          num: 15,
          path: "/course-access/:courseId/:courseContentId",
          element: CourseContentData,
          protected: true,
          Access: ["teacher"],
        },
      ],
    },
    {
      category: "Notes",
      routes: [
        {
          num: 123,
          path: "/notes",
          element: AllNotes,
          protected: true,
          Access: ["teacher"],
        },
        {
          num: 1234,
          path: "/notes/:notesId",
          element: NotesDetails,
          protected: true,
          Access: ["teacher"],
        },
      ],
    },
    {
      category: "Static Pages",
      routes: [
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
          num: 19,
          path: "/about",
          element: AboutPage,
          protected: false,
          Access: [],
        },
        {
          num: 21,
          path: "/websites",
          element: ImpLinksPage,
          protected: false,
          Access: [],
        },
        {
          num: 2.3,
          path: "/faq",
          element: FaqPage,
          protected: false,
          Access: [],
        },
      ],
    },
  ],

  //  admin routes
  admin: [
    {
      category: "Home",
      routes: [
        { num: 1.1, path: "/", element: Home, protected: false, Access: [] },
        {
          num: 1,
          path: "/*",
          element: PageNotFound,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Profile",
      routes: [
        {
          num: 2,
          path: "/profile",
          element: Profile,
          protected: true,
          Access: AllUSers,
        },
      ],
    },
    {
      category: "Admin",
      routes: [
        {
          num: 3,
          path: "/admin",
          element: AdminHome,
          protected: true,
          Access: ["admin", "teacher"],
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
          Access: ["admin", "teacher"],
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
          Access: ["admin", "teacher"],
        },
        {
          num: 11,
          path: "/admin/dashboard/course",
          element: CourseDashboardPage,
          protected: true,
          Access: ["admin", "teacher"],
        },
        {
          num: 12,
          path: "/admin/user/:userId",
          element: UserDetailPage,
          protected: true,
          Access: ["admin", "teacher"],
        },
        {
          num: 17,
          path: "/admin/orders/all",
          element: AllOrdersComponent,
          protected: true,
          Access: ["admin", "teacher"],
        },
        {
          num: 18,
          path: "/admin/orders/:orderid",
          element: OrderDetail,
          protected: true,
          Access: ["admin", "teacher"],
        },
        {
          num: 20,
          path: "/admin/implinks",
          element: AllLinkPage,
          protected: true,
          Access: ["admin", "teacher"],
        },
        {
          num: 22,
          path: "/admin/implinks/:linkId",
          element: SingleImpLink,
          protected: true,
          Access: ["admin", "teacher"],
        },
      ],
    },
    {
      category: "Courses",
      routes: [
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
      ],
    },
    {
      category: "Notes",
      routes: [
        {
          num: 123,
          path: "/notes",
          element: AllNotes,
          protected: true,
          Access: ["admin"],
        },
        {
          num: 1234,
          path: "/notes/:notesId",
          element: NotesDetails,
          protected: true,
          Access: ["admin"],
        },
      ],
    },
    {
      category: "Static Pages",
      routes: [
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
          num: 19,
          path: "/about",
          element: AboutPage,
          protected: false,
          Access: [],
        },
        {
          num: 21,
          path: "/websites",
          element: ImpLinksPage,
          protected: false,
          Access: [],
        },
        {
          num: 2.3,
          path: "/faq",
          element: FaqPage,
          protected: false,
          Access: [],
        },
      ],
    },
    {
      category: "Snippets",
      routes: [
        {
          num: 14,
          path: "/snippets",
          element: SnippetPage,
          protected: false,
          Access: [],
        },
      ],
    },
  ],
};

const AllRoutesItems = RoleBasedRoutes;

export default AllRoutesItems;
