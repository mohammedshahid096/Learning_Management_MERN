import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { ResetPasswordApi } from "../Apis/user.api";

const ResetPassword = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();

  //   states
  const [loading, setloading] = useState(false);

  // ### functions
  const validateSchema = Yup.object().shape({
    password: Yup.string().required("please enter your password!").min(6),
    confirmpassword: Yup.string()
      .required("please enter your password!")
      .min(6),
  });

  const sumbitFunction = async (details) => {
    if (details.password !== details.confirmpassword)
      return toast.error("password & confirm-password should be same");

    setloading(true);
    const response = await ResetPasswordApi(tokenId, {
      password: details.password,
      confirm_password: details.confirmpassword,
    });
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      // resetForm();
      sumbitFunction(values);
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="p-10">
      <Card>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-1/3 max-md:w-full">
            <h1 className=" text-4xl text-center font-bold font-mono">
              Update Your Password
            </h1>
            <br />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Enter  the password" />
              </div>
              <TextInput
                id="password"
                placeholder="*********"
                color={touched.password && errors.password ? "failure" : "gray"}
                helperText={
                  <div
                    className={
                      touched.password && errors?.password
                        ? "block mb-1"
                        : "hidden"
                    }
                  >
                    <span className="font-medium">Oops! </span>
                    {errors?.password}
                  </div>
                }
                value={values.password}
                onChange={handleChange}
                readOnly={loading}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="confirmpassword"
                  value="Enter the confirm-password"
                />
              </div>

              <TextInput
                id="confirmpassword"
                type={"password"}
                placeholder="*********"
                color={
                  touched.confirmpassword && errors.confirmpassword
                    ? "failure"
                    : "gray"
                }
                helperText={
                  <div
                    className={
                      touched.confirmpassword && errors?.confirmpassword
                        ? "block mb-1"
                        : "hidden"
                    }
                  >
                    <span className="font-medium">Oops! </span>
                    {errors?.confirmpassword}
                  </div>
                }
                value={values.confirmpassword}
                onChange={handleChange}
                readOnly={loading}
              />
            </div>

            <div className="mt-5">
              <Button
                className="w-full"
                type="submit"
                color="blue"
                isProcessing={loading}
                disabled={loading}
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
