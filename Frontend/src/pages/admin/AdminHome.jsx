import React from "react";
import AdminLayout from "./AdminLayout";
import {
  UserDashboardRole,
  UserDashboardSocialDonut,
  UserDashboardYearWise,
} from "../../components/Dashboard/UserDashboard";
import CustomLoader from "../../utils/Loader";
import { Card } from "flowbite-react";

const Skeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="flex gap-4 mb-4">
        <Card className="w-4/12 flex-1">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8/12  mb-2.5"></div>
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-2"></div>
          <div class="flex items-center w-full">
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/12"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/12"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-8/12"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-2"></div>
        </Card>
        <Card className="w-2/6">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8/12  mb-2.5"></div>
          <div class="flex items-center w-full">
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/12"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-2/12"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-8/12"></div>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-2"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-2"></div>
        </Card>
      </div>

      <Card>
        <div class="flex items-baseline mt-4">
          <div class="w-full bg-gray-200 rounded-t-lg h-64 dark:bg-gray-700"></div>
          <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-60 ms-6 dark:bg-gray-700"></div>
          <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-64 ms-6 dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-60 ms-6 dark:bg-gray-700"></div>
        </div>
      </Card>
    </div>
  );
};

const AdminHome = () => {
  const loading = false;
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className="flex max-md:flex-col gap-4 mb-4">
            <UserDashboardRole className="w-4/6 max-md:w-full" />
            <UserDashboardSocialDonut className="w-2/6  max-md:w-full" />
          </div>
          <UserDashboardYearWise />
        </>
      )}
      <CustomLoader loading={loading} />
    </AdminLayout>
  );
};

export default AdminHome;
