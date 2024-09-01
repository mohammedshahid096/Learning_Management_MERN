import React from "react";
import { Sidebar } from "flowbite-react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../../utils/MetaData";
import { IoLogoJavascript } from "react-icons/io5";

const SidebarsItems = [
  { name: "All Snippets", icon: BsGrid3X3Gap, link: "/snippets" },
  { name: "Favorites", icon: FaRegHeart, link: "/snippets/favorites" },
  { name: "Trash", icon: FaRegTrashCan, link: "/snippets/trash" },
];

const SnippetSidebar = () => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;

  return (
    <Sidebar aria-label="Default sidebar example" className=" w-3/12">
      {/* <MetaData title={"Snippets"} /> */}
      <h1 className="text-xl  text-center">
        <span className=" text-purple-900 font-extrabold text-4xl">
          Snippet
        </span>{" "}
        Master
      </h1>

      <br />
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {SidebarsItems.map((item) => (
            <Sidebar.Item
              icon={item.icon}
              onClick={() => navigate(item.link)}
              key={item.link}
              className={
                item.link === activeTab ? "bg-gray-100 dark:bg-gray-700" : ""
              }
            >
              {item.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Languages:
        </h2>
        <br />
        <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400 pl-4">
          <li className="flex items-center justify-between">
            <p className="flex gap-2 items-center">
              <IoLogoJavascript /> Javascript{" "}
            </p>
            <p>3</p>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default SnippetSidebar;
