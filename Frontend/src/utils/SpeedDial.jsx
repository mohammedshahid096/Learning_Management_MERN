import { Table, Tooltip } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { openLoginAccountWithDetails } from "../Redux/reducers/user.reducer";

const details = {
  successRazopay: "success@razorpay",
  failureRazopay: "failure@razorpay",
  visaCard: "4111111111111111",
  masterCard: "5267318187975449",
};

const CustomSpeedDail = ({ status }) => {
  const [openSpeedDailOptions, setopenSpeedDailOptions] = useState(false);
  const [paymentExampleModel, setpaymentExampleModel] = useState(false);
  const [usersExampleModel, setusersExampleModel] = useState(false);
  const hiddenRef = useRef();

  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.AuthState);

  const paymentOptions = [
    {
      id: 1,
      method: "UPI",
      value: details.successRazopay,
      extraDetails: null,
      clipboard: details.successRazopay,
    },
    {
      id: 2,
      method: "UPI",
      value: details.failureRazopay,
      extraDetails: null,
      clipboard: details.failureRazopay,
    },
    {
      id: 3,
      method: "Visa Card",
      value: details.visaCard,
      extraDetails: null,
      clipboard: details.visaCard,
    },
    {
      id: 5,
      method: "Master Card",
      value: details.masterCard,
      extraDetails: null,
      clipboard: details.masterCard,
    },
  ];

  const usersOptions = [
    { id: 1, role: "Admin", email: "admin@example.com", password: "Admin@123" },
    { id: 2, role: "User", email: "user@example.com", password: "User@123" },
    {
      id: 3,
      role: "User",
      email: "tapirow782@bsomek.com",
      password: "Test@123",
    },
    {
      id: 4,
      role: "User",
      email: "merabec951@huleos.com",
      password: "Test@123",
    },
  ];

  const copyFunctionHandler = (message, model) => {
    navigator.clipboard.writeText(message);
    toast.success("successfully copoied the text");
    if (model === "payment") {
      setpaymentExampleModel(false);
    }
  };

  const handleMouseEnter = () => {
    setopenSpeedDailOptions(true);
  };

  const userAddCredentialsFunc = (email, password) => {
    if (user) {
      toast.success("Already your login");
    } else {
      dispatch(openLoginAccountWithDetails({ email, password }));
      setusersExampleModel(false);
    }
  };

  useEffect(() => {
    const routes = "/,/search-courses,/websites,/privacy-policy,/about";
    if (status) {
      hiddenRef.current.hidden = false;
      setopenSpeedDailOptions(true);
    } else if (routes.includes(location.pathname)) {
      console.log(location.pathname);
      hiddenRef.current.hidden = false;
    } else {
      hiddenRef.current.hidden = true;
    }
  }, [location.pathname]);

  return (
    <>
      <div
        data-dial-init
        className="fixed end-6 bottom-6 group"
        ref={hiddenRef}
      >
        <div
          id="speed-dial-menu-default"
          className={` ${
            openSpeedDailOptions ? "flex" : "hidden"
          } flex-col items-center  mb-4 space-y-2`}
        >
          <Tooltip content="Payment" placement="left">
            <button
              type="button"
              data-tooltip-target="tooltip-copy"
              data-tooltip-placement="left"
              className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              onClick={() => setpaymentExampleModel(true)}
            >
              <CiCreditCard1 size={30} />
            </button>
          </Tooltip>
          <Tooltip content="Auth Users" placement="left">
            <button
              type="button"
              data-tooltip-target="tooltip-copy"
              data-tooltip-placement="left"
              className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              onClick={() => setusersExampleModel(true)}
            >
              <CiUser size={30} />
            </button>
          </Tooltip>
        </div>

        <Tooltip content="Credentials Examples" placement="left">
          <button
            type="button"
            onMouseEnter={handleMouseEnter}
            onClick={() => setopenSpeedDailOptions(!openSpeedDailOptions)}
            className="flex items-center justify-center text-white  rounded-full w-14 h-14 bg-black dark:bg-purple-800 focus:ring-4 focus:ring-purple-300 focus:outline-none dark:focus:ring-purple-800 hover:rotate-45 transition-transform"
          >
            <IoMdAdd size={30} />
            <span className="sr-only">Open actions menu</span>
          </button>
        </Tooltip>
      </div>

      {/* payment model */}
      <CustomModal
        title={"Payment Example"}
        openModal={paymentExampleModel}
        setopenModal={setpaymentExampleModel}
        size="xl"
      >
        <Table>
          <Table.Head>
            <Table.HeadCell>S.No</Table.HeadCell>
            <Table.HeadCell>Method</Table.HeadCell>
            <Table.HeadCell>Value</Table.HeadCell>
            <Table.HeadCell>Copy</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {paymentOptions.map((singleitem) => (
              <Table.Row key={singleitem.id}>
                <Table.Cell className="text-purple-400">
                  {singleitem.id}.
                </Table.Cell>
                <Table.Cell>{singleitem.method}</Table.Cell>
                <Table.Cell>{singleitem.value}</Table.Cell>
                <Table.Cell>
                  <FaCopy
                    size={16}
                    className=" hover:text-green-400 cursor-copy"
                    onClick={() =>
                      copyFunctionHandler(singleitem.clipboard, "payment")
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </CustomModal>

      {/* users model */}
      <CustomModal
        title={"Users Examples"}
        openModal={usersExampleModel}
        setopenModal={setusersExampleModel}
        size="2xl"
      >
        <Table>
          <Table.Head>
            <Table.HeadCell>S.No</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Password</Table.HeadCell>
            <Table.HeadCell>Copy</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {usersOptions.map((singleitem) => (
              <Table.Row key={singleitem.id}>
                <Table.Cell className=" text-purple-400">
                  {singleitem.id}.
                </Table.Cell>
                <Table.Cell>{singleitem.role}</Table.Cell>
                <Table.Cell>{singleitem.email}</Table.Cell>
                <Table.Cell>{singleitem.password}</Table.Cell>
                <Table.Cell>
                  <FaCopy
                    size={16}
                    className=" hover:text-green-400 cursor-copy"
                    onClick={() =>
                      userAddCredentialsFunc(
                        singleitem.email,
                        singleitem.password
                      )
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </CustomModal>
    </>
  );
};

export default CustomSpeedDail;
