import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetUsersList } from "../../../Redux/actions/user.action";
import AdminTeamComponent from "../../../components/admin/users/AdminTeamComponent";
import { Button, TextInput, Label, Select } from "flowbite-react";
import CustomModal from "../../../utils/CustomModal";
import { UpdateUserRoleApi } from "../../../Apis/user.api";
import toast from "react-hot-toast";

const AdminTeam = () => {
  // usestates
  const [selectedUser, setselectedUser] = useState(null);
  const [selectedRole, setselectedRole] = useState("admin");
  const [loading, setloading] = useState(false);
  const [openModal, setopenModal] = useState(false);
  // redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.AdminCourseState);

  const fetchUsersList = () => {
    dispatch(AdminGetUsersList());
  };

  useEffect(() => {
    if (!users) {
      fetchUsersList();
    }
  }, []);

  const updateUserHandler = async () => {
    setloading(true);
    const response = await UpdateUserRoleApi(
      { role: selectedRole },
      selectedUser
    );
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
  return (
    <AdminLayout>
      <div className="float-end">
        <Button color="green" onClick={() => setopenModal(true)}>
          Add New Member
        </Button>
      </div>
      <br />
      <h1 className="text-center text-2xl font-bold pb-2 ">My Team List</h1>
      <AdminTeamComponent />

      <CustomModal
        openModal={openModal}
        setopenModal={setopenModal}
        title={"Add New Member"}
      >
        <div className="space-y-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userid" value="User Id" />
            </div>
            <TextInput
              id="userid"
              type="text"
              placeholder="User MongoDb Object ID"
              required
              shadow
              onChange={(e) => setselectedUser(e.target.value)}
              value={selectedUser}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Select User Role" />
            </div>
            <Select
              id="role"
              required
              value={selectedRole}
              onChange={(e) => setselectedRole(e.target.value)}
            >
              <option value={"admin"}>Admin</option>
              <option value={"user"}>User</option>
              <option value={"Teacher"}>Teacher</option>
            </Select>
          </div>
          <br />
          <div>
            <Button
              className="w-full"
              pill
              disabled={selectedUser === null || loading ? true : false}
              isProcessing={loading}
              onClick={updateUserHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      </CustomModal>
    </AdminLayout>
  );
};

export default AdminTeam;
