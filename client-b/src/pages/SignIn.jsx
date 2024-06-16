import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../app/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  // Correctly selecting the user state
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add above
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // =======================================submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // return setErrorMessage("fill out all fields");
      return dispatch(signInFailure("please fill out all the fields "));
    }

    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrorMessage(` failed to sign up due to ${data.message}`);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data)); // add this too
        navigate("/");
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center">
        <div className="flex-1">
          <Link to="/" className="font-semibold dark:text-white text-4xl">
            <span className="px-2 py-2 bg-gradient-to-r from-purple-800 via-slate-700 to-cyan-700 text-white rounded-md">
              FFWPU
            </span>
          </Link>
          <p className="text-lg mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            rerum, porro reprehenderit impedit ipsum in facere corporis maiores
            consectetur, consequuntur molestiae, voluptatem dicta itaque at
            illum nam est. Omnis, sequi?
          </p>
        </div>
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading... please wait</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />

            <div className="placeholder-oauth">{/* OAuth Buttons Here */}</div>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account??</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="flex gap-2 text-sm mt-5" color="failure">
              <IoMdWarning />
              <span>{errorMessage}</span>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
