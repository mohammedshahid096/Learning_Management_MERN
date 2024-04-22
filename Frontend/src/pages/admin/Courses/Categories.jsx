import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { Table, Spinner, Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesList } from "../../../Redux/actions/course.action";
import { format } from "timeago.js";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import CustomModal from "../../../utils/CustomModal";
import {
  AddCategoryApi,
  DeleteCategoryApi,
  UpdateCategoryApi,
} from "../../../Apis/category.api";
import toast from "react-hot-toast";
import MetaData from "../../../utils/MetaData";

const Categories = () => {
  // ### usestates
  const [addModal, setaddModal] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [selectedCategory, setselectedCategory] = useState(null);
  const [actionLoading, setactionLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteCategoryId, setdeleteCategoryId] = useState(null);

  // ### redux
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state) => state.AdminCourseState
  );

  // ### functions
  const fetchCategoryList = () => {
    dispatch(GetCategoriesList());
  };

  // # function : adding a new category
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

  // # function : updating the category
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

  // # function : delete the category
  const deleteCategoryHandler = async () => {
    setactionLoading(true);
    const response = await DeleteCategoryApi(deleteCategoryId);
    if (response.success) {
      toast.success(response?.message);
      dispatch(GetCategoriesList(false));
      setdeleteModal(false);
    } else {
      toast.error(response.message);
    }
    setactionLoading(false);
  };

  // ### useEffects
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
    if (!deleteModal) {
      setdeleteCategoryId(null);
    }
  }, [addModal, deleteModal]);

  return (
    <AdminLayout>
      <MetaData title="Admin - Category" />
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
                        <span
                          className=" cursor-pointer hover:text-red-400"
                          onClick={() => {
                            setdeleteCategoryId(category?._id);
                            setdeleteModal(true);
                          }}
                        >
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

      {/* edit and add*/}
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

      {/* delete */}
      <CustomModal
        openModal={deleteModal}
        setopenModal={setdeleteModal}
        title={"Delete Category"}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this Category?
          </h3>
          <h2 className="font-bold mb-5">{deleteCategoryId}</h2>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              disabled={actionLoading}
              isProcessing={actionLoading}
              onClick={deleteCategoryHandler}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={() => setdeleteModal(false)}
              disabled={actionLoading}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </CustomModal>
    </AdminLayout>
  );
};

export default Categories;
