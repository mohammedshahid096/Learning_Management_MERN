import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import {
  AdminSingleImpLinkAPI,
  AdminUpdateImpLinkAPI,
} from "../../../Apis/implink.api";
import { Button, ToggleSwitch, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";

const SingleImpLink = () => {
  // react router dom
  const { linkId } = useParams();

  //   usestates
  const [details, setdetails] = useState(null);
  const [isReadOnly, setisReadOnly] = useState(true);
  const [loading, setloading] = useState(false);

  const feilds = [
    "title",
    "description",
    "type",
    "url",
    "provider",
    "keywords",
    "section",
    "author",
    "copyright",
    "email",
    "twitter",
    "facebook",
    "image",
    "icon",
    "video",
    "audio",
    "isNpm",
  ];

  // # fucntions
  const fetchDetailsLink = async () => {
    const response = await AdminSingleImpLinkAPI(linkId);
    if (response.success) {
      setdetails(response.data);
    }
  };

  const commonChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let update = { ...details };
    update[name] = value;
    setdetails(update);
  };

  const keywordChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let update = { ...details };
    update[name] = value.split(",");
    setdetails(update);
  };

  const toggleChangeHandler = () => {
    let update = { ...details };
    update["isNpm"] = !update?.isNpm;
    setdetails(update);
  };

  const updateSubmitHandler = async () => {
    setloading(true);
    const response = await AdminUpdateImpLinkAPI(linkId, details);
    if (response.success) {
      toast.success("successfully updated the Implink");
      setisReadOnly(true);
    } else {
      toast.success(response.message);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchDetailsLink();
  }, [linkId]);
  return (
    <AdminLayout>
      {linkId}
      <div className="text-2xl font-bold  text-center">User Details</div>

      <div className="flex justify-end">
        {isReadOnly ? (
          <Button color="purple" onClick={() => setisReadOnly(false)}>
            Edit
          </Button>
        ) : (
          <Button color="red" onClick={() => setisReadOnly(true)}>
            Cancel
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {details &&
          feilds.map((singleFeild) => {
            if (singleFeild === "keywords") {
              return (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value={`${singleFeild} : `} />
                  </div>

                  <TextInput
                    type="text"
                    placeholder={"enter example,example2,..."}
                    value={details[singleFeild].join(",") ?? ""}
                    readOnly={isReadOnly}
                    name={singleFeild}
                    onChange={keywordChangeHandler}
                    required
                  />
                </div>
              );
            } else if (singleFeild === "isNpm") {
              return (
                <div>
                  <div className="mb-2 block">
                    <Label value={`${singleFeild} : `} />
                  </div>
                  <ToggleSwitch
                    checked={details[singleFeild] ?? false}
                    onChange={toggleChangeHandler}
                    label="Toggle me"
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value={`${singleFeild} : `} />
                  </div>
                  <TextInput
                    type="text"
                    placeholder={singleFeild}
                    value={details[singleFeild] ?? ""}
                    readOnly={isReadOnly}
                    name={singleFeild}
                    onChange={commonChangeHandler}
                    required
                  />
                </div>
              );
            }
          })}
      </div>

      <div className="flex justify-center mt-4">
        {details && !isReadOnly && (
          <Button
            color="green"
            disabled={loading}
            isProcessing={loading}
            onClick={updateSubmitHandler}
          >
            Update
          </Button>
        )}
      </div>
    </AdminLayout>
  );
};

export default SingleImpLink;
