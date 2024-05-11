import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import AccountCustomModal from "../utils/AccountCustomModal";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import { motion } from "framer-motion";
import { closeLoginAccount } from "../Redux/reducers/user.reducer";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Courses",
    url: "/search-courses",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Policy",
    url: "/privacy-policy",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

const variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  sunhover: {
    scale: 1.1,
    rotate: [0, 120, 360, 0],
    transition: {
      duration: 2,
    },
  },
  moonhover: {
    scale: 1.1,
    rotate: [0, 60, 0, -120],
    transition: {
      duration: 2,
    },
  },
  tap: {
    scale: 0.9,
    rotate: -10,
    transition: {
      duration: 0.1,
    },
  },
  accountHover: {
    scale: 1.2,
    transition: {
      duration: 0.3,
    },
  },
};

const transition = {
  type: "spring",
  stiffness: 400,
  damping: 20,
};
const Navbar = () => {
  // ### states
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [openSidebar, setopenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ### routerdoms
  const location = useLocation();

  // ### react-redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthState);
  const { isAccountPopUpOpen } = useSelector((state) => state.OpenAccountState);

  // ### functions
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  function closeOpenAccountState() {
    dispatch(closeLoginAccount());
  }

  // ### useeffects
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isAccountPopUpOpen) {
      setOpenModal(true);
      closeOpenAccountState();
    }
  }, [isAccountPopUpOpen]);

  return (
    <>
      <header className="navbar py-4">
        <div className="px-4 mx-auto flex justify-between items-center z-40">
          <NavLink
            to="/"
            className=" dark:text-white text-black text-xl font-bold"
          >
            <motion.div
            // animate={{
            //   x: [0, 10, 0],
            //   scale: [1, 0.5, 1, 1.2, 0.8, 1],
            // }}
            // transition={{
            //   duration: 2,
            //   repeat: Infinity,
            //   repeatDelay: 1,
            //   damping: 3,
            //   type: "tween",
            // }}
            >
              E-Learning
            </motion.div>
          </NavLink>
          <nav className=" flex gap-5 items-center justify-end">
            <ul className="flex max-sm:hidden space-x-5">
              {NavItems.map((item, index) => {
                let isActive = location.pathname === item.url;
                return (
                  <motion.li
                    whileHover={{
                      scale: 1.2,
                      fontWeight: "bold",
                    }}
                    transition={{ duration: 0.2 }}
                    key={index + 1}
                  >
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
                  </motion.li>
                );
              })}
            </ul>

            <motion.button
              animate="initial"
              variants={variants}
              whileHover={isDarkMode ? "sunhover" : "moonhover"}
              whileTap="tap"
              transition={transition}
              onClick={toggleDarkMode}
              className="mt-1 focus:outline-none dark:text-white text-black"
            >
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </motion.button>

            <button
              onClick={() => setopenSidebar(true)}
              className="max-sm:block hidden mt-1 focus:outline-none dark:text-white text-black"
            >
              <FaBars size={22} />
            </button>

            {user ? (
              <NavLink to={"/profile"}>
                <Avatar
                  img={
                    user?.isSocialAuth
                      ? user.profile.url
                      : user?.profile?.public_id
                      ? user.profile.url
                      : null
                  }
                  rounded
                  size={"sm"}
                />
              </NavLink>
            ) : (
              <motion.span
                variants={variants}
                whileHover="accountHover"
                whileTap="tap"
                transition={transition}
                className="mt-1 focus:outline-none dark:text-white text-black cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                <FaUserCircle size={22} />
              </motion.span>
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
