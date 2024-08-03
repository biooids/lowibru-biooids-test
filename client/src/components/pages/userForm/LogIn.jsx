import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { quantum } from "ldrs";
quantum.register();

function LogIn() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (!data.success) {
        setErrorMessage(String(data.message));
        setOpenModal(true);
        setLoading(false);
        return;
      } else {
        navigate("/");
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
    <div className="bg-slate-700 min-h-screen flex flex-col justify-center items-center gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 p-3 bg-black w-[300px]"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="emailOrPhone" value="Email*" />
          </div>
          <TextInput
            onChange={handleChange}
            name="emailOrPhone"
            id="emailOrPhone"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            onChange={handleChange}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            required
            shadow
            placeholder="8 min character "
          />
          <div className="flex gap-2 justify-start items-center mt-3">
            <Checkbox
              onChange={() => setShowPassword(!showPassword)}
              id="showPassword"
              name="showPassword"
            />
            <p>show password</p>
          </div>
        </div>
        <Link to="/forgotpassword" className="text-cyan-500 underline ">
          forgot password
        </Link>

        <Button type="submit">
          {" "}
          {loading ? (
            <span className="flex justify-center items-center  gap-2">
              Loading
              <l-quantum size="25" speed="1.75" color="cyan"></l-quantum>
            </span>
          ) : (
            "Log In "
          )}
        </Button>
      </form>
      <div>
        {" "}
        <p>
          Have an account?{" "}
          <Link to="/signup" className="text-cyan-500 underline">
            Sign Up
          </Link>
        </p>{" "}
      </div>

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
  );
}

export default LogIn;
