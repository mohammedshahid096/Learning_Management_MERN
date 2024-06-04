import React from "react";
import DataTable from "react-data-table-component";
import "../../../styles/table.css";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { MdDeleteOutline, MdOutlineMail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const AllUsersComponent = ({ setselectedUser }) => {
  // # Redux State
  const { loading, users } = useSelector((state) => state.AdminUserState);
  const { user } = useSelector((state) => state.AuthState);

  // # react router dom
  const navigate = useNavigate();

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
      center: true,
      wrap: true,
      grow: 3,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      grow: 3,
      center: true,
    },
    {
      name: "Courses",
      selector: (row) => row.courses,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Joined At",
      selector: (row) => row.createdAt,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Action",
      center: true,
      grow: 0,
      cell: (row) => (
        <div className="flex gap-2">
          {user?.role === "admin" && (
            <span
              className=" cursor-pointer hover:text-red-500"
              onClick={() => setselectedUser({ id: row.id, name: row.name })}
            >
              <MdDeleteOutline size={20} />
            </span>
          )}
          <span
            className=" cursor-pointer hover:text-yellow-200"
            onClick={() => navigate(`/admin/user/${row.id}`)}
          >
            <FaEye size={20} />
          </span>
        </div>
      ),
    },
    {
      name: "Email",
      center: true,
      grow: 0,
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className=" cursor-pointer hover:text-green-400"
        >
          <MdOutlineMail size={20} />
        </a>
      ),
    },
  ];

  return (
    <>
      <div className=" first:bg-white">
        <DataTable
          columns={columns}
          data={
            (users &&
              users.map((singleUser, index) => ({
                index: index + 1,
                id: singleUser?._id,
                name: singleUser?.name,
                email: singleUser?.email,
                role: singleUser?.role,
                courses: singleUser?.courses.length,
                createdAt: format(singleUser?.createdAt),
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

export default AllUsersComponent;
