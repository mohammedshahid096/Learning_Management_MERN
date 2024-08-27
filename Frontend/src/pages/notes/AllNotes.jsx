import React, { useEffect } from "react";
import { Button, Card, Badge } from "flowbite-react";
import { HiCheckCircle, HiOutlineArrowRight } from "react-icons/hi";
import { TbNotesOff } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearNotesErrorAction,
  GetAllNotesAction,
} from "../../Redux/actions/notes.action";
import toast from "react-hot-toast";
import CustomLoader from "../../utils/Loader";
import NewNotes from "./NewNotes";
import MetaData from "../../utils/MetaData";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-10 p-8 items-baseline max-md:flex max-md:flex-col">
      {[1, 2, 3].map((item) => (
        <Card key={item._id} className=" max-md:w-full">
          <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 flex animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
          </p>
          <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 flex animate-pulse ">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          </p>
          <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 animate-pulse ">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-4"></div>
          </p>
          <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 flex gap-3 animate-pulse ">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
          </p>
        </Card>
      ))}
    </div>
  );
};

const AllNotes = () => {
  // react router dom
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { allNotes, loading, error, statusCode } = useSelector(
    (state) => state.NotesState
  );

  //  all functions
  const getAllNotesFunc = () => {
    dispatch(GetAllNotesAction());
  };

  const clearErrorsFun = () => {
    dispatch(ClearNotesErrorAction());
  };

  // useeffects
  useEffect(() => {
    if (!allNotes) {
      getAllNotesFunc();
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorsFun();
    }
  }, [error]);

  return (
    <>
      <MetaData title="All Note's" />
      <h1 className=" text-3xl text-center font-bold py-4">My Notebook</h1>
      {loading ? (
        <>
          <Skeleton />
          <CustomLoader loading={true} />
        </>
      ) : allNotes && allNotes.length > 0 ? (
        <>
          <div className=" flex justify-end pr-6">
            <NewNotes />
          </div>
          <div className="grid grid-cols-3 gap-10 p-8 items-baseline max-md:flex max-md:flex-col">
            {allNotes.map((item) => (
              <Card key={item._id} className=" max-md:w-full">
                <p className="Poppins text-gray-500 text-sm font-semibold">
                  {moment(item.createdAt).format("DD MMM YYYY")}
                </p>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                  {item?.title}
                </h5>
                {item?.points.slice(0, 2).map((point) => (
                  <p
                    className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-3"
                    key={point?.pointId}
                  >
                    <span className="text-lg">
                      <HiCheckCircle color="#0891b3" />
                    </span>
                    {point.content}
                  </p>
                ))}
                <div className="flex justify-between items-center">
                  <Button onClick={() => navigate(item._id)}>
                    Read more
                    <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <span>
                    <Badge color="gray" icon={FaUserCircle}>
                      me{" "}
                      {allNotes?.users?.length > 0 &&
                        `, ${allNotes?.users?.length}`}
                    </Badge>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className=" flex justify-end pr-6">
            <NewNotes />
          </div>
          <br />
          <Card className="flex justify-center items-center flex-col gap-5 py-6">
            <h3 className="text-2xl">Your Notes is Empty </h3>
            <TbNotesOff size={80} />
          </Card>
        </>
      )}
    </>
  );
};

export default AllNotes;
