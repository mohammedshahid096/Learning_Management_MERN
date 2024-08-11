"use client";

import { Avatar, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { IoPush } from "react-icons/io5";
import CustomModal from "../../utils/CustomModal";
import { GrNotes } from "react-icons/gr";
import { AddNewNotesApi } from "../../Apis/notes.api";
import toast from "react-hot-toast";

const NewNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const [details, setdetails] = useState({
    title: "",
    points: ["", ""],
  });

  const handleClose = () => setIsOpen(false);

  const addNewPointsBlocks = () => {
    let blocks = [...details.points];
    blocks = [...blocks, "", ""];
    setdetails({ ...details, ["points"]: blocks });
  };

  const changeHandler = (e, index) => {
    let name = e.target.name;
    if (name === "title") {
      setdetails({ ...details, [name]: e.target.value.trimStart() });
    } else if (name === "points") {
      let points = [...details.points];
      points[index] = e.target.value;
      setdetails({ ...details, [name]: points });
    }
  };

  const submitDetailsHandler = async (e) => {
    e.preventDefault();

    setsubmitLoading(true);
    const response = await AddNewNotesApi(details);
    if (response.success) {
      setdetails({ title: "", points: ["", ""] });
      setIsOpen(false);
      setsubmitLoading(false);
    } else {
      setsubmitLoading(false);
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="flex  items-center justify-center">
        <Button color="purple" onClick={() => setIsOpen(true)}>
          Add New <GrNotes className=" ml-2" />{" "}
        </Button>
      </div>
      <CustomModal
        openModal={isOpen}
        setopenModal={handleClose}
        size="2xl"
        title="Add New Notes"
      >
        <div>
          <form onSubmit={submitDetailsHandler}>
            <div className="mb-6 mt-3">
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <TextInput
                name="title"
                placeholder="Enter the Notes title"
                value={details.title}
                onChange={changeHandler}
                required={true}
                readOnly={submitLoading}
              />
            </div>
            <div className="mb-6 grid grid-cols-2 gap-3 items-baseline space-y-2">
              {details.points.map((singlePoint, index) => (
                <div key={"points_" + (index + 1)}>
                  <Label htmlFor="description" className="mb-2 block">
                    Point - {index + 1}
                  </Label>
                  <Textarea
                    id="points"
                    placeholder="Write the point..."
                    value={singlePoint}
                    name="points"
                    onChange={(e) => changeHandler(e, index)}
                    rows={2}
                    required={true}
                    readOnly={submitLoading}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end mb-3">
              <Button
                color="yellow"
                className="p-0"
                onClick={addNewPointsBlocks}
                disabled={submitLoading}
              >
                <IoIosAddCircle size={20} />
              </Button>
            </div>

            <div className="mb-6">
              <TextInput
                id="guests"
                name="guests"
                placeholder="Add guest email"
                type="search"
                rightIcon={() => (
                  <Button
                    size="sm"
                    className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0"
                  >
                    <HiUserAdd className="mr-2" />
                    Add
                  </Button>
                )}
              />
            </div>
            {/* <Avatar.Group className="mb-6">
              <Avatar
                alt=""
                img="/images/people/profile-picture-5.jpg"
                rounded
                size="sm"
                stacked
              />
              <Avatar
                alt=""
                img="/images/people/profile-picture-2.jpg"
                rounded
                size="sm"
                stacked
              />
              <Avatar
                alt=""
                img="/images/people/profile-picture-3.jpg"
                rounded
                size="sm"
                stacked
              />
              <Avatar
                alt=""
                img="/images/people/profile-picture-4.jpg"
                rounded
                size="sm"
                stacked
              />
            </Avatar.Group> */}
            <Button
              className="w-full justify-center items-center"
              disabled={submitLoading}
              isProcessing={submitLoading}
              type="submit"
            >
              <IoPush className="mr-2" size={20} /> Create New Notes
            </Button>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default NewNotes;
