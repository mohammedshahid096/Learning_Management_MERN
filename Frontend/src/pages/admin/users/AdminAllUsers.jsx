import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetUsersList } from "../../../Redux/actions/user.action";
import AllUsersComponent from "../../../components/admin/users/AllUsersComponent";
import CustomModal from "../../../utils/CustomModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";
import { DeleteUserApi } from "../../../Apis/user.api";
import toast from "react-hot-toast";

const AdminAllUsers = () => {
  // ### usestate
  const [selectedUser, setselectedUser] = useState(null);
  const [loading, setloading] = useState(false);
  const [openModal, setopenModal] = useState(false);

  // ### redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.AdminCourseState);

  const fetchUsersList = () => {
    dispatch(AdminGetUsersList());
  };

  const deleteUserSubmitHandler = async () => {
    setloading(true);
    const response = await DeleteUserApi(selectedUser?.id);
    if (response.success) {
      toast.success(response.message);
      dispatch(AdminGetUsersList(false));
      setopenModal(false);
      setselectedUser(null);
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  useEffect(() => {
    if (!users) {
      fetchUsersList();
    }
  }, []);

  useEffect(() => {
    if (selectedUser?.id) {
      setopenModal(true);
    }
  }, [selectedUser?.id]);

  return (
    <AdminLayout>
      <h1 className="text-center text-2xl font-bold pb-2 ">Users List</h1>
      <AllUsersComponent setselectedUser={setselectedUser} />

      <CustomModal
        title="Delete User"
        openModal={openModal}
        setopenModal={setopenModal}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this user?
          </h3>
          <h4 className="text-center font-bold mb-3">{selectedUser?.id}</h4>
          <h4 className="text-center font-bold mb-3">{selectedUser?.name}</h4>

          <div className="flex justify-between gap-4">
            <Button
              color="failure"
              isProcessing={loading}
              disabled={loading}
              onClick={deleteUserSubmitHandler}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setselectedUser(null);
                setopenModal(false);
              }}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </CustomModal>
    </AdminLayout>
  );
};

export default AdminAllUsers;
