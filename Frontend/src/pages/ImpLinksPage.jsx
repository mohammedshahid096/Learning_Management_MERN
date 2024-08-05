import { Button, TextInput, Alert, Spinner, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiEye, HiInformationCircle } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrorUrlsState,
  ScrollUrlLinksAction,
  SearchUrlLinksAction,
} from "../Redux/actions/implinks.action";
import toast from "react-hot-toast";
import { FaRegImage, FaExclamationCircle, FaSearch } from "react-icons/fa";
import MetaData from "../utils/MetaData";
import CustomLoader from "../utils/Loader";
import { SearchImpLinkAPI } from "../Apis/implink.api";

const LIMIT_DATA = 10;

const Skeleton = () => {
  return (
    <div className="flex justify-center gap-6 flex-wrap max-md:flex-col py-7">
      {Array.from({ length: 4 }, (_, i) => i)?.map((singleURL, index) => (
        <div
          key={"skeleton_" + index + 1}
          className="flex w-5/12 max-md:w-full flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-m hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 "
        >
          <div className="flex justify-center items-center rounded-t-lg max-md:rounded-none  md:rounded-none md:rounded-s-lg h-28 w-28 max-sm:h-16 max-sm:w-16 opacity-10 animate-pulse">
            <FaRegImage size={35} />
          </div>
          <div className="p-4 w-full">
            <h5 className="mb-2 text-xl max-sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-clip max-h-6 max-w-xl">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </h5>
            <p className="mb-3  max-sm:text-sm text-gray-700 dark:text-gray-400  max-h-5 max-w-xl">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-4"></div>
            </p>
            <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 flex justify-end">
              {/* - {singleURL?.provider} */}
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
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

const RenderSearchData = ({ data }) => {
  return data?.length === 0 ? (
    <NotFoundComponent />
  ) : (
    <div className="flex justify-center gap-6 flex-wrap max-md:flex-col">
      {data?.map((singleURL, index) => (
        <a
          key={singleURL?._id}
          href={singleURL?.url}
          target="_blank"
          className="flex w-5/12 max-md:w-full flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-m hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 h-28 max-md:h-fit"
        >
          <Tooltip
            content={
              singleURL?.description ? singleURL?.description : singleURL?.title
            }
          >
            <img
              className="object-cover rounded-t-lg max-md:rounded-none  md:rounded-none md:rounded-s-lg h-28 w-28 max-md:48"
              src={singleURL?.icon}
              alt={singleURL?.provider}
            />
          </Tooltip>
          <div className="p-4 leading-normal">
            <h5 className="mb-2 text-xl max-sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-clip max-h-6 max-w-xl">
              <span className=" text-red-500">{index + 1}.</span>{" "}
              {singleURL?.title}
            </h5>
            <p className="mb-3 font-normal max-sm:text-sm text-gray-700 dark:text-gray-400 overflow-hidden  text-ellipsis max-h-5 max-w-xl">
              {singleURL?.description}
            </p>
            <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 text-right">
              - {singleURL?.provider}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

const ImpLinksPage = () => {
  // redux
  const dispatch = useDispatch();
  const {
    loading,
    error,
    urlsData,
    totalLinks,
    page,
    loadingScroll,
    searchType,
  } = useSelector((state) => state.URLState);

  // # usestates
  const [filteredData, setfilteredData] = useState(urlsData || []);
  const [searchKeyDataUrl, setsearchKeyDataUrl] = useState(null);
  const [activeCategory, setactiveCategory] = useState("all");
  const [searchKey, setsearchKey] = useState("");
  const [searchloading, setsearchloading] = useState(false);

  // # functions

  const ButtonsArray = [
    { title: "All", Fun: AllFunction, state: "all" },
    { title: "NPM", Fun: NpmFunction, state: "npm" },
    { title: "Website", Fun: WebsiteFunction, state: "website" },
  ];

  function AllFunction() {
    if (searchKey) {
      setsearchKey("");
      setsearchKeyDataUrl(null);
    }
    setactiveCategory("all");
    if (totalLinks === urlsData?.length && searchType === "all") {
      setfilteredData(urlsData);
    } else {
      fetchInitialDataHandler();
    }
  }

  function NpmFunction() {
    if (searchKey) {
      setsearchKey("");
      setsearchKeyDataUrl(null);
    }
    setactiveCategory("npm");
    if (totalLinks === urlsData?.length && searchType === "all") {
      let update = urlsData?.filter((item) => item.isNpm === true);
      setfilteredData(update);
    } else {
      fetchInitialDataHandler("npm");
    }
  }
  function WebsiteFunction() {
    if (searchKey) {
      setsearchKey("");
      setsearchKeyDataUrl(null);
    }
    setactiveCategory("website");
    if (totalLinks === urlsData?.length && searchType === "all") {
      let update = urlsData?.filter((item) => item.isNpm === false);
      setfilteredData(update);
    } else {
      fetchInitialDataHandler("website");
    }
  }

  const fetchInitialDataHandler = (type = "all") => {
    dispatch(SearchUrlLinksAction({ limit: LIMIT_DATA, type }));
  };

  const clearErrors = () => {
    dispatch(ClearErrorUrlsState());
  };

  const fetchMoreDataHandler = (type = "all") => {
    dispatch(
      ScrollUrlLinksAction({
        limit: LIMIT_DATA,
        page: page + 1,
        type: activeCategory === "all" ? "all" : activeCategory,
      })
    );
  };

  const fetchSearchKeyHandler = async () => {
    setsearchloading(true);
    const response = await SearchImpLinkAPI(searchKey);
    if (response.success) {
      setsearchKeyDataUrl(response.data);
    }
    setsearchloading(false);
  };

  const localSearchHandler = () => {
    let update = urlsData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.keywords.join(",").toLowerCase().includes(searchKey.toLowerCase())
    );
    setsearchKeyDataUrl(update);
  };

  useEffect(() => {
    if (!urlsData) {
      fetchInitialDataHandler();
    }
    if (urlsData) {
      setfilteredData(urlsData);
    }
  }, [urlsData]);

  // debouncing concept
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchKey) {
        if (totalLinks === urlsData?.length && searchType === "all") {
          localSearchHandler();
        } else {
          fetchSearchKeyHandler();
        }
      }
      if (searchKey === "") {
        setsearchKeyDataUrl(null);
      }
    }, 1500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchKey]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  return loading ? (
    <>
      <Skeleton />
      <CustomLoader loading={true} />
    </>
  ) : (
    <main className="p-6">
      <MetaData title="important urls" />
      <CustomLoader loading={searchloading} />

      <h1 className="text-3xl text-center font-bold">
        Useful Website's / NPM's /Cheatsheet's
      </h1>
      <div className="flex gap-3 p-3 max-sm:flex-col max-sm:justify-center">
        <TextInput
          placeholder="search keyword ... "
          icon={FaSearch}
          value={searchKey}
          onChange={(e) => setsearchKey(e.target.value)}
        />

        <div className="flex gap-3 justify-center flex-wrap">
          {ButtonsArray.map((singleButton) => (
            <Button
              key={singleButton.state}
              color={activeCategory === singleButton.state ? "purple" : "dark"}
              pill
              onClick={singleButton.Fun}
            >
              {singleButton.title}
            </Button>
          ))}
        </div>
      </div>
      <br />

      {searchKeyDataUrl ? (
        <RenderSearchData data={searchKeyDataUrl} />
      ) : (
        <InfiniteScroll
          dataLength={urlsData?.length || 0}
          hasMore={totalLinks <= urlsData?.length ? false : true}
          loader={
            loadingScroll ? (
              <div className="flex justify-center mt-10 ">
                {" "}
                <Spinner size={"xl"} />{" "}
              </div>
            ) : null
          }
          next={fetchMoreDataHandler}
          endMessage={
            <Alert
              color="success"
              className="mt-5"
              withBorderAccent
              icon={HiInformationCircle}
              // onDismiss={() => alert("Alert dismissed!")}
              rounded
            >
              <span>
                <span className="font-medium">Info alert!</span> Thank you for
                scrolling upto last, we will soon add new links!..
              </span>
            </Alert>
          }
        >
          <div className="flex justify-center gap-6 flex-wrap max-md:flex-col">
            {filteredData?.map((singleURL, index) => (
              <a
                key={singleURL?._id}
                href={singleURL?.url}
                target="_blank"
                className="flex w-5/12 max-md:w-full flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-m hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 h-28 max-md:h-fit"
              >
                <Tooltip
                  content={
                    singleURL?.description
                      ? singleURL?.description
                      : singleURL?.title
                  }
                >
                  <img
                    className="object-cover rounded-t-lg max-md:rounded-none  md:rounded-none md:rounded-s-lg h-28 w-28 max-md:w-48"
                    src={singleURL?.icon}
                    alt={singleURL?.provider}
                  />
                </Tooltip>
                <div className="p-4 leading-normal">
                  <h5 className="mb-2 text-xl max-sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-clip max-h-6 max-w-xl">
                    <span className=" text-red-500">{index + 1}.</span>{" "}
                    {singleURL?.title}
                  </h5>
                  <p className="mb-3 font-normal max-sm:text-sm text-gray-700 dark:text-gray-400 overflow-hidden  text-ellipsis max-h-5 max-w-xl">
                    {singleURL?.description}
                  </p>
                  <p className="text-sm text-gray-500 max-sm:text-sm dark:text-gray-400 text-right">
                    - {singleURL?.provider}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </main>
  );
};

export default ImpLinksPage;
