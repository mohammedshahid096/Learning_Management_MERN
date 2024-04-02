import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { Table, Spinner, Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesList } from "../../../Redux/actions/course.action";
import { format } from "timeago.js";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import CustomModal from "../../../utils/CustomModal";
import { AddCategoryApi, UpdateCategoryApi } from "../../../Apis/category.api";
import toast from "react-hot-toast";

const Categories = () => {
  // ### usestates
  const [addModal, setaddModal] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [selectedCategory, setselectedCategory] = useState(null);
  const [actionLoading, setactionLoading] = useState(false);

  // ### redux
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state) => state.AdminCourseState
  );

  const fetchCategoryList = () => {
    dispatch(GetCategoriesList());
  };

  const addNewCategoryHandler = async () => {
    setactionLoading(true);
    const response = await AddCategoryApi({ name: categoryName });
    if (response.success) {
      toast.success(response.message);
      dispatch(GetCategoriesList(false));
      setaddModal(false);
    } else {
      toast.error(response.message);
    }
    setactionLoading(false);
  };

  const updateCategoryHandler = async () => {
    setactionLoading(true);
    const response = await UpdateCategoryApi(selectedCategory, {
      name: categoryName,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(GetCategoriesList(false));
      setaddModal(false);
    } else {
      toast.error(response.message);
    }
    setactionLoading(false);
  };

  useEffect(() => {
    if (!categories) {
      fetchCategoryList();
    }
  }, []);

  useEffect(() => {
    if (!addModal) {
      setselectedCategory(null);
      setcategoryName(null);
    }
  }, [addModal]);

  return (
    <AdminLayout>
      <h1 className="text-center text-2xl font-bold pb-2 ">
        Categories List :
      </h1>

      <div className="flex justify-end">
        <Button color="green" onClick={() => setaddModal(true)}>
          <IoAdd /> Add New Category
        </Button>
      </div>
      <br />

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="info" aria-label="Info spinner example" size={"xl"} />
        </div>
      ) : (
        <div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>S.No</Table.HeadCell>
              <Table.HeadCell>Category ID</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell className="text-center">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border-b-2">
              {categories &&
                categories?.map((category, index) => (
                  <Table.Row
                    className="border-b-2 border-gray-600 dark:border-gray-400"
                    key={category?._id}
                  >
                    <Table.Cell className="text-purple-300">
                      {index + 1}.
                    </Table.Cell>
                    <Table.Cell>{category?._id}</Table.Cell>
                    <Table.Cell className="capitalize font-bold">
                      {category?.name}
                    </Table.Cell>
                    <Table.Cell>{format(category?.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-around">
                        <span
                          className=" cursor-pointer hover:text-green-400"
                          onClick={() => {
                            setcategoryName(category?.name);
                            setselectedCategory(category?._id);
                            setaddModal(true);
                          }}
                        >
                          <MdModeEdit size={20} />
                        </span>
                        <span className=" cursor-pointer hover:text-red-400">
                          <MdDeleteOutline size={20} />
                        </span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}

      <CustomModal
        openModal={addModal}
        setopenModal={setaddModal}
        title={selectedCategory ? "Update Category" : "Add New Category"}
      >
        <div className="space-y-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="categoryname" value="Category Name " />
            </div>
            <TextInput
              id="categoryname"
              type="text"
              placeholder="Enter Category Name"
              required
              shadow
              onChange={(e) => setcategoryName(e.target.value)}
              value={categoryName}
            />
          </div>
          <br />
          <div>
            <Button
              className="w-full"
              pill
              disabled={categoryName === "" || actionLoading ? true : false}
              isProcessing={actionLoading}
              onClick={
                selectedCategory ? updateCategoryHandler : addNewCategoryHandler
              }
            >
              Submit
            </Button>
          </div>
        </div>
      </CustomModal>
    </AdminLayout>
  );
};

export default Categories;
