import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import MetaData from "../../../utils/MetaData";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminGetAllOrdersList } from "../../../Redux/actions/order.action";

const Loader = () => {
  return (
    <div className="bg bg-gray-800 w-full h-full flex justify-center items-center">
      <Spinner aria-label="Large spinner example" size="xl" />
    </div>
  );
};

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

export const AllOrdersComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.AdminUserState);

  const users = null;
  const loading = false;

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

  const fetchAllOrdersHandler = () => {
    dispatch(AdminGetAllOrdersList());
  };

  useEffect(() => {
    if (!allOrders) {
      fetchAllOrdersHandler();
    }
  }, [allOrders]);
  return (
    <AdminLayout>
      <MetaData title="Admin- All Orders" />
      <h1 className="text-center text-2xl font-bold pb-2 ">Purchase Orders</h1>
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
    </AdminLayout>
  );
};
