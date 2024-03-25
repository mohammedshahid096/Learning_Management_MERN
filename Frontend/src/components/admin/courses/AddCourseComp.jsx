import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const CourseInformation = ({
  courseInfo,
  setcourseInfo,
  setActiveTimeLine,
}) => {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required("please enter your name!").min(6),
  });

  const formik = useFormik({
    initialValues: {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      demorurl: courseInfo.demorurl,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      // resetForm();
      //   sumbitFunction(values);
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="space-y-3 px-5">
      <h1 className="text-2xl font-bold text-center">Course Information:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Course Name" />
          </div>
          <TextInput
            id="name"
            placeholder="Enter Couse Name"
            color={
              touched?.coursename && errors?.coursename ? "failure" : "gray"
            }
            helperText={
              <div className={errors?.coursename ? "block mb-1" : "hidden"}>
                <span className="font-medium">Oops! </span>
                {errors?.coursename}
              </div>
            }
            readOnly={true}
            // value={values.name}
            // onChange={handleChange}
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
            readOnly={true}
            rows={6}
          />
        </div>

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
              // onChange={handleChange}
            />
          </div>

          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="estimatedPrice" value="Course Estimated Price" />
            </div>
            <TextInput
              id="estimatedPrice"
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
              value={values.estimatedPrice}
              // onChange={handleChange}
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
            value={values?.tags}
            // onChange={handleChange}
          />
        </div>

        <div className="flex gap-5 w-full max-md:block">
          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="level" value="Course Level" />
            </div>
            <Select id="level" value={values.level}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </Select>
          </div>

          <div className="w-1/2 max-md:w-full">
            <div className="mb-2 block">
              <Label htmlFor="demourl" value="Course Demo URL" />
            </div>
            <TextInput
              id="demourl"
              placeholder="Paste Couse Demo URL Link "
              color={touched?.demorurl && errors?.demorurl ? "failure" : "gray"}
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
              value={values.demorurl}
              // onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-5 float-right">
          <Button
            type="submit"
            color="purple"
            //   isProcessing={loading}
            onClick={() => setActiveTimeLine(2)}
          >
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
}) => {
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
  return (
    <div className="space-y-3 px-5">
      <h1 className="text-2xl font-bold text-center">Course Options:</h1>

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">
          What are the benefits for students in this course?
        </h2>
        {benefits.map((singleBenifts, index) => (
          <div className="flex gap-3 items-center">
            <TextInput
              placeholder={`Enter benefit no : ${index + 1}`}
              className="w-11/12"
              value={singleBenifts.title}
              onChange={(e) => BenefitChangeHandler(e, index)}
            />
            {index !== 0 && (
              <Button
                color="failure"
                onClick={() => DeleteBenefitFunction(index)}
              >
                <MdDelete size={15} />
              </Button>
            )}
          </div>
        ))}
        <Button outline color="dark" onClick={AddNewBenefitFunction}>
          <IoIosAddCircle size={20} />
        </Button>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">
          What are the prerequisites for students in this course?
        </h2>
        {prerequisites.map((singlePrerequisites, index) => (
          <div className="flex gap-3 items-center">
            <TextInput
              placeholder={`Enter prerequisite no : ${index + 1}`}
              className="w-11/12"
              value={singlePrerequisites.title}
              onChange={(e) => PrerequisitesChangeHandler(e, index)}
            />
            {index !== 0 && (
              <Button
                color="failure"
                onClick={() => DeletePrerequisitesFunction(index)}
              >
                <MdDelete size={15} />
              </Button>
            )}
          </div>
        ))}
        <Button outline color="dark" onClick={AddNewPrerequisitesFunction}>
          <IoIosAddCircle size={20} />
        </Button>
      </div>

      <div className="mt-5 flex justify-between">
        <Button color="warning" onClick={() => setActiveTimeLine(1)}>
          Prev
        </Button>
        <Button color="purple" onClick={() => setActiveTimeLine(3)}>
          Next
        </Button>
      </div>
    </div>
  );
};
