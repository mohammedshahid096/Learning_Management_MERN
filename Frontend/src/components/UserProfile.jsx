import { Button, Card, Avatar, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearAuthReducer,
  LoginUserAction,
} from "../Redux/actions/auth.action";
import { useState, useEffect } from "react";

export const UserProfileData = () => {
  const [isReadOnly, setisReadOnly] = useState(true);
  // ### react redux
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.AuthState);

  // ### functions
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("please enter your email!"),
    password: Yup.string().required("please enter your password!").min(6),
  });

  const sumbitFunction = (details) => {
    dispatch(LoginUserAction(details));
  };

  const clearErrorFunction = () => {
    dispatch(ClearAuthReducer());
  };

  const formik = useFormik({
    initialValues: { email: user?.email, name: user?.name },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // resetForm();
      sumbitFunction(values);
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  // ### use effect
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorFunction();
    }
  }, [error]);

  return (
    <Card>
      <div className="flex flex-col items-center pb-10">
        <Avatar
          img="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
          size="lg"
          className="shadow-lg"
          bordered
          color={"success"}
          rounded
        />

        <form onSubmit={handleSubmit} className="w-1/2 space-y-3">
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
              readOnly={loading}
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

          <div>
            {isReadOnly ? (
              <Button
                className=""
                color="purple"
                onClick={() => setisReadOnly(false)}
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button className="" color="green" type="submit">
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
        </form>
      </div>
    </Card>
  );
};
