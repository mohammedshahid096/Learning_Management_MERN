import React from "react";
import Sidebar from "../../components/Snippets/Sidebar";
import { Card, TextInput, Button } from "flowbite-react";
import { FaSearch, FaPlus } from "react-icons/fa";
import SwipperSection from "../../components/Snippets/SwipperSection";

const snippetPage = () => {
  return (
    <div className="p-3 flex gap-2">
      <Sidebar />
      <div className=" space-y-4 w-9/12">
        <Card>
          {" "}
          <div className="flex gap-3 justify-center">
            <TextInput
              type="email"
              icon={FaSearch}
              placeholder="Search a snippet"
              className=" w-3/4"
              required
            />

            <Button color="purple" pill>
              <FaPlus className="mr-2 h-5 w-5" />
              Snippet
            </Button>
          </div>
        </Card>

        <Card className="card-p-5px">
          <SwipperSection />
        </Card>
      </div>
    </div>
  );
};

export default snippetPage;
