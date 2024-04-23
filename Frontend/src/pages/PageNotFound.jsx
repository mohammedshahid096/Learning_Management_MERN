import React from "react";
import MetaData from "../utils/MetaData";
import PageNotBanner from "../assets/images/pagenotfound.png";
import { Button, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MetaData title="404 - Page Not Found" />

      <div className="w-screen flex flex-col justify-center items-center">
        <img
          src={PageNotBanner}
          alt="faqbanner"
          className="w-[500px] h-[400px] object-cover animate__animated animate__slower animate__flip "
        />{" "}
        <div className="flex gap-4">
          <Tooltip content="Redirect to home page" animation="duration-1000">
            <Button color="gray" pill onClick={() => navigate("/")}>
              Home Page
            </Button>
          </Tooltip>

          <Tooltip content="Redirect to courses page" animation="duration-1000">
            <Button color="gray" pill onClick={() => navigate("/courses")}>
              Course Page
            </Button>
          </Tooltip>
        </div>
        <br />
      </div>
    </div>
  );
};

export default PageNotFound;
