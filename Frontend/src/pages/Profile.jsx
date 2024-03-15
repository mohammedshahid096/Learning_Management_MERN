import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserLogoutAction } from "../Redux/actions/auth.action";
import { UserProfileData } from "../components/UserProfile";

const AllSideBars = {
  adminSideBars: [
    { name: "Dashboard", icon: HiChartPie, activeCount: 1 },
    { name: "Users", icon: HiUser, activeCount: 2 },
    { name: "Profile", icon: HiUser, activeCount: 3 },
  ],
  userSideBars: [
    { name: "Dashboard", icon: HiChartPie, activeCount: 1 },
    { name: "Users", icon: HiUser, activeCount: 2 },
    { name: "Profile", icon: HiUser, activeCount: 3 },
  ],
};

const SideBar = ({ setactiveTab, activeTab }) => {
  const type = "admin";

  const SidebarsItems =
    type === "admin" ? AllSideBars.adminSideBars : AllSideBars.userSideBars;

  //   ### redux
  const dispatch = useDispatch();
  const { message, user } = useSelector((state) => state.AuthState);

  const LogoutFunction = (type = false) => {
    if (type) {
      toast.success(message);
      dispatch(UserLogoutAction(true));
      return;
    }
    dispatch(UserLogoutAction());
  };

  useEffect(() => {
    if (!user && message) {
      LogoutFunction(true);
    }
  }, [user]);
  return (
    <Sidebar aria-label="Default sidebar example" className="max-md:w-full">
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
    <div className="flex px-6 max-md:flex-col py-10 max-md:gap-4  min-h-[90vh] relative">
      <div className="w-1/4 max-md:w-full">
        <SideBar activeTab={activeTab} setactiveTab={setactiveTab} />
      </div>

      <div className="w-3/4 max-md:w-full">
        {activeTab === 1 && <UserProfileData />}
      </div>
    </div>
  );
};

export default Profile;
