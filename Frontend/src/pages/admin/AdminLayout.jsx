import React from "react";
import { AdminNavbar, TeacherNavbar } from "../../components/admin/AdminNavbar";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.AuthState);

  return (
    <div className="flex gap-3 min-h-[90vh] max-md:flex-col ">
      <div className="w-1/5  max-md:w-full">
        {user?.role === "admin" ? (
          <AdminNavbar user={user} />
        ) : (
          <TeacherNavbar />
        )}
      </div>

      <div className="w-4/5 max-md:w-full flex rounded-lg border border-gray-200 bg-white shadow-md dark:border- dark:bg-gray-800">
        <div className="p-5 w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
