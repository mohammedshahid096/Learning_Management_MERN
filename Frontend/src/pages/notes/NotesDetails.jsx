import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearNotesErrorAction,
  GetSingleNotesAction,
} from "../../Redux/actions/notes.action";
import toast from "react-hot-toast";
import CustomLoader from "../../utils/Loader";
import { TbNotesOff } from "react-icons/tb";
import { FaHandPointRight } from "react-icons/fa";
import { Button, Card, List, Label, TextInput, Textarea } from "flowbite-react";

const NotesDetails = () => {
  // react router dom
  const { notesId } = useParams();

  // redux
  const dispatch = useDispatch();
  const { singleNotes, loading, error, statusCode } = useSelector(
    (state) => state.NotesState
  );

  //    functions
  //  all functions

  const geNotesDetailFunc = () => {
    dispatch(GetSingleNotesAction(notesId));
  };

  const clearErrorsFun = () => {
    dispatch(ClearNotesErrorAction());
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
            <div className="p-3 grid grid-cols-3 gap-5">
              <div className="p-4 rounded-md bg-[#202938] col-span-2">
                <h1 className=" text-center uppercase font-bold text-xl">
                  {singleNotes.title}:{" "}
                </h1>
                <div className="my-3 h-[2px] border-0 bg-gray-200 dark:bg-gray-700 w-full"></div>
                {singleNotes?.points.map((singlePoint, index) => (
                  <List unstyled>
                    <List.Item className="flex items-center gap-3 my-2">
                      <div className=" w-8 h-8 bg-whit text-center border-gray border-2 rounded-full border-solid p-1 ">
                        {index + 1}
                      </div>
                      {singlePoint?.content}
                    </List.Item>
                  </List>
                ))}
              </div>
              <div className="p-2 rounded-md bg-[#202938] ">
                <h1 className=" text-center uppercase font-bold text-xl">
                  Details
                </h1>
                <div className="my-3 h-[2px] border-0 bg-gray-200 dark:bg-gray-700 w-full"></div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="large" value="Add New Point :" />
                  </div>
                  <Textarea placeholder="Enter the text" rows={4} />
                  <br />
                  <Button className="w-full" color="green">
                    Add New Point
                  </Button>
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
