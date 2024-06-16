import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  // add this
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // add above
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //trim()to remove spaces
  };
  // =======================================submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null); //error from previous request
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(` failed to sign up due to ${data.message}`);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label value="your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>

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
                "Sign Up"
              )}
            </Button>
            <OAuth />

            <div className="placeholder-oauth">{/* OAuth Buttons Here */}</div>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account??</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
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

export default SignUp;
