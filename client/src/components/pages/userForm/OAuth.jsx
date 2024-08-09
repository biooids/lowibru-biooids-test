import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase.js";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { HiOutlineExclamationCircle } from "react-icons/hi";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../app/user/userSlice.js";

function OAuth() {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        dispatch(signInFailure(data.message));
        setOpenModal(true);
        return;
      } else {
        dispatch(signInSuccess(data));

        navigate("/");
      }

      console.log(resultsFromGoogle);
    } catch (error) {
      setOpenModal(true);
      dispatch(signInFailure(error.message || error));
    }
  };
  return (
    <div>
      <Button
        className="w-full"
        type="submit"
        gradientDuoTone="purpleToPink"
        onClick={handleGoogleClick}
      >
        {loading ? (
          <span className="flex justify-center items-center  gap-2">
            Submitting the form
            <l-quantum size="25" speed="1.75" color="cyan"></l-quantum>
          </span>
        ) : (
          "Register with google"
        )}
      </Button>
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

export default OAuth;
