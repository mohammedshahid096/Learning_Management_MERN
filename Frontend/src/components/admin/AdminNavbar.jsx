"use client";

import { Avatar, Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox } from "react-icons/hi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import {
  MdOutlineOndemandVideo,
  MdOutlineCategory,
  MdOutlineAnalytics,
} from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { user } = useSelector((state) => state.AuthState);

  const navigate = useNavigate();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="w-full"
    >
      <Sidebar.Logo className="flex justify-center">
        <div>
          <Avatar
            img={user?.profile?.url}
            rounded
            size={"lg"}
            bordered
            color={"failure"}
          />
          <p className="mt-3 capitalize">{user?.name}</p>
          <p className="mt-2 text-end capitalize text-md">- {user?.role}</p>
        </div>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => navigate("/admin")} icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse label="Data" open>
            <Sidebar.Item
              icon={FaUsers}
              onClick={() => navigate("/admin/user/all")}
            >
              Users
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox}>Inbox</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse label="Courses" open>
            <Sidebar.Item
              icon={AiOutlineVideoCameraAdd}
              onClick={() => navigate("/admin/course/create")}
            >
              Create Course
            </Sidebar.Item>
            <Sidebar.Item
              icon={MdOutlineOndemandVideo}
              onClick={() => navigate("/admin/course/all")}
            >
              Live Courses
            </Sidebar.Item>
            <Sidebar.Item
              icon={MdOutlineCategory}
              onClick={() => navigate("/admin/category")}
            >
              Categories
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse label="Collabration" open>
            <Sidebar.Item
              icon={FaUsersCog}
              onClick={() => navigate("/admin/user/team")}
            >
              Team Members
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse label="Analytics" open>
            <Sidebar.Item
              icon={MdOutlineAnalytics}
              onClick={() => navigate("/admin/dashboard/user")}
            >
              User Analytics
            </Sidebar.Item>
            <Sidebar.Item
              icon={GrAnalytics}
              onClick={() => navigate("/admin/dashboard/course")}
            >
              Course Analytics
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminNavbar;
