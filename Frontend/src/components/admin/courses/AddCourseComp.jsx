import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Accordion,
  Card,
  List,
} from "flowbite-react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";
import RatingComponent from "../../../utils/RatingComponent";
import MultiSelect from "react-select";
import { UpdateCourseDataApi } from "../../../Apis/course.api";

export const CourseInformation = ({
  courseInfo,
  setcourseInfo,
  setActiveTimeLine,
  categories,
  isReadOnly,
  selectedCategories,
  setselectedCategories,
}) => {
  // ### react-router-dom
  const { courseId } = useParams();

  // ### function
  const validateSchemaCreate = Yup.object().shape({
    playlistid: Yup.string().required("please enter youtube playlist Id!"),
    price: Yup.number().required("please enter the course price"),
    estimatedPrice: Yup.number().required(
      "please enter the course Estimated price"
    ),
    tags: Yup.string().required("please enter the tags"),
    level: Yup.string().required("please enter the Level"),
  });

  const validateSchemaUpdate = Yup.object().shape({
    name: Yup.string().required("please enter Course Name"),
    price: Yup.number().required("please enter the course price"),
    estimatedPrice: Yup.number().required(
      "please enter the course Estimated price"
    ),
    tags: Yup.string().required("please enter the tags"),
    level: Yup.string().required("please enter the Level"),
    demorurl: Yup.string().required("please enter the demo url of the course"),
    description: Yup.string().required("please enter the course description"),
  });

  const createNewCourse = () => {
    setcourseInfo({
      playlistid: values.playlistid,
      price: values.price,
      estimatedPrice: values.estimatedPrice,
      tags: values.tags,
      level: values.level,
    });
    setActiveTimeLine(2);
  };

  const updateCourse = () => {
    setcourseInfo({
      playlistid: values.playlistid,
      name: values.name,
      description: values.description,
      price: values.price,
      estimatedPrice: values.estimatedPrice,
      tags: values.tags,
      demorurl: values.demorurl,
      thumbnail: values.thumbnail,
      level: values.level,
    });
    setActiveTimeLine(2);
  };

  // ### formik
  const formik = useFormik({
    initialValues: {
      playlistid: courseInfo.playlistid,
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      demorurl: courseInfo.demorurl,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
    },
    enableReinitialize: true,
    validationSchema: courseId ? validateSchemaUpdate : validateSchemaCreate,
    onSubmit: () => {
      if (selectedCategories.length === 0) {
        toast.error("please select atleast one category");
        return;
      }
      if (courseId) {
        updateCourse();
      } else {
        createNewCourse();
      }
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <div className="space-y-3 px-5">
      <h1 className="text-2xl font-bold text-center">Course Information:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="playlistid" value="Playlist ID" />
          </div>
          <TextInput
            id="playlistid"
            placeholder="Enter Youtube Playlist Id"
            color={touched.playlistid && errors.playlistid ? "failure" : "gray"}
            helperText={
              <div
                className={
                  touched.playlistid && errors.playlistid
                    ? "block mb-1"
                    : "hidden"
                }
              >
                <span className="font-medium">Oops! </span>
                {errors?.playlistid}
              </div>
            }
            readOnly={courseId ? true : isReadOnly}
            value={values.playlistid}
            onChange={handleChange}
          />
        </div>

        {courseId && (
          <>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Course Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Enter Couse Name"
                color={touched?.name && errors?.name ? "failure" : "gray"}
                helperText={
                  <div className={errors?.name ? "block mb-1" : "hidden"}>
                    <span className="font-medium">Oops! </span>
                    {errors?.name}
                  </div>
                }
                readOnly={isReadOnly}
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Course Description" />
              </div>
              <Textarea
                id="description"
                placeholder="course description"
                color={
                  touched?.description && errors?.description
                    ? "failure"
                    : "gray"
                }
                helperText={
                  <div
                    className={
                      touched?.description && errors?.description
                        ? "block mb-1"
                        : "hidden"
                    }
                  >
                    <span className="font-medium">Oops! </span>
                    {errors?.description}
                  </div>
                }
                onChange={handleChange}
                value={values?.description}
                readOnly={isReadOnly}
                rows={6}
              />
            </div>
          </>
        )}

        <div className="flex gap-5 w-full max-md:block">
          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Course Price" />
            </div>
            <TextInput
              id="price"
              type="number"
              placeholder="Enter Couse Price"
              color={touched?.price && errors?.price ? "failure" : "gray"}
              helperText={
                <div
                  className={
                    touched?.price && errors?.price ? "block mb-1" : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {errors?.price}
                </div>
              }
              value={values?.price}
              readOnly={isReadOnly}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="estimatedPrice" value="Course Estimated Price" />
            </div>
            <TextInput
              id="estimatedPrice"
              type="number"
              placeholder="Enter Couse Estimated Price"
              color={
                touched?.estimatedPrice && errors?.estimatedPrice
                  ? "failure"
                  : "gray"
              }
              helperText={
                <div
                  className={
                    touched?.estimatedPrice && errors?.estimatedPrice
                      ? "block mb-1"
                      : "hidden"
                  }
                >
                  <span className="font-medium">Oops! </span>
                  {errors?.estimatedPrice}
                </div>
              }
              readOnly={isReadOnly}
              value={values.estimatedPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="tags" value="Course Tags" />
          </div>
          <TextInput
            id="tags"
            placeholder="Enter Couse Tags (separated by ,)"
            color={touched?.tags && errors?.tags ? "failure" : "gray"}
            helperText={
              <div
                className={
                  touched?.tags && errors?.tags ? "block mb-1" : "hidden"
                }
              >
                <span className="font-medium">Oops! </span>
                {errors?.tags}
              </div>
            }
            readOnly={isReadOnly}
            value={values?.tags}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="tags" value="Categories" />
          </div>
          <MultiSelect
            className="text-gray-500 [&>*:nth-child(odd)]:bg-slate-700"
            isSearchable={false}
            value={selectedCategories}
            isMulti={true}
            onChange={(options) => setselectedCategories(options)}
            isDisabled={isReadOnly}
            options={
              categories?.map((item) => ({
                value: item?._id,
                label: item?.name,
              })) || []
            }
          />
        </div>

        <div className="flex gap-5 w-full max-md:block">
          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="level" value="Course Level" />
            </div>
            <Select
              id="level"
              value={values.level}
              readOnly={isReadOnly}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </Select>
          </div>

          {courseId && (
            <div className="w-1/2 max-md:w-full">
              <div className="mb-2 block">
                <Label htmlFor="demourl" value="Course Demo URL" />
              </div>
              <TextInput
                id="demourl"
                placeholder="Paste Couse Demo URL Link "
                color={
                  touched?.demorurl && errors?.demorurl ? "failure" : "gray"
                }
                helperText={
                  <div
                    className={
                      touched?.demorurl && errors?.demorurl
                        ? "block mb-1"
                        : "hidden"
                    }
                  >
                    <span className="font-medium">Oops! </span>
                    {errors?.demorurl}
                  </div>
                }
                readOnly={isReadOnly}
                value={values.demorurl}
                // onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="mt-5 float-right">
          <Button type="submit" color="purple">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export const CourseOptions = ({
  setActiveTimeLine,
  benefits,
  setbenefits,
  prerequisites,
  setprerequisites,
  isReadOnly,
}) => {
  // ### react-router-dom
  const { courseId } = useParams();

  // ### functions
  const AddNewBenefitFunction = () => {
    let update = [...benefits];
    let newBenefit = { title: "" };
    update.push(newBenefit);
    setbenefits(update);
  };
  const DeleteBenefitFunction = (index) => {
    let update = [...benefits];
    update.splice(index, 1);
    setbenefits(update);
  };
  const BenefitChangeHandler = (e, index) => {
    let update = [...benefits];
    update[index]["title"] = e.target.value;
    setbenefits(update);
  };
  const AddNewPrerequisitesFunction = () => {
    let update = [...prerequisites];
    let newBenefit = { title: "" };
    update.push(newBenefit);
    setprerequisites(update);
  };
  const DeletePrerequisitesFunction = (index) => {
    let update = [...prerequisites];
    update.splice(index, 1);
    setprerequisites(update);
  };
  const PrerequisitesChangeHandler = (e, index) => {
    let update = [...prerequisites];
    update[index]["title"] = e.target.value;
    setprerequisites(update);
  };

  const addHandlerFunction = () => {
    let isEmpty = benefits.some((item) => item.title === "");
    if (isEmpty) {
      toast.error("please enter the benefits which are blank");
      return;
    }

    isEmpty = prerequisites.some((item) => item.title === "");
    if (isEmpty) {
      toast.error("please enter the prerequisites which are blank");
      return;
    }

    setActiveTimeLine(courseId ? 3 : 4);
  };
  return (
    <div className="space-y-3 px-5">
      <h1 className="text-2xl font-bold text-center">Course Options:</h1>

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">
          What are the benefits for students in this course?
        </h2>
        {benefits?.map((singleBenifts, index) => (
          <div className="flex gap-3 items-center">
            <TextInput
              placeholder={`Enter benefit no : ${index + 1}`}
              className="w-11/12"
              value={singleBenifts.title}
              readOnly={isReadOnly}
              onChange={(e) => BenefitChangeHandler(e, index)}
            />
            {index !== 0 && !isReadOnly && (
              <Button
                color="failure"
                onClick={() => DeleteBenefitFunction(index)}
              >
                <MdDelete size={15} />
              </Button>
            )}
          </div>
        ))}
        {!isReadOnly && (
          <Button outline color="dark" onClick={AddNewBenefitFunction}>
            <IoIosAddCircle size={20} />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">
          What are the prerequisites for students in this course?
        </h2>
        {prerequisites?.map((singlePrerequisites, index) => (
          <div className="flex gap-3 items-center">
            <TextInput
              placeholder={`Enter prerequisite no : ${index + 1}`}
              className="w-11/12"
              value={singlePrerequisites.title}
              readOnly={isReadOnly}
              onChange={(e) => PrerequisitesChangeHandler(e, index)}
            />
            {index !== 0 && !isReadOnly && (
              <Button
                color="failure"
                onClick={() => DeletePrerequisitesFunction(index)}
              >
                <MdDelete size={15} />
              </Button>
            )}
          </div>
        ))}

        {!isReadOnly && (
          <Button outline color="dark" onClick={AddNewPrerequisitesFunction}>
            <IoIosAddCircle size={20} />
          </Button>
        )}
      </div>

      <div className="mt-5 flex justify-between">
        <Button color="warning" onClick={() => setActiveTimeLine(1)}>
          Prev
        </Button>
        <Button color="purple" onClick={addHandlerFunction}>
          Next
        </Button>
      </div>
    </div>
  );
};

const SinglCourseDataComponent = ({ data }) => {
  // ### usestates
  const [isReadOnly, setisReadOnly] = useState(true);
  const [loading, setloading] = useState(false);

  // ### functions
  const validateSchema = Yup.object().shape({
    title: Yup.string().required("please enter video title").min(6),
    description: Yup.string().required("please enter the video description"),
    videoUrl: Yup.string().required("please enter the video Id"),
  });

  const updateSubmitHandler = async () => {
    setloading(true);
    let response = await UpdateCourseDataApi(data._id, values);
    if (response.success) {
      toast.success(response.message);
      setisReadOnly(true);
    } else {
      toast.error(response.message);
    }
    setloading(false);
  };

  // ### formik
  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
      videoUrl: data?.videoUrl || "",
    },
    // enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: () => {
      updateSubmitHandler();
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <div className="mb-3">
      <h5 className=" font-semibold text-lg text-center">Id : {data?._id}</h5>
      <div className=" w-1/2 m-auto p-2">
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Video Title" />
          </div>
          <TextInput
            id="title"
            placeholder="Enter Couse Name"
            color={touched?.title && errors?.title ? "failure" : "gray"}
            helperText={
              <div className={errors?.title ? "block mb-1" : "hidden"}>
                <span className="font-medium">Oops! </span>
                {errors?.title}
              </div>
            }
            readOnly={isReadOnly}
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className=" grid grid-cols-2 gap-3">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="videoUrl" value="Video URL" />
            </div>
            <TextInput
              id="videoUrl"
              placeholder="Enter Video URL"
              color={touched?.videoUrl && errors?.videoUrl ? "failure" : "gray"}
              helperText={
                <div className={errors?.videoUrl ? "block mb-1" : "hidden"}>
                  <span className="font-medium">Oops! </span>
                  {errors?.videoUrl}
                </div>
              }
              readOnly={isReadOnly}
              value={values.videoUrl}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="videoDuration" value="Video Duration" />
            </div>
            <TextInput
              id="videoDuration"
              placeholder="Enter Video URL"
              readOnly={true}
              value={
                data?.length?.accessibility?.accessibilityData?.label || ""
              }
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Video Description" />
          </div>
          <Textarea
            id="description"
            placeholder="course description"
            color={
              touched?.description && errors?.description ? "failure" : "gray"
            }
            helperText={
              <div
                className={
                  touched?.description && errors?.description
                    ? "block mb-1"
                    : "hidden"
                }
              >
                <span className="font-medium">Oops! </span>
                {errors?.description}
              </div>
            }
            value={values?.description}
            readOnly={isReadOnly}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="thumbnail" value="Video Thumbnail" />
          </div>
          <Card
            className="p-3"
            imgAlt={data?.title}
            imgSrc={data?.videothumbnail?.url}
          />
        </div>
        <div className="mt-4">
          {isReadOnly ? (
            <Button color="warning" onClick={() => setisReadOnly(false)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                color="failure"
                onClick={() => setisReadOnly(true)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" color="green" isProcessing={loading}>
                Update
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export const CourseContent = ({ setActiveTimeLine }) => {
  const { SingleCourse } = useSelector((state) => state.AdminCourseState);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold text-center mb-4">Course Content:</h1>

      <Accordion>
        {SingleCourse?.coursesData.map((singleCourseData) => (
          <Accordion.Panel>
            <Accordion.Title>
              <b className="text-purple-400">{singleCourseData?.sequence}. </b>
              {singleCourseData?.title}
            </Accordion.Title>
            <Accordion.Content>
              <SinglCourseDataComponent
                key={singleCourseData._id}
                data={singleCourseData}
              />
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>

      <div className="mt-5 flex justify-between">
        <Button color="warning" onClick={() => setActiveTimeLine(2)}>
          Prev
        </Button>
        <Button color="purple" onClick={() => setActiveTimeLine(4)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export const CoursePreview = ({
  isReadOnly,
  setActiveTimeLine,
  courseInfo,
  benefits,
  prerequisites,
  categories,
  selectedCategories,
  createNewCoureSubmitHandler,
  updateCourseSubmitHandler,
  actionLoading,
}) => {
  const { courseId } = useParams();

  return (
    <div className="bg-black p-5 mt-2">
      <h1 className="text-2xl font-bold text-center mb-4">Course Preview:</h1>
      <div className="flex flex-col space-y-5 justify-center rounded-lg">
        {courseInfo?.demorurl && (
          <div className="w-11/12 h-[65vh]">
            <ReactPlayer
              className="rounded-md"
              url={courseInfo?.demorurl}
              controls={true}
              loop={false}
              thumbnail={true}
              imgSrc={courseInfo?.thumbnail}
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
        <div>
          <h3 className="font-bold text-2xl">
            {courseInfo?.price} ₹{" "}
            <sup className=" line-through">{courseInfo?.estimatedPrice}₹</sup>{" "}
            <span className=" text-red-600">
              {parseInt(
                ((courseInfo?.estimatedPrice - courseInfo?.price) /
                  courseInfo?.estimatedPrice) *
                  100
              )}
              % Off
            </span>
          </h3>
        </div>

        <div>
          <Button color="failure" pill>
            Buy Now {courseInfo?.price} ₹
          </Button>
        </div>

        <div>
          {" "}
          <pre className=" whitespace-break-spaces">
            {courseInfo?.description}
          </pre>{" "}
        </div>

        {courseInfo?.rating && (
          <>
            <div className="flex gap-3">
              <TextInput placeholder="Discount Code..." className=" w-5/12" />
              <Button pill>Apply</Button>
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-3">{courseInfo?.name}</h1>
            <RatingComponent rating={courseInfo?.rating} />
          </>
        )}
      </div>

      <div className="my-2">
        <MultiSelect
          className="text-gray-500 [&>*:nth-child(odd)]:bg-black"
          isSearchable={false}
          value={selectedCategories}
          isMulti={true}
          isDisabled={true}
          options={
            categories?.map((item) => ({
              value: item?._id,
              label: item?.name,
            })) || []
          }
        />
      </div>

      <div>
        <div>
          <h2 className="font-semibold text-2xl mb-2">
            What are the benefits for students in this course?
          </h2>

          <List unstyled>
            {benefits.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-2xl">
            What are the prerequisites for students in this course?
          </h2>

          <List unstyled>
            {prerequisites.map((item) => (
              <List.Item icon={HiCheckCircle}>
                {" "}
                <div className="flex gap-2 items-center">
                  <HiCheckCircle /> {item.title}
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <Button
          color="warning"
          onClick={() => setActiveTimeLine(courseId ? 3 : 2)}
          disabled={actionLoading}
        >
          Prev
        </Button>

        {!courseId && (
          <Button
            color="success"
            onClick={createNewCoureSubmitHandler}
            disabled={actionLoading}
            isProcessing={actionLoading}
          >
            Create
          </Button>
        )}
        {courseId && !isReadOnly && (
          <Button
            color="success"
            onClick={updateCourseSubmitHandler}
            disabled={actionLoading}
            isProcessing={actionLoading}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};
