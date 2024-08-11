import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewPointNotesAction,
  AddRemoveAccessUserNoteAction,
  ClearNotesErrorAction,
  GetSingleNotesAction,
} from "../../Redux/actions/notes.action";
import toast from "react-hot-toast";
import CustomLoader from "../../utils/Loader";
import { TbNotesOff } from "react-icons/tb";
import { FaHandPointRight } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import {
  Button,
  Card,
  List,
  Label,
  TextInput,
  Textarea,
  Avatar,
} from "flowbite-react";
import MetaData from "../../utils/MetaData";

const NotesDetails = () => {
  // react router dom
  const { notesId } = useParams();

  // usestates
  const [newPointText, setnewPointText] = useState("");
  const [notesOperation, setnotesOperation] = useState({
    userEmail: "",
    userDeleteId: null,
    deletePointId: null,
  });

  // redux
  const dispatch = useDispatch();
  const {
    singleNotes,
    loading,
    error,
    statusCode,
    addusertoloading,
    newpointloading,
  } = useSelector((state) => state.NotesState);

  //    functions
  //  all functions

  const geNotesDetailFunc = () => {
    dispatch(GetSingleNotesAction(notesId));
  };

  const clearErrorsFun = () => {
    dispatch(ClearNotesErrorAction());
  };

  const addNewPointHandler = () => {
    if (newPointText !== "") {
      dispatch(AddNewPointNotesAction(notesId, { point: newPointText }));
      setnewPointText("");
    }
  };

  const NotesOperationHandler = (name, value) => {
    const update = {};
    if (name === "email") {
      update.userEmail = value;
    } else if (name === "remove") {
      update.userDeleteId = value;
    } else if (name === "delete") {
      update.deletePointId = value;
    } else {
      return;
    }
    setnotesOperation({ ...notesOperation, ...update });
  };

  const addUserToNotesSubmitHandler = (e) => {
    e.preventDefault();
    const details = {
      email: notesOperation.userEmail,
      type: "add",
    };
    dispatch(AddRemoveAccessUserNoteAction(notesId, details));
    setnotesOperation({ ...notesOperation, ["userEmail"]: "" });
  };

  const removeUserFromNoteHandler = (email) => {
    const details = {
      email: email,
      type: "remove",
    };
    dispatch(AddRemoveAccessUserNoteAction(notesId, details));
  };

  useEffect(() => {
    if (!singleNotes || singleNotes?._id !== notesId) {
      geNotesDetailFunc();
    }
  }, [notesId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorsFun();
    }
  }, [error]);

  return (
    <>
      <MetaData title={"Notes - " + notesId} />
      {loading ? (
        <>
          <CustomLoader loading={true} />
        </>
      ) : (
        <>
          {!singleNotes || singleNotes?._id !== notesId ? (
            <div className="p-6">
              <Card className="flex justify-center items-center flex-col gap-5 py-6 text-red-400">
                <h3 className="text-2xl">Not Found </h3>
                <TbNotesOff size={80} />
                <Link to={"/notes"}>
                  <Button color="purple">Go Back</Button>
                </Link>
              </Card>
            </div>
          ) : (
            <div className="p-3 grid grid-cols-3 items-start gap-5">
              <div className="p-4 rounded-md bg-[#202938] col-span-2">
                <h1 className=" text-center uppercase font-bold text-xl">
                  {singleNotes.title}:{" "}
                </h1>
                <div className="my-3 h-[2px] border-0 bg-gray-200 dark:bg-gray-700 w-full"></div>
                {singleNotes?.points.map((singlePoint, index) => (
                  <List unstyled key={index}>
                    <List.Item className="flex items-baseline gap-3 my-2 p-2 border-b-[0.5px] border-dashed">
                      {/* <span className=" text-[12px] w-6 h-6 text-center border-gray border-2 rounded-full border-solid  border-gray-400">
                        {index + 1}
                      </span> */}
                      <span className=" text-lg text-cyan-100">
                        <FaHandPointRight />
                      </span>
                      {singlePoint?.content}
                    </List.Item>
                  </List>
                ))}
              </div>

              <div className="p-4 rounded-md bg-[#202938] pb-7 ">
                <h1 className=" text-center uppercase font-bold text-xl">
                  Details
                </h1>
                <div className="my-3 h-[2px] border-0 bg-gray-200 dark:bg-gray-700 w-full"></div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="large" value="Add New Point : " />
                  </div>
                  <Textarea
                    placeholder="Enter the text"
                    rows={4}
                    onChange={(e) => setnewPointText(e.target.value)}
                    value={newPointText}
                  />
                  <br />
                  <Button
                    className="w-full"
                    color="green"
                    isProcessing={newpointloading}
                    disabled={newpointloading}
                    onClick={addNewPointHandler}
                  >
                    Add New Point
                  </Button>
                </div>

                <div className="my-3 h-[2px] border-0 bg-gray-200 dark:bg-gray-700 w-full"></div>
                <form onSubmit={addUserToNotesSubmitHandler}>
                  <div className="mb-2 block">
                    <Label htmlFor="large" value="Add User To Collabrate :" />
                  </div>
                  <TextInput
                    placeholder="Enter the Email Address"
                    onChange={(e) =>
                      NotesOperationHandler("email", e.target.value)
                    }
                    type="email"
                    required={true}
                    value={notesOperation.userEmail}
                    readOnly={addusertoloading}
                  />
                  <br />
                  <Button
                    className="w-full"
                    color="purple"
                    isProcessing={addusertoloading}
                    disabled={newpointloading}
                    type="submit"
                  >
                    Add User in Notes
                  </Button>
                </form>

                <div className=" space-y-3 mt-3 max-h-60 overflow-auto">
                  {singleNotes.users.length > 0 &&
                    singleNotes.users.map((item) => (
                      <div key={item._id} className="grid grid-cols-6 gap-4">
                        <Avatar alt="" img="" rounded size="sm" />
                        <p className=" text-sm col-span-4">
                          {item.userId.name}
                          <br />
                          {item.userId.email}
                        </p>
                        <Button
                          className="p-0 m-0"
                          color="red"
                          onClick={() =>
                            removeUserFromNoteHandler(item.userId.email)
                          }
                        >
                          <RiDeleteBack2Line size={18} />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NotesDetails;
