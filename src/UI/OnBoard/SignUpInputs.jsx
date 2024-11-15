import React, { useState, useContext } from "react";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignup from "../../Services/Onboard/Signup/useSignup";
const SignUpInputs = () => {
  const { fetchData, data, error, loading } = useSignup();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      designation: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required."),
      last_name: Yup.string().required("Last name is required."),
      email: Yup.string()
        .email("Email address is invalid.")
        .required("Email is required."),
      designation: Yup.string().required("Designation is required."),
      password: Yup.string()
        .min(5, "Password must be at least 5 characters long.")
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
        .required("Password is required."),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match.")
        .required("Confirm password is required."),
    }),
    onSubmit: async (values, { resetForm }) => {
      await fetchData(values);
      resetForm();
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex-1 w-1/2  py-4">
      <div className="w-[90%] mx-auto pt-6">
        <h1 className="text-2xl font-semibold text-center font-poppins text-pink-500">
          Sign Up
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 laptop:text-sm laptop:px-16"
        >
          {/* First Name */}
          <div className="space-y-1">
            <label
              htmlFor="first_name"
              className="font-semibold flex gap-1 items-center "
            >
              <CiUser /> First Name
            </label>
            <input
              type="text"
              id="first_name"
              placeholder="Type your first name"
              className={`rounded-3xl border  outline-none px-4 ${
                formik.errors.first_name ? "border-red-500" : "border-pink-400"
              } p-2 w-full`}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1 mt-2">
            <label
              htmlFor="last_name"
              className="font-semibold flex items-center gap-1"
            >
              <CiUser /> Last Name
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Type your last name"
              className={`rounded-3xl border  outline-none px-4 ${
                formik.errors.last_name ? "border-red-500" : "border-pink-400"
              } p-2 w-full`}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 mt-2">
            <label
              htmlFor="email"
              className="font-semibold flex gap-1 items-center"
            >
              <IoPersonOutline /> Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              className={`rounded-3xl border  outline-none px-4 ${
                formik.errors.email ? "border-red-500" : "border-pink-400"
              } p-2 w-full`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Designation */}
          <div className="space-y-1 mt-2">
            <label
              htmlFor="designation"
              className="font-semibold flex items-center gap-1"
            >
              <CiUser /> Designation
            </label>
            <input
              type="text"
              id="designation"
              placeholder="Type your designation"
              className={`rounded-3xl border  outline-none px-4 ${
                formik.errors.designation ? "border-red-500" : "border-pink-400"
              } p-2 w-full`}
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.designation && formik.errors.designation && (
              <p className="text-red-500 text-sm">
                {formik.errors.designation}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 mt-3">
            <label
              htmlFor="password"
              className="font-semibold flex gap-1 items-center"
            >
              <MdLockOutline /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={`rounded-3xl border  outline-none px-4 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-pink-400"
                } p-2 w-full pr-10`} // Added padding-right for the icon
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 mt-2">
            <label
              htmlFor="confirm_password"
              className="font-semibold flex gap-1 items-center"
            >
              <MdLockOutline /> Confirm Password
            </label>
            <div className="relative flex">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                placeholder="Re-enter your password"
                className={`rounded-3xl border  outline-none px-4 ${
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? "border-red-500"
                    : "border-pink-400"
                } p-2 w-full pr-10`}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirm_password}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-3xl border py-1 w-3/6 mt-4 bg-LoginBtn bg-cover bg-center laptop:text-lg text-white"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error||JSON.stringify(error)}
            </div>
          )}

          {/* Google Sign In */}
          <div className="w-full flex items-center mt-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-center">
            <div className="rounded-3xl border border-pink-400 p-2 w-3/6 mt-2 text-center text-sm laptop:text-md">
              <p className="flex gap-2 items-center justify-center">
                <FcGoogle /> Continue with Google
              </p>
            </div>
          </div>

          {/* Link to Login */}
          <div className="mt-2 text-center text-md">
            <p className="text-gray-400">
              Already have an account?
              <span className="text-pink-400 pl-3">
                <Link to="/login" className="font-semibold">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpInputs;
