import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import AccountCustomModal from "../utils/AccountCustomModal";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Courses",
    url: "/courses",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Policy",
    url: "/policy",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

const Navbar = () => {
  // ### states
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openSidebar, setopenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ### routerdoms
  const location = useLocation();

  // ### react-redux
  const { user } = useSelector((state) => state.AuthState);

  // ### functions
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // ### useeffects
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <header className="navbar py-4">
        <div className="px-4 mx-auto flex justify-between items-center z-40">
          <NavLink
            to="/"
            className=" dark:text-white text-black text-xl font-bold"
          >
            E-Learning
          </NavLink>
          <nav className=" flex gap-5 items-center justify-end">
            <ul className="flex max-sm:hidden space-x-5">
              {NavItems.map((item, index) => {
                let isActive = location.pathname === item.url;
                return (
                  <li key={index + 1}>
                    <NavLink
                      to={item.url}
                      className={
                        isActive
                          ? "dark:text-[#37a39a] text-[crimson]"
                          : "dark:text-white text-black"
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={toggleDarkMode}
              className="mt-1 focus:outline-none dark:text-white text-black"
            >
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>

            <button
              onClick={() => setopenSidebar(true)}
              className="max-sm:block hidden mt-1 focus:outline-none dark:text-white text-black"
            >
              <FaBars size={22} />
            </button>

            {user ? (
              <NavLink to={"/profile"}>
                <Avatar
                  img={user?.profile?.public_id ? user.profile.url : null}
                  rounded
                  size={"sm"}
                />
              </NavLink>
            ) : (
              <span
                className="mt-1 focus:outline-none dark:text-white text-black"
                onClick={() => setOpenModal(true)}
              >
                <FaUserCircle size={22} />
              </span>
            )}
          </nav>
        </div>

        {openSidebar && (
          <div className="max-sm:flex justify-end hidden fixed right-0 top-0 z-10 bg-gray-200 dark:bg-white w-full h-full ">
            <nav className="p-4 w-3/4 dark:bg-slate-800 bg-white">
              <div className="flex justify-between">
                <button
                  onClick={() => setopenSidebar(false)}
                  className="focus:outline-none dark:text-white text-black"
                >
                  <IoClose size={35} />
                </button>
                <h1 className="dark:text-white text-black text-xl font-bold">
                  E-Learning
                </h1>
              </div>
              <div className="w-full text-cente py-4">
                {NavItems.map((item, index) => {
                  let isActive = location.pathname === item.url;
                  return (
                    <div key={index + 1}>
                      <span>
                        <NavLink
                          to={item.url}
                          className={
                            isActive
                              ? "dark:text-[#37a39a] text-[crimson] block py-5"
                              : "dark:text-white text-black block py-5"
                          }
                        >
                          {item.title}
                        </NavLink>
                      </span>
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </header>

      <AccountCustomModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Navbar;
