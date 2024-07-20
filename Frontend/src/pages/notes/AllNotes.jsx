import React from "react";
import { Button, Card, Badge } from "flowbite-react";
import { HiCheckCircle, HiOutlineArrowRight } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";

const data = [
  {
    _id: "6693bc980fce2071694927ff",
    user: "65d78e3642750107ff199cbf",
    title: "my first new notes dfdlk dfkd; ;ksdf",
    points: [
      {
        pointId: "3d5dc8ec-46b8-463f-8b89-024869701bec",
        content: "shahidfhere are you shahidfhere are you",
        _id: "6693bc980fce207169492800",
      },
      {
        pointId: "2c9a986b-0a2b-4cce-81ee-16c3f7d9dc5d",
        content: "this is soo and sooo project",
        _id: "6693bc980fce207169492801",
      },
    ],
    createdAt: "2024-07-14T11:55:04.546Z",
    updatedAt: "2024-07-14T11:55:04.546Z",
    __v: 0,
  },
  {
    _id: "6693bc980fce2071694927ff",
    user: "65d78e3642750107ff199cbf",
    title: "my first new notes",
    points: [
      {
        pointId: "3d5dc8ec-46b8-463f-8b89-024869701bec",
        content: "shahidfhere are you",
        _id: "6693bc980fce207169492800",
      },
      {
        pointId: "2c9a986b-0a2b-4cce-81ee-16c3f7d9dc5d",
        content: "this is soo and sooo project",
        _id: "6693bc980fce207169492801",
      },
    ],
    createdAt: "2024-07-14T11:55:04.546Z",
    updatedAt: "2024-07-14T11:55:04.546Z",
    __v: 0,
  },
  {
    _id: "6693bc980fce2071694927ff",
    user: "65d78e3642750107ff199cbf",
    title: "my first new notes",
    points: [
      {
        pointId: "3d5dc8ec-46b8-463f-8b89-024869701bec",
        content: "shahidfhere are you",
        _id: "6693bc980fce207169492800",
      },
      {
        pointId: "2c9a986b-0a2b-4cce-81ee-16c3f7d9dc5d",
        content: "this is soo and sooo project",
        _id: "6693bc980fce207169492801",
      },
    ],
    createdAt: "2024-07-14T11:55:04.546Z",
    updatedAt: "2024-07-14T11:55:04.546Z",
    __v: 0,
  },
  {
    _id: "6693bc980fce2071694927ff",
    user: "65d78e3642750107ff199cbf",
    title: "my first new notes",
    points: [
      {
        pointId: "3d5dc8ec-46b8-463f-8b89-024869701bec",
        content: "shahidfhere are you",
        _id: "6693bc980fce207169492800",
      },
      {
        pointId: "2c9a986b-0a2b-4cce-81ee-16c3f7d9dc5d",
        content: "this is soo and sooo project",
        _id: "6693bc980fce207169492801",
      },
    ],
    createdAt: "2024-07-14T11:55:04.546Z",
    updatedAt: "2024-07-14T11:55:04.546Z",
    __v: 0,
  },
  {
    _id: "6693bc980fce2071694927ff",
    user: "65d78e3642750107ff199cbf",
    title: "my first new notes",
    points: [
      {
        pointId: "3d5dc8ec-46b8-463f-8b89-024869701bec",
        content: "shahidfhere are you",
        _id: "6693bc980fce207169492800",
      },
      {
        pointId: "2c9a986b-0a2b-4cce-81ee-16c3f7d9dc5d",
        content: "this is soo and sooo project",
        _id: "6693bc980fce207169492801",
      },
    ],
    createdAt: "2024-07-14T11:55:04.546Z",
    updatedAt: "2024-07-14T11:55:04.546Z",
    __v: 0,
  },
];

const AllNotes = () => {
  return (
    <>
      <h1 className=" text-3xl text-center font-bold py-4">My Notebook</h1>
      <div className="grid grid-cols-3 gap-10 p-8 items-baseline">
        {data.map((item) => (
          <Card key={item._id}>
            <p className="Poppins text-gray-500 text-sm font-semibold">
              {moment(item.createdAt).format("DD MMM YYYY")}
            </p>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
              {item.title}
            </h5>
            {item.points.slice(0, 2).map((point) => (
              <p
                className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-3"
                key={point.pointId}
              >
                <HiCheckCircle color="#0891b3" /> {point.content}
              </p>
            ))}
            <div className="flex justify-between items-center">
              <Button>
                Read more
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span>
                <Badge color="gray" icon={FaUserCircle}>
                  You , 3 more
                </Badge>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllNotes;
