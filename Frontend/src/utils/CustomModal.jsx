"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function CustomModal({ openModal, setOpenModal, title, children }) {
  //   console.log(childern);
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size={"md"}>
      <Modal.Header className="bg-white dark:bg-slate-900">
        {title}
      </Modal.Header>
      <Modal.Body className="bg-white dark:bg-slate-900">{children}</Modal.Body>
      {/* <Modal.Footer className="justify-end bg-white dark:bg-slate-900">
        <Button color="failure" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CustomModal;
