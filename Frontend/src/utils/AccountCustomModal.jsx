import { Modal } from "flowbite-react";
import { useState } from "react";
import { Login, Register, VerifyAccount } from "../components/Login";
import "../styles/login.css";
import { useSelector } from "react-redux";

function AccountCustomModal({ openModal, setOpenModal }) {
  // ### usestates
  const [accountType, setaccountType] = useState("login");

  // ### react redux
  const { ActivationToken } = useSelector((state) => state.AuthState);
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size={"md"}>
      <Modal.Header className="bg-white dark:bg-slate-900">
        {accountType === "login"
          ? "Login in to our platform"
          : "Register in to our platform"}
      </Modal.Header>
      <Modal.Body className="bg-white dark:bg-slate-900">
        {accountType === "login" && (
          <Login setaccountType={setaccountType} setOpenModal={setOpenModal} />
        )}

        {accountType === "signup" && (
          <Register setaccountType={setaccountType} />
        )}

        {accountType === "verify" && ActivationToken && (
          <VerifyAccount setaccountType={setaccountType} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AccountCustomModal;
