import React, { useState } from "react";
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLogin from "../../Services/Onboard/login/useLogin";

const LoginInputs = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, error } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await login(values);
      console.log("Login successful:", data);
      const newRefreshToken = data.refresh_token;
      const newMode = data.Mode;
      const profile = data.Profile_Status;
      const fname=data.first_name;
      const lname=data.last_name;
      const pic=data.IMAGE_URL;
      localStorage.setItem("email", values.email);
      localStorage.setItem("Token", newRefreshToken);
      localStorage.setItem("FirstName", fname);
      localStorage.setItem("LastName", lname);
      localStorage.setItem("Image", pic);

      if (newMode === "Employer") {
        if (profile === "incomplete") {
          navigate("/employeeprofile");
        } else {
          navigate("/empDashboard");
        }
        
      } else if (newMode === "Candidate") {
        if (profile === "incomplete") {
          navigate("/candidateInfo");
        } else {
          navigate("/candidate");
        }
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-20">
      <div className="w-[90%] mx-auto">
        <div>
          <p className="font-semibold text-center text-lg laptop:text-2xl text-pink-500">Log In</p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="laptop:mt-16 text-base laptop:text-sm laptop:px-16">
              <div className="flex flex-col space-y-2 mb-2 mt-5 py-3">
                <label className="font-semibold flex items-center gap-2">
                  <IoPersonOutline /> Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Type your email"
                  className="border-solid border py-2 rounded-full border-pink-400 px-5 outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-semibold flex items-center gap-2">
                  <IoLockClosedOutline /> Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full border-solid border py-2 rounded-full border-pink-400 px-5 outline-none"
                  />
                  <div
                    className="absolute top-3 right-3 text-lg cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <MdOutlineVisibilityOff />  : <MdOutlineRemoveRedEye />}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
              </div>
              {error && <div className="text-red-500 text-center mt-2">{error}</div>}
              <div className="flex justify-between px-1 py-1 mt-4 text-xs laptop:text-base">
                <div className="flex gap-2">
                  <Field type="checkbox" name="remember" />
                  Remember me
                </div>
                <Link to="/ForgotPassword" className="text-gray-400">Forgot password?</Link>
              </div>
              <div className="flex flex-col justify-center items-center mt-4">
                <button
                  className="mx-auto w-[60%] tablet:w-[75%] laptop:w-3/6 border-solid border rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5 text-base laptop:text-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Log In
                </button>
              </div>
              <div className="w-full flex items-center mt-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 font-semibold">Or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="flex justify-center">
                <div className="rounded-full border border-pink-400 p-2 w-3/6 mt-2 text-center text-xs laptop:text-md">
                  <p className="flex gap-2 items-center justify-center">
                    <FcGoogle /> Continue with Google
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center text-xs laptop:text-md mt-6">
                <p className="text-gray-400">Don't have an account?</p>
                <Link to="/signupchoice" className="text-pink-500 px-2 font-semibold">Register</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginInputs;
