import { Modal } from "flowbite-react";
import { PropTypes } from "prop-types";

function CustomModal({ openModal, setopenModal, title, children }) {
  //   console.log(childern);
  return (
    <Modal show={openModal} onClose={() => setopenModal(false)} size={"md"}>
      <Modal.Header className="bg-white dark:bg-slate-900">
        {title}
      </Modal.Header>
      <Modal.Body className="bg-white dark:bg-slate-900 text-black dark:text-white">
        {children}
      </Modal.Body>
    </Modal>
  );
}
CustomModal.PropTypes = {
  openModal: PropTypes.boolean,
  setopenModal: PropTypes.boolean,
  title: PropTypes.string,
};
export default CustomModal;
