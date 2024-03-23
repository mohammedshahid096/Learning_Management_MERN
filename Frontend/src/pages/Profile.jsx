import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserLogoutAction } from "../Redux/actions/auth.action";
import { ChangeUserPassword, UserProfileData } from "../components/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";

const AllSideBars = {
  adminSideBars: [
    { name: "Profile", icon: HiUser, activeCount: 1 },
    { name: "Change Password", icon: TbPasswordUser, activeCount: 2 },
    { name: "Dashboard", icon: HiChartPie, activeCount: 3 },
  ],
  userSideBars: [
    { name: "Profile", icon: HiUser, activeCount: 1 },
    { name: "Reset Password", icon: TbPasswordUser, activeCount: 2 },
  ],
};

const SideBar = ({ setactiveTab, activeTab }) => {
  //   ### redux
  const dispatch = useDispatch();
  const { message, user } = useSelector((state) => state.AuthState);
  const { logout, isAuthenticated } = useAuth0();

  const SidebarsItems =
    user?.role === "admin"
      ? AllSideBars.adminSideBars
      : AllSideBars.userSideBars;

  // ### functions
  const LogoutFunction = (type = false) => {
    if (type) {
      toast.success(message);
      dispatch(UserLogoutAction(true));
      return;
    }
    dispatch(UserLogoutAction());
    if (isAuthenticated) {
      logout();
    }
  };

  // ### useeffects

  useEffect(() => {
    if (!user && message) {
      LogoutFunction(true);
    }
  }, [user]);

  return (
    <Sidebar aria-label="Default sidebar example" className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {SidebarsItems.map((item) => (
            <Sidebar.Item
              icon={item.icon}
              key={item.activeCount}
              onClick={() => setactiveTab(item.activeCount)}
              className={
                activeTab === item.activeCount
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }
            >
              {item.name}
            </Sidebar.Item>
          ))}
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={() => LogoutFunction(false)}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

const Profile = () => {
  const [activeTab, setactiveTab] = useState(1);
  return (
    <div className="flex gap-4 px-6 max-md:flex-col py-10 max-md:gap-4  min-h-[90vh] relative w-full">
      <div className="w-3/12 max-md:w-full">
        <SideBar activeTab={activeTab} setactiveTab={setactiveTab} />
      </div>

      <div className="w-full">
        {activeTab === 1 && <UserProfileData />}
        {activeTab === 2 && <ChangeUserPassword />}
      </div>
    </div>
  );
};

export default Profile;
