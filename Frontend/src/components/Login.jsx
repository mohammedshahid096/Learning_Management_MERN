import React, { useEffect, useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearAuthReducer,
  LoginUserAction,
  RegisterUserAction,
  SocialUserLoginAction,
  VerifyUserAction,
} from "../Redux/actions/auth.action";
import { useAuth0 } from "@auth0/auth0-react";
import { closeLoginAccountWithDetails } from "../Redux/reducers/user.reducer";

export const Login = ({ setaccountType, setOpenModal }) => {
  // ### usestates
  const [showPassword, setshowPassword] = useState(false);

  // ### Autho
  const {
    loginWithPopup,
    isAuthenticated,
    user: AuthUser,
    logout,
  } = useAuth0();

  // ### react redux
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.AuthState);
  const { AccountDetails } = useSelector((state) => state.OpenAccountState);

  // ### functions
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("please enter your email!"),
    password: Yup.string().required("please enter your password!").min(6),
  });

  const sumbitFunction = (details) => {
    if (AccountDetails) {
      dispatch(closeLoginAccountWithDetails());
    }
    dispatch(LoginUserAction(details));
  };

  const clearErrorFunction = () => {
    dispatch(ClearAuthReducer());
  };

  const formik = useFormik({
    initialValues: {
      email: AccountDetails?.email || "",
      password: AccountDetails?.password || "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
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

    if (user) {
      toast.success(`Welcome ${user.email} for login`);
      setOpenModal(false);
    }
  }, [error, user]);

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit}>
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
            readOnly={loading}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
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

            <div
              className={`absolute ${
                errors?.password ? "top-1/3" : "top-1/2"
              } right-3 transform -translate-y-1/2 cursor-pointer dark:text-white text-black`}
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <a
            href="#"
            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Lost Password?
          </a>
        </div>
        <div>
          <Button
            className="w-full"
            type="submit"
            color="blue"
            isProcessing={loading}
          >
            Log in to your account
          </Button>
        </div>
      </form>

      <div className="flex justify-center text-black dark:text-white font-bold">
        {" "}
        or{" "}
      </div>

      <div className="flex gap-2">
        <Button color="failure" onClick={() => loginWithPopup()}>
          <FaGoogle className="h-4 -ml-1 mr-2" />
          Sign in with Google
        </Button>

        <Button color="dark" onClick={logout}>
          <FaGithub className=" h-4 -ml-1 mr-2" />
          Sign in with GitHub
        </Button>
      </div>

      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?&nbsp;
        <span
          onClick={() => setaccountType("signup")}
          className="text-cyan-700 hover:underline dark:text-cyan-500"
        >
          Create account
        </span>
      </div>
    </div>
  );
};

export const Register = ({ setaccountType }) => {
  // ### usestates
  const [showPassword, setshowPassword] = useState(false);

  // ### react redux
  const dispatch = useDispatch();
  const { error, loading, message, ActivationToken } = useSelector(
    (state) => state.AuthState
  );

  // ### functions
  const validateSchema = Yup.object().shape({
    name: Yup.string().required("please enter your name!").min(6),
    email: Yup.string()
      .email("Invalid email")
      .required("please enter your email!"),
    password: Yup.string().required("please enter your password!").min(6),
  });

  const sumbitFunction = (details) => {
    dispatch(RegisterUserAction(details));
  };

  const clearErrorFunction = () => {
    dispatch(ClearAuthReducer());
  };

  const ResetMessageFunction = () => {
    dispatch(RegisterUserAction(null, true));
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
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

  useEffect(() => {
    if (ActivationToken) {
      setaccountType("verify");
    }
    if (message) {
      toast.success(message);
      ResetMessageFunction();
    }
  }, [ActivationToken, message]);

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            placeholder="Enter Your Name"
            color={touched.name && errors.name ? "failure" : "gray"}
            helperText={
              <div
                className={
                  touched.name && errors?.name ? "block mb-1" : "hidden"
                }
              >
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
            readOnly={loading}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
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

            <div
              className={`absolute ${
                errors?.password ? "top-1/3" : "top-1/2"
              } right-3 transform -translate-y-1/2 cursor-pointer dark:text-white text-black`}
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            className="w-full"
            type="submit"
            color="blue"
            isProcessing={loading}
          >
            Register with OTP
          </Button>
        </div>
      </form>
      <div className="flex justify-center text-black dark:text-white font-bold">
        {" "}
        or{" "}
      </div>

      <div className="flex gap-2">
        <Button color="failure">
          <FaGoogle className="h-4 -ml-1 mr-2" />
          Sign in with Google
        </Button>

        <Button color="dark">
          <FaGithub className=" h-4 -ml-1 mr-2" />
          Sign in with GitHub
        </Button>
      </div>

      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?&nbsp;
        <span
          onClick={() => setaccountType("login")}
          className="text-cyan-700 hover:underline dark:text-cyan-500"
        >
          Login here
        </span>
      </div>
    </div>
  );
};

export const VerifyAccount = ({ setaccountType }) => {
  // ### usestates
  const [verifyNumbers, setverifyNumbers] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [shouldSubmit, setshouldSubmit] = useState(false);
  const [shake, setshake] = useState(false);

  // ### react redux
  const dispatch = useDispatch();
  const {
    error,
    loading,
    statusCode,
    message,
    ActivationToken,
    AccountCreated,
    token,
  } = useSelector((state) => state.AuthState);

  // ### functions
  const VerifySubmitFunction = () => {
    const otp = verifyNumbers.join("");

    const details = { activation_code: otp, activation_token: ActivationToken };
    dispatch(VerifyUserAction(details));
  };

  const clearErrorFunction = () => {
    dispatch(ClearAuthReducer());
  };

  const DestroyActivationFunction = () => {
    dispatch(VerifyUserAction(null, false, true));
  };

  const ResetMessageFunction = () => {
    dispatch(VerifyUserAction(null, true));
  };

  const handleInputChange = (number, index) => {
    let update = [...verifyNumbers];
    update[index] = number;
    setverifyNumbers(update);

    if (number === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (number.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const check = update.some((item) => item === "");
    if (!check) {
      setshouldSubmit(true);
    } else {
      setshouldSubmit(false);
      setshake(false);
    }
  };

  const changeToLoginFunction = () => {
    DestroyActivationFunction();
    setaccountType("login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setshake(true);
      if (statusCode === 401) {
        DestroyActivationFunction();
        setaccountType("signup");
      }
      clearErrorFunction();
      setshouldSubmit(false);
      setverifyNumbers(["", "", "", ""]);
      inputRefs[0].current?.focus();
    }

    if (AccountCreated) {
      setaccountType("login");
      toast.success(message);
      ResetMessageFunction();
      DestroyActivationFunction();
    }
  }, [error, AccountCreated]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-center text-black dark:text-white font-bold text-xl">
          Verify Your Account
        </h1>

        <div className="w-full flex items-center justify-center my-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex justify-center items-center text-white">
            <VscWorkspaceTrusted size={35} />
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-center">
        {verifyNumbers.map((item, index) => {
          return (
            <input
              type="number"
              key={index}
              className={`w-10 h-10 bg-transparent border-2 rounded-md flex gap-2 text-black dark:text-white justify-center text-xl outline-none text-center ${
                shake
                  ? "border-red-600 shake"
                  : "border-black dark:border-white"
              }`}
              maxLength={1}
              value={item}
              ref={inputRefs[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              inputMode="number"
              readOnly={shouldSubmit}
            />
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          color="blue"
          disabled={!shouldSubmit}
          isProcessing={loading}
          onClick={VerifySubmitFunction}
        >
          Submit OTP
        </Button>
      </div>

      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?&nbsp;
        <span
          onClick={changeToLoginFunction}
          className="text-cyan-700 hover:underline dark:text-cyan-500"
        >
          login here
        </span>
      </div>
    </div>
  );
};
