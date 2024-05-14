import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import CustomModal from "../../../utils/CustomModal";
import { AddImpLinkAPI } from "../../../Apis/implink.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adminAllLinksAction } from "../../../Redux/actions/course.action";

const AddLinkComponent = ({ limit, page }) => {
  const [openModal, setopenModal] = useState(false);
  const [urlLink, seturlLink] = useState("");
  const [isNpm, setisNpm] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const addLinkSubmitHandler = async () => {
    setisLoading(true);
    const response = await AddImpLinkAPI({
      url: urlLink,
      isNpm,
    });

    if (response.success) {
      toast.success(response.message);
      dispatch(adminAllLinksAction(limit, page, false));
      setopenModal(false);
    } else {
      toast.error(response.message);
    }

    setisLoading(false);
  };

  useEffect(() => {
    if (!openModal) {
      seturlLink("");
      setisNpm(false);
    }
  }, [openModal]);
  return (
    <>
      <div className="flex justify-end">
        <Button color="green" onClick={() => setopenModal(true)}>
          Add Link
        </Button>
      </div>

      <CustomModal
        title={"Add New Link"}
        openModal={openModal}
        setopenModal={setopenModal}
      >
        <div className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Enter the url or link" />
            </div>
            <TextInput
              type="url"
              placeholder="http://name@flowbite.com"
              value={urlLink}
              onChange={(e) => seturlLink(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={isNpm}
              onChange={(e) => setisNpm(e.target.checked)}
            />
            <Label htmlFor="remember">Is NPM package?</Label>
          </div>
          <Button
            type="button"
            disabled={isLoading || urlLink == "" ? true : false}
            isProcessing={isLoading}
            onClick={addLinkSubmitHandler}
          >
            Submit
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddLinkComponent;
