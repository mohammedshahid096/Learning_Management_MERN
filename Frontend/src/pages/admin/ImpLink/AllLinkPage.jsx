import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import MetaData from "../../../utils/MetaData";
import AddLinkComponent from "./AddLinkComponent";
import { Spinner, Pagination } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { adminAllLinksAction } from "../../../Redux/actions/course.action";
import moment from "moment";
import { FaEye } from "react-icons/fa";

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

const AllLinkPage = () => {
  // # redux
  const dispatch = useDispatch();
  const { allLinks, loading, totalLinks, activePageLink } = useSelector(
    (state) => state.AdminCourseState
  );

  // # usestates
  const [currentPage, setCurrentPage] = useState(activePageLink || 1);
  const [totalPages, settotalPages] = useState(2);

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.index,
      //   width: "3rem",
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
      grow: 5,
    },
    {
      name: "Title",
      selector: (row) => row.title,
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
      name: "Edit",
      selector: (row) => row.edit,
      sortable: true,
      wrap: true,
      center: true,
    },
  ];

  const limitPerPage = 20;

  // functions
  const onPageChange = (pagenumber) => {
    setCurrentPage(pagenumber);
    fetchAllImpLinksHandler(limitPerPage, pagenumber, false);
  };

  const fetchAllImpLinksHandler = (limit = 10, page, l = true) => {
    dispatch(adminAllLinksAction(limit, page, l));
  };

  useEffect(() => {
    if (!allLinks) {
      fetchAllImpLinksHandler(limitPerPage);
    }
    if (allLinks) {
      settotalPages(Math.ceil(totalLinks / limitPerPage));
    }
  }, [allLinks]);

  return (
    <AdminLayout>
      <MetaData title="Admin- imp Links" />
      <h1 className="text-center text-2xl font-bold pb-2 ">Important Links</h1>
      <AddLinkComponent limit={limitPerPage} page={currentPage} />

      <section>
        <div className=" first:bg-whit mt-3">
          <DataTable
            columns={columns}
            data={
              (allLinks &&
                allLinks.map((singleLink, index) => ({
                  index: index + 1,
                  id: singleLink?._id,
                  title: singleLink?.title,
                  createdAt: moment(singleLink?.createdAt).format("L LT"),
                  edit: (
                    <Link
                      to={`/admin/orders/${singleLink?._id}`}
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
          {allLinks && (
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
      </section>
    </AdminLayout>
  );
};

export default AllLinkPage;
