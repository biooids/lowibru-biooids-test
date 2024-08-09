import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { quantum } from "ldrs";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../app/user/userSlice.js";
import OAuth from "./OAuth.jsx";
quantum.register();

function SignUp() {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailOrPhone: "",
    password: "",
    repeatPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    specialChar: false,
    matching: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData((previous) => ({ ...previous, [id]: value }));

    if (id === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
        matching: formData.repeatPassword === value,
      });
    } else if (id === "repeatPassword") {
      setPasswordStrength((previous) => ({
        ...previous,
        matching: formData.password === value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.repeatPassword) {
      dispatch(signInFailure("Repeated password don't match"));
      setOpenModal(true);
      return;
    } else if (formData.password.length < 8) {
      dispatch(signInFailure("Password is short, it must be min 8 characters"));
      setOpenModal(true);
      return;
    } else if (
      !formData.userName ||
      !formData.emailOrPhone ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      dispatch(signInFailure("fill out all fields"));
      return;
    } else {
      try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!data.success) {
          dispatch(signInFailure(String(data.message)));
          setOpenModal(true);
          return;
        } else {
          console.log(data);
          dispatch(signInSuccess(data));
          navigate("/");
        }
      } catch (error) {
        dispatch(signInFailure(String(error.message || error)));
        setOpenModal(true);
      }
    }
  };

  return (
    <div className="b-slate-700 min-h-screen flex flex-col justify-center items-center gap-4">
      <div>
        <p>
          Do you have an account?{" "}
          <Link to="/login" className="text-cyan-500 underline">
            Log In
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-1">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value=" First name* " />
              </div>
              <TextInput
                onChange={onChange}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name*"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value=" Last name*" />
              </div>
              <TextInput
                onChange={onChange}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name*"
                required
                shadow
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userName" value=" User name*" />
            </div>
            <TextInput
              onChange={onChange}
              id="userName"
              name="userName"
              type="text"
              placeholder="User Name*"
              autoComplete="userName"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="emailOrPhone" value="Email*" />
            </div>
            <TextInput
              onChange={onChange}
              id="emailOrPhone"
              name="emailOrPhone"
              type="email"
              placeholder="Email*"
              required
              shadow
              autoComplete="email"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value=" Password*" />
            </div>
            <TextInput
              onChange={onChange}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              shadow
              placeholder="8 min characters*"
              autoComplete="new-password"
            />

            <div>
              <div className="flex gap-2 justify-start items-center mt-3">
                <Checkbox
                  id="showPassword"
                  name="showPassword"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <p>Show password</p>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <p>Password Strength :</p>

                <ul className="text-xs">
                  <li
                    className={
                      passwordStrength.length
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {" "}
                    8 min characters*
                  </li>
                  <li
                    className={
                      passwordStrength.number
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {" "}
                    At least one number
                  </li>
                  <li
                    className={
                      passwordStrength.specialChar
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeatPassword" value="Repeat password" />
            </div>
            <TextInput
              onChange={onChange}
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              required
              shadow
              autoComplete="new-password"
            />
            <p
              className={`
                text-sm mt-3
                ${
                  passwordStrength.matching ? "text-green-500" : "text-red-500"
                }`}
            >
              Password match
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agreeTerms" name="agreeTerms" required />
            <Label htmlFor="agreeTerms" className="flex">
              I agree with the&nbsp;
            </Label>
            <Link
              to="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-cyan-800"
            gradientDuoTone="purpleToBlue"
          >
            {loading ? (
              <span className="flex justify-center items-center  gap-2">
                Submitting the form
                <l-quantum size="25" speed="1.75" color="cyan"></l-quantum>
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p>Or register with Google if applicable</p>
        <OAuth />
      </div>

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
                {String(errorMessage).includes("userName") ? (
                  "This username exists. Change username."
                ) : String(errorMessage).includes("emailOrPhone") ? (
                  <>
                    This email or phone exists{" "}
                    <Link className="underline" to="/login">
                      LogIn.
                    </Link>{" "}
                  </>
                ) : String(errorMessage).includes(
                    "Unexpected end of JSON input"
                  ) ? (
                  "Check your internet connection"
                ) : (
                  errorMessage
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

export default SignUp;
