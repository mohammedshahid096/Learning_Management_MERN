import React from "react";
import DataTable from "react-data-table-component";
import "../../../styles/table.css";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const customStyles = {
  table: {
    style: {
      minHeight: "65vh",
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
    grow: 2,
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
];

const Loader = () => {
  return (
    <div className="bg bg-gray-800 w-full h-full flex justify-center items-center">
      <Spinner aria-label="Large spinner example" size="xl" />
    </div>
  );
};

const AdminTeamComponent = () => {
  const { loading, users } = useSelector((state) => state.AdminUserState);

  return (
    <>
      <div className=" first:bg-white">
        <DataTable
          columns={columns}
          data={
            (users &&
              users
                .filter((item) => item?.role !== "user")
                .map((singleUser, index) => ({
                  index: index + 1,
                  id: singleUser?._id,
                  name: singleUser?.name,
                  email: singleUser?.email,
                  role: singleUser?.role,
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

export default AdminTeamComponent;
