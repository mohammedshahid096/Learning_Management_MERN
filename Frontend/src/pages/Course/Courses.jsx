import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesList } from "../../Redux/actions/course.action";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FilterCoursesAction,
  SearchCoursesAction,
} from "../../Redux/actions/searchcourse.action";
import {
  Button,
  Card,
  Tooltip,
  Label,
  RangeSlider,
  TextInput,
  Radio,
  Checkbox,
} from "flowbite-react";
import RatingComponent from "../../utils/RatingComponent";
import { PiStudent } from "react-icons/pi";
import { FaSearch, FaExclamationCircle } from "react-icons/fa";
import CustomLoader from "../../utils/Loader";
import MetaData from "../../utils/MetaData";

const Skeleton = () => {
  return (
    <div role="status">
      <div className="flex p-3 max-sm:flex-col">
        <Card className="w-1/4 max-sm:w-full">
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1 m-auto"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-3/5 rounded-md mb-1 m-auto"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-1"></div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
          <div className="flex justify-between">
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
            <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-1/5 rounded-md mb-1"></div>
          </div>
          <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-full rounded-md mb-1 m-auto"></div>
        </Card>

        <div className="flex items-baseline mt-4 max-sm:flex-col max-sm:gap-3 w-3/4 max-sm:w-full">
          {Array.from({ length: 5 }, (v, i) => i).map((item) => (
            <div
              key={item}
              className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700 max-sm:m-auto"
            >
              <div className="h-40 bg-gray-200  dark:bg-gray-500 w-full mb-2"></div>
              <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-2 m-auto"></div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500 rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
              </div>
              <div className="h-2.5 bg-gray-200  dark:bg-gray-500 w-4/5 rounded-md mb-2 m-auto"></div>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500 rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
                <div className="h-2.5 bg-gray-200  dark:bg-gray-500  rounded-md mb-2"></div>
              </div>

              <br />

              <div className="h-6 bg-gray-200 w-11/12 m-auto dark:bg-gray-500  rounded-full mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center  w-full">
      <FaExclamationCircle size={48} className="text-gray-400" />
      <h2 className="text-2xl font-bold text-gray-600 mb-4">
        **No Results Found**
      </h2>
      <p className="text-lg text-gray-500">
        Sorry, we couldn't find any results matching your search criteria.
      </p>
    </div>
  );
};

const CardRenderComponent = ({ filterData, searchPageData }) => {
  const { user } = useSelector((state) => state.AuthState);

  const navigate = useNavigate();

  const finalData = filterData ?? searchPageData;

  const redirectToCoursePage = (courseId) => {
    const isAlreadyEnroll =
      user?.courses.find((item) => item === courseId) || null;

    if (isAlreadyEnroll || user?.role === "admin" || user?.role === "teacher") {
      navigate(`/course-access/${courseId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };
  return finalData?.length === 0 ? (
    <NotFoundComponent />
  ) : (
    finalData?.map((singleCourse) => (
      <div key={singleCourse?._id} className="max-sm:m-auto">
        <Card
          key={singleCourse?._id}
          className="w-[300px] max-sm:w-full h-[415px] overflow-auto"
          imgAlt={singleCourse?.name}
          imgSrc={singleCourse?.thumbnail?.url}
        >
          <h5 className="truncate text-wrap text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center underline">
            {singleCourse?.name}
          </h5>
          <div className="flex justify-between">
            <p>Level :</p> <p>{singleCourse?.level}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              <RatingComponent
                rating={singleCourse?.rating}
                NumberRating={false}
              />
            </span>

            <p className="text-sm inline-flex gap-1 items-center">
              <PiStudent />
              <span className=" text-slate-400 font-bold">
                {singleCourse?.purchase}
              </span>{" "}
              Students
            </p>
          </div>

          <div className="flex justify-between">
            <p>
              <span className="line-through">
                {singleCourse?.estimatedprice}₹{" "}
              </span>
              <sup className="text-red-500"> {singleCourse?.price}₹</sup>{" "}
            </p>{" "}
          </div>

          <Button
            color="green"
            pill
            className="w-full"
            onClick={() => redirectToCoursePage(singleCourse?._id)}
          >
            <Tooltip content="Redirect to the course details page">
              Buy for {singleCourse?.price} ₹
            </Tooltip>
          </Button>
        </Card>
      </div>
    ))
  );
};

const Courses = () => {
  const [selectedCategory, setselectedCategory] = useState([]);
  const [price, setprice] = useState({ priceGte: 0, priceLte: 0 });
  const [searchWord, setsearchWord] = useState(null);
  const [level, setlevel] = useState("");
  const [rating, setrating] = useState(0);
  // const [loading, setloading] = useState(false);
  const [isApply, setisApply] = useState(false);

  const [searchkeys, setsearchkeys] = useSearchParams();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.AdminCourseState);
  const { searchPageData, filterData, loading } = useSelector(
    (state) => state.HomeCourseState
  );

  // ### functions
  const fetchCategoryList = () => {
    dispatch(GetCategoriesList());
  };

  function GetAllParamsFunction() {
    const params = [];
    for (let entry of searchkeys.entries()) {
      params.push(entry);
    }
    const result = Object.fromEntries(params);
    return result;
  }

  const priceChangeHandler = (name, priceValue) => {
    const getParams = GetAllParamsFunction();
    let update = { ...getParams, ...price };
    (update[name] = priceValue), setprice(update);
    setsearchkeys(update);

    if (!isApply) {
      setisApply(true);
    }
  };

  const levelChangeHandler = (e) => {
    const getParams = GetAllParamsFunction();
    setlevel(e.target.value);
    const update = { ...getParams, level: e.target.value };
    setsearchkeys(update);

    if (!isApply) {
      setisApply(true);
    }
  };

  const ratingChangeHandler = (e) => {
    const getParams = GetAllParamsFunction();
    setrating(e.target.value);
    const update = { ...getParams, rating: e.target.value };
    setsearchkeys(update);

    if (!isApply) {
      setisApply(true);
    }
  };

  const searchChangeHandler = (e) => {
    const getParams = GetAllParamsFunction();

    setsearchWord(e.target.value);
    const update = { ...getParams, name: e.target.value };
    setsearchkeys(update);

    if (!isApply) {
      setisApply(true);
    }
    if (!e.target.value) {
      const update = { ...getParams };
      delete update?.name;
      setsearchkeys(update);
    }
  };

  const categoriesChangeHandler = (e, name) => {
    const getParams = GetAllParamsFunction();
    let update = [...selectedCategory];
    if (e.target.checked) {
      update.push(e.target.value);
      let previousCategories = getParams?.category;
      previousCategories
        ? (previousCategories += `,${name}`)
        : (previousCategories = name);
      setsearchkeys({ ...getParams, category: previousCategories });
    } else {
      update = update.filter((item) => item !== e.target.value);
      let previousCategories = getParams?.category
        .split(",")
        .filter((item) => item !== name)
        .join(",");
      if (previousCategories) {
        setsearchkeys({ ...getParams, category: previousCategories });
      } else {
        delete getParams?.category;
        setsearchkeys(getParams);
      }
    }
    setselectedCategory(update);

    if (!isApply) {
      setisApply(true);
    }
  };

  function ResetFunction() {
    dispatch(FilterCoursesAction("", true));
    setsearchkeys({});
    setselectedCategory([]);
    setprice({ priceGte: 0, priceLte: 10000 });
    setlevel("");
    setrating(0);
    setisApply(false);
  }

  const getCoursesSearch = () => {
    dispatch(SearchCoursesAction());
  };

  function funcUpdateState() {
    let allParams = GetAllParamsFunction();

    if (allParams?.priceGte || allParams?.priceLte) {
      setprice({
        priceGte: Number(allParams?.priceGte || 0),
        priceLte: Number(allParams?.priceLte || 0),
      });
    }
    if (allParams?.name) {
      setsearchWord(allParams.name);
    }
    if (allParams?.rating) {
      setrating(Number(allParams.rating));
    }
    if (allParams?.level) {
      setlevel(allParams.level);
    }
    if (allParams?.category) {
      let categoryArray = allParams.category.split(",");
      let resultMap = categoryArray.map((item) => {
        let findData = categories?.find((item2) => item2?.name === item);
        return findData?._id;
      });

      setselectedCategory(resultMap);
    }
  }

  const fetchQueryData = () => {
    const query = searchkeys.toString();
    dispatch(FilterCoursesAction(query));
  };

  useEffect(() => {
    let getParams = GetAllParamsFunction();
    if (!categories) {
      fetchCategoryList();
    }
    if (!searchPageData) {
      getCoursesSearch();
    }
    if (getParams && categories) {
      funcUpdateState();
      fetchQueryData();
    }
  }, [categories, searchPageData]);

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <>
      <MetaData title="search courses" />
      {/* <CustomLoader loading={loading} /> */}
      <div className="p-6 pl-8 flex gap-16 max-sm:flex-col max-sm:p-2">
        <div className="dark:bg-gray-800 bg-gray-300 shadow-sm rounded-md p-3 w-1/4 space-y-3 max-sm:w-full">
          <h1 className=" font-bold text-lg">Filters</h1>

          <div className="flex justify-between">
            <Button
              color="dark"
              disabled={!isApply ? true : false}
              onClick={fetchQueryData}
            >
              Apply{" "}
            </Button>
            <Button color="red" onClick={ResetFunction}>
              Reset
            </Button>
          </div>

          <div>
            <TextInput
              placeholder="search keywords..."
              onChange={searchChangeHandler}
              value={searchWord}
              icon={FaSearch}
            />
          </div>

          <div>
            <div>
              <div className="mb-2 block">
                <Label value="Price Range" />
              </div>
              <div className="flex gap-3 w-full">
                <RangeSlider
                  value={price.priceGte}
                  className="w-1/2"
                  onChange={(e) =>
                    priceChangeHandler("priceGte", e.target.value)
                  }
                  max={10000}
                />
                <RangeSlider
                  value={price.priceLte}
                  className="w-1/2"
                  onChange={(e) =>
                    priceChangeHandler("priceLte", e.target.value)
                  }
                  max={10000}
                />
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <div className="space-y-3">
                <Label value="From" />
                <TextInput
                  value={price.priceGte}
                  type="number"
                  onChange={(e) =>
                    priceChangeHandler("priceGte", e.target.value)
                  }
                />
              </div>
              <div className="space-y-3">
                <Label value="To" />
                <TextInput
                  value={price.priceLte}
                  type="number"
                  onChange={(e) =>
                    priceChangeHandler("priceLte", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Course Level</Label>
            <fieldset className="flex max-w-md mt-2  flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="course-beginner"
                  name="courselevel"
                  value="Beginner"
                  checked={level === "Beginner" ? true : false}
                  onChange={levelChangeHandler}
                />
                <Label htmlFor="course-beginner" className=" font-normal">
                  Beginner
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="course-intermediate"
                  name="Intermediate"
                  value="Intermediate"
                  checked={level === "Intermediate" ? true : false}
                  onChange={levelChangeHandler}
                />
                <Label htmlFor="course-intermediate" className=" font-normal">
                  Intermediate
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="course-advanced"
                  name="Advanced"
                  value="Advanced"
                  checked={level === "Advanced" ? true : false}
                  onChange={levelChangeHandler}
                />
                <Label htmlFor="course-advanced" className=" font-normal">
                  Advanced
                </Label>
              </div>
            </fieldset>
          </div>

          <div>
            <Label>Categories</Label>
            <div className="grid  grid-cols-2 gap-3 mt-3">
              {categories?.map((singleCategory) => (
                <div
                  className="flex items-center gap-2 mt"
                  key={singleCategory?._id}
                >
                  <Checkbox
                    value={singleCategory?._id}
                    onChange={(e) =>
                      categoriesChangeHandler(e, singleCategory?.name)
                    }
                    checked={selectedCategory?.some(
                      (item) => item === singleCategory?._id
                    )}
                  />
                  <Label className="font-normal">{singleCategory?.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Rating</Label>
            {[5, 4, 3, 2, 1].map((singleRating) => (
              <div
                className="flex items-center gap-2 mt-3"
                key={`ratingkey${singleRating}`}
              >
                <Radio
                  name="rating"
                  value={singleRating}
                  checked={Number(rating) === singleRating ? true : false}
                  onChange={ratingChangeHandler}
                />
                <span className="text-2xl">
                  <RatingComponent
                    rating={singleRating}
                    NumberRating={false}
                    colorRating={"white"}
                  />
                </span>
              </div>
            ))}
            <div></div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap mt-6 w-3/4 max-sm:w-full">
          <CardRenderComponent
            filterData={filterData}
            searchPageData={searchPageData}
          />
        </div>
      </div>
    </>
  );
};

const Courses2 = () => {
  const [selectedCategory, setselectedCategory] = useState("All");
  const [loading, setloading] = useState(false);

  const [searchkeys, setsearchkeys] = useSearchParams({ category: "all" });

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.AdminCourseState);
  const { searchPageData } = useSelector((state) => state.HomeCourseState);

  // ### functions
  const fetchCategoryList = () => {
    dispatch(GetCategoriesList());
  };

  const getSelectedCategroyHandler = (name) => {
    setsearchkeys({ category: name });
  };

  const getCoursesSearch = () => {
    dispatch(SearchCoursesAction());
  };

  useEffect(() => {
    if (!categories) {
      fetchCategoryList();
    }
    if (!searchPageData) {
      getCoursesSearch();
    }
  }, [categories, searchPageData]);
  return loading ? null : (
    <div className="p-6">
      <div className="flex gap-5 flex-wrap justify-center">
        <Button
          color={searchkeys.get("category") === "all" ? "pink" : "cyan"}
          size={"sm"}
          key={"AllCategories"}
          onClick={() => setsearchkeys({ category: "all" })}
        >
          All
        </Button>
        {categories?.map((singleCategory) => (
          <Button
            color={
              searchkeys.get("category") === singleCategory.name
                ? "pink"
                : "cyan"
            }
            size={"sm"}
            key={singleCategory?._id}
            onClick={() => getSelectedCategroyHandler(singleCategory.name)}
          >
            {singleCategory?.name}
          </Button>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap mt-6">
        {searchPageData?.map((singleCourse) => (
          <div key={singleCourse?._id} className="max-sm:cardMobileStyle">
            <Card
              key={singleCourse?._id}
              className="w-[300px] h-[415px] overflow-auto"
              imgAlt={singleCourse?.name}
              imgSrc={singleCourse?.thumbnail?.url}
            >
              <h5 className=" truncate text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center underline">
                {singleCourse?.name}
              </h5>
              <div className="flex justify-between">
                <p>Level :</p> <p>{singleCourse?.level}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  <RatingComponent
                    rating={singleCourse?.rating}
                    NumberRating={false}
                  />
                </span>

                <p className="text-sm inline-flex gap-1 items-center">
                  <PiStudent />
                  <span className=" text-slate-400 font-bold">
                    {singleCourse?.purchase}
                  </span>{" "}
                  Students
                </p>
              </div>

              <div className="flex justify-between">
                <p>
                  <span className="line-through">
                    {singleCourse?.estimatedprice}₹{" "}
                  </span>
                  <sup className="text-red-500"> {singleCourse?.price}₹</sup>{" "}
                </p>{" "}
              </div>

              <Button
                color="green"
                pill
                className="w-full"
                //  onClick={() => redirectToCoursePage(singleCourse?._id)}
              >
                <Tooltip content="Redirect to the course details page">
                  Buy for {singleCourse?.price} ₹
                </Tooltip>
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
