import React from "react";
import DataTable from "react-data-table-component";
import "../../../styles/table.css";
import { Spinner, ToggleSwitch } from "flowbite-react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";

const customStyles = {
  table: {
    style: {
      minHeight: "72vh",
      backgroundColor: "rgb(31 41 55)",
      borderLeft: "1px #e5e7eb59 solid",
      borderRight: "1px #e5e7eb59 solid",
    },
  },
  headRow: {
    style: {
      backgroundColor: "rgb(126 58 242)",
      color: "white",
      fontWeight: 700,
      fontSize: "larger",
    },
  },
  rows: {
    style: {
      backgroundColor: "rgb(31 41 55)",
    },
  },
  cells: {
    style: {
      backgroundColor: "rgb(31 41 55)",
      color: "white",
      borderBottom: "#e5e7eb59 0.2px solid",
    },
  },
  pagination: {
    style: {
      backgroundColor: "rgb(126 58 242)",
      color: "white",
      minHeight: "10px",
    },
  },
};

const Loader = () => {
  return (
    <div className="bg bg-gray-800 w-full h-full flex justify-center items-center">
      <Spinner aria-label="Large spinner example" size="xl" />
    </div>
  );
};

const AllCoursesComponent = ({
  setselectedCourseid,
  active_disableSubmitHandler,
  activeLoading,
}) => {
  // ### redux
  const { loading, courses } = useSelector((state) => state.AdminCourseState);

  const columns = [
    {
      name: "S.No",
      // selector: (row) => row.index,
      width: "5rem",
      wrap: true,
      center: true,
      cell: (row) => (
        <div className="font-bold text-purple-400"> {row.index} </div>
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      grow: 2,
      center: true,
    },
    {
      name: "Course Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
      center: true,
    },
    {
      name: "Ratings",
      selector: (row) => row.rating,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Purchased",
      selector: (row) => row.purchase,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Active",
      center: true,
      grow: 0,
      cell: (row) => (
        <span>
          <ToggleSwitch
            onChange={() => active_disableSubmitHandler(!row.isActive, row.id)}
            checked={row?.isActive}
            color="green"
            sizing={"sm"}
            disabled={activeLoading}
          />
        </span>
      ),
    },

    {
      name: "Actions",
      center: true,
      grow: 0,
      cell: (row) => (
        <div className="flex gap-3">
          <Link
            to={`/admin/course/${row.id}`}
            className=" cursor-pointer hover:text-green-400"
          >
            <MdModeEdit size={20} />
          </Link>
          <span
            className=" cursor-pointer hover:text-red-500"
            onClick={() => setselectedCourseid(row.id)}
          >
            <MdDeleteOutline size={20} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" first:bg-white">
        <DataTable
          columns={columns}
          data={
            (courses &&
              courses.map((singleCourse, index) => ({
                index: index + 1,
                id: singleCourse?._id,
                title: singleCourse?.name,
                level: singleCourse?.level,
                rating: singleCourse?.rating,
                purchase: singleCourse?.purchase,
                isActive: singleCourse?.isActive,
                createdAt: format(singleCourse?.createdAt),
              }))) ||
            []
          }
          pagination
          fixedHeader
          progressPending={loading}
          customStyles={customStyles}
          progressComponent={<Loader />}
        />
      </div>
    </>
  );
};

export default AllCoursesComponent;
