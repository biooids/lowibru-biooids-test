import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Toast,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { quantum } from "ldrs";
quantum.register();
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const notify = () =>
    toast("Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "light",
      // transition: Bounce,
    });

  const [formData, setFormData] = useState({
    emailOrPhone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMessage(String(data.message));
        setOpenModal(true);
        setLoading(false);

        return;
      } else {
        navigate("/email-sent");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(String(error));
      setOpenModal(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      {" "}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[300px]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="emailOrPhone" value="Enter your Email*" />
          </div>
          <TextInput
            onChange={onChange}
            id="emailOrPhone"
            name="emailOrPhone"
            type="text"
            placeholder="Email or Phone*"
            required
            shadow
            autoComplete="email"
          />
        </div>

        <Button
          type="submit"
          className="bg-cyan-800"
          gradientDuoTone="purpleToPink"
        >
          {loading ? (
            <span className="flex justify-center items-center  gap-2">
              Searching user
              <l-quantum size="25" speed="1.75" color="cyan"></l-quantum>
            </span>
          ) : (
            "Verify "
          )}
        </Button>
      </form>
      <div>
        <Modal
          show={openModal}
          size="sm"
          onClose={() => setOpenModal(false)}
          popup
          className="bg-black"
        >
          <Modal.Header className="bg-slate-200" />
          <Modal.Body className="bg-slate-200">
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-slate-900 " />

              <h3 className="mb-5 text-lg font-normal text-slate-900 ">
                {String(errorMessage).includes("user not found") ? (
                  <>
                    User not found{" "}
                    <Link className="underline" to="/signup">
                      Sign Up
                    </Link>{" "}
                  </>
                ) : String(errorMessage).includes(
                    "Unexpected end of JSON input"
                  ) ? (
                  "Check your internet connection"
                ) : (
                  String(errorMessage)
                )}
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ForgotPassword;
