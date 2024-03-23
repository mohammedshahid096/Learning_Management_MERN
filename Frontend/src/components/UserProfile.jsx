import { Button, Card, Avatar, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearAuthReducer,
  UpdateUserDetailAction,
} from "../Redux/actions/auth.action";
import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { URLConstant } from "../config/URLConstant";

export const UserProfileData = () => {
  const [isReadOnly, setisReadOnly] = useState(true);
  // ### react redux
  const dispatch = useDispatch();
  const { error, loading, user, message, isUpdated } = useSelector(
    (state) => state.AuthState
  );

  // ### functions
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("please enter your email!")
      .min(5),
    name: Yup.string().required("please enter your password!").min(6),
  });

  const sumbitUpdateHandlerFunction = (details) => {
    dispatch(UpdateUserDetailAction(details));
  };

  const resetSuccessFunction = () => {
    setisReadOnly(true);
    dispatch(UpdateUserDetailAction(null, true));
  };

  const clearErrorFunction = () => {
    dispatch(ClearAuthReducer());
  };

  const formik = useFormik({
    initialValues: { email: user?.email, name: user?.name },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      sumbitUpdateHandlerFunction(values);
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  // ### use effect
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
    if (isUpdated) {
      toast.success(message);
      resetSuccessFunction();
    }
  }, [error, message]);

  return (
    <Card>
      <div>
        <h1 className=" text-center text-3xl font-bold text-gray-500">
          Account Details
        </h1>
      </div>
      <div className="flex flex-col items-center pb-10">
        <Avatar
          img={user?.profile?.url}
          size="lg"
          // className="shadow"
          bordered
          color={"success"}
          rounded
        />

        <form onSubmit={handleSubmit} className="w-1/2 max-md:w-full space-y-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              placeholder="Enter Your Name"
              color={errors.name ? "failure" : "gray"}
              helperText={
                <div className={errors?.name ? "block mb-1" : "hidden"}>
                  <span className="font-medium">Oops! </span>
                  {errors?.name}
                </div>
              }
              value={values.name}
              onChange={handleChange}
              readOnly={isReadOnly || loading}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              color={touched.email && errors.email ? "failure" : "gray"}
              helperText={
                <div
                  className={
                    touched.email && errors?.email ? "block mb-1" : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {errors?.email}
                </div>
              }
              value={values.email}
              onChange={handleChange}
              readOnly={isReadOnly || loading}
            />
          </div>

          {!user?.isSocialAuth && (
            <div>
              {isReadOnly ? (
                <Button color="purple" onClick={() => setisReadOnly(false)}>
                  Edit
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    color="green"
                    type="submit"
                    processingSpinner={loading}
                  >
                    Update
                  </Button>
                  <Button
                    className=""
                    color="failure"
                    onClick={() => setisReadOnly(true)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};

export const ChangeUserPassword = () => {
  const [loading, setloading] = useState(false);

  const validateSchema = Yup.object().shape({
    old_password: Yup.string()
      .required("please enter your old password")
      .min(8),
    new_password: Yup.string()
      .required("please enter your new password!")
      .min(8),
    confirm_password: Yup.string()
      .required("please enter your confirm password!")
      .min(8),
  });

  const passwordChangeSubmitHandler = async () => {
    setloading(true);
    const details = {
      old_password: values?.old_password,
      new_password: values?.new_password,
    };
    try {
      const { data } = await axiosInstance.put(
        `${URLConstant}/user/me/update-password`,
        details,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("successfully updated the password");
        setloading(false);
        return true;
      } else {
        setloading(false);
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      setloading(false);
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const formik = useFormik({
    initialValues: { old_password: "", new_password: "", confirm_password: "" },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.confirm_password === values.old_password) {
        toast.error("old password new password should not be equal");
        return;
      } else {
        const response = await passwordChangeSubmitHandler();
        if (response) {
          resetForm();
        }
      }
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <Card>
      <div>
        <h1 className=" text-center text-3xl font-bold text-gray-400">
          Change Password
        </h1>
      </div>
      <div className="flex flex-col items-center pb-10">
        <form onSubmit={handleSubmit} className="w-1/2 max-md:w-full space-y-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="old_password" value="Enter your old password" />
              <span className=" text-red-600"> *</span>
            </div>
            <TextInput
              id="old_password"
              placeholder="old password ..."
              color={
                touched?.old_password && errors.old_password
                  ? "failure"
                  : "gray"
              }
              helperText={
                <div
                  className={
                    touched?.old_password && errors?.old_password
                      ? "block mb-1"
                      : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {errors?.old_password}
                </div>
              }
              value={values?.old_password}
              onChange={handleChange}
              readOnly={loading}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="new_password" value="Enter your new password" />
              <span className=" text-red-600"> *</span>
            </div>
            <TextInput
              id="new_password"
              placeholder="new password ..."
              color={
                touched?.new_password && errors.new_password
                  ? "failure"
                  : "gray"
              }
              helperText={
                <div
                  className={
                    touched?.new_password && errors?.new_password
                      ? "block mb-1"
                      : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {errors?.new_password}
                </div>
              }
              value={values.new_password}
              onChange={handleChange}
              readOnly={loading}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="confirm_password"
                value="Enter your confirm password"
              />
              <span className=" text-red-600"> *</span>
            </div>
            <TextInput
              id="confirm_password"
              placeholder="confirm password ..."
              color={
                touched?.confirm_password && errors.confirm_password
                  ? "failure"
                  : "gray"
              }
              helperText={
                <div
                  className={
                    touched?.confirm_password && errors?.confirm_password
                      ? "block mb-1"
                      : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {touched?.confirm_password && errors?.confirm_password}
                </div>
              }
              value={values.confirm_password}
              onChange={handleChange}
              readOnly={loading}
            />
          </div>

          {values.old_password !== "" &&
            values.new_password !== "" &&
            values.confirm_password !== "" &&
            values.new_password === values.confirm_password && (
              <div>
                <Button color="green" type="submit" isProcessing={loading}>
                  Update Password
                </Button>
              </div>
            )}
        </form>
      </div>
    </Card>
  );
};
