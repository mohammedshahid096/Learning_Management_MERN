import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import MetaData from "../../../utils/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminGetAllOrdersList } from "../../../Redux/actions/order.action";
import moment from "moment";
import { Pagination } from "flowbite-react";

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
  // # react router dom
  const navigate = useNavigate();

  // # redux
  const dispatch = useDispatch();
  const { allOrders, loading, totalOrders, activePage } = useSelector(
    (state) => state.AdminCourseState
  );

  // # usestates
  const [currentPage, setCurrentPage] = useState(activePage || 1);
  const [totalPages, settotalPages] = useState(2);

  const columns = [
    {
      name: "S.No",
      // selector: (row) => row.index,
      width: "3rem",
      wrap: true,
      center: true,
      cell: (row) => (
        <div className="font-bold text-purple-400"> {row.index} </div>
      ),
    },
    {
      name: "UUID",
      selector: (row) => row.uuid,
      sortable: true,
      center: true,
      wrap: true,
      grow: 5,
    },
    {
      name: "Order ID",
      selector: (row) => row.orderid,
      sortable: true,
      center: true,
      wrap: true,
      grow: 3,
    },
    {
      name: "Payment ID",
      selector: (row) => row.paymentid,
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
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.orderStatus,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Purchase",
      selector: (row) => row.createdAt,
      sortable: true,
      wrap: true,
      center: true,
    },

    {
      name: "View",
      selector: (row) => row.view,
      sortable: true,
      wrap: true,
      center: true,
    },
  ];

  const limitPerPage = 10;

  // functions
  const onPageChange = (pagenumber) => {
    setCurrentPage(pagenumber);
    fetchAllOrdersHandler(limitPerPage, pagenumber, false);
  };

  const fetchAllOrdersHandler = (limit = 10, page, l = true) => {
    dispatch(AdminGetAllOrdersList(limit, page, l));
  };

  useEffect(() => {
    if (!allOrders) {
      fetchAllOrdersHandler(limitPerPage);
    }
    if (allOrders) {
      settotalPages(Math.ceil(totalOrders / limitPerPage));
    }
  }, [allOrders]);

  // useEffect(() => {
  //   fetchAllOrdersHandler(limitPerPage, currentPage, false);
  // }, [currentPage]);

  return (
    <AdminLayout>
      <MetaData title="Admin- All Orders" />
      <h1 className="text-center text-2xl font-bold pb-2 ">Purchase Orders</h1>
      <div className=" first:bg-white">
        <DataTable
          columns={columns}
          data={
            (allOrders &&
              allOrders.map((singleOrder, index) => ({
                index: index + 1,
                uuid: singleOrder?.uuid,
                orderid: singleOrder?.paymentInfo?.order_id,
                paymentid: singleOrder?.paymentInfo?.id,
                name: singleOrder?.user?.name,
                course: singleOrder?.courseid?.name,
                amount:
                  singleOrder?.paymentInfo &&
                  singleOrder?.paymentInfo.amount / 100,
                orderStatus: singleOrder?.orderStatus,
                createdAt: moment(singleOrder?.createdAt).format("L LT"),
                view: (
                  <Link
                    to={`/admin/orders/${singleOrder?._id}`}
                    className="hover:text-green-500"
                  >
                    <FaEye />
                  </Link>
                ),
              }))) ||
            []
          }
          // pagination
          fixedHeader
          progressPending={loading}
          customStyles={customStyles}
          progressComponent={<Loader />}
        />
        {allOrders && (
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
