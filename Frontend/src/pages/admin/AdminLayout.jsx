import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Card } from "flowbite-react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex gap-3 min-h-[90vh] max-md:flex-col ">
      <div className="w-1/5 max-md:w-full">
        <AdminNavbar />
      </div>

      <div className="w-full flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
