import React, { useRef, useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { EmployeProfileSchema } from "../../schemas/employeProfileSchema";
import EmpProfileSidebar from "../../UI/Employee/EmpProfileSidebar";
import useSubmitEmployeeProfile from "../../Services/Employee/EmployeeProfile/useSubmitEmployeeProfile";
import { useGetEmployeeProfile } from "../../Services/Employee/EmployeeProfile/useGetEmployeeProfile";
import pic from "../../assets/Images/illustration.png";
const initialValues = {
  first_name: "",
  last_name: "",
  company_name: "",
  company_chief_executive: "",
  founded: "",
  primary_industry: "",
  company_size: "",
  official_website: "",
  branches_in_countries: "",
  password: "",
};

const EmployeProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const { mutate, isLoading: post, isError: erro } = useSubmitEmployeeProfile();
  const { data: d, isLoading: load } = useGetEmployeeProfile();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EmployeProfileSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      try {
        await mutate(formData);
      } catch (err) {
        console.error("Error updating data:", err);
      }
    },
  });
  useEffect(() => {
    if (d) {
      formik.setValues({
        image: d.image || "",
        first_name: d.first_name || "",
        last_name: d.last_name || "",
        company_name: d.company_name || "",
        company_chief_executive: d.company_chief_executive || "",
        founded: d.founded || "",
        primary_industry: d.primary_industry || "",
        company_size: d.company_size || "",
        official_website: d.official_website || "",
        branches_in_countries: d.branches_in_countries || "",
        password: d.password || "",
      });
    }
  }, [d]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      formik.setFieldValue("image", file);
    }
  };
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <div className="bg-LoginBack bg-center bg-cover w-full py-4">
      <div className="flex w-[90%] mx-auto bg-white rounded-3xl flex-row">
        <EmpProfileSidebar />

        <div className="flex-auto my-1 mx-1 w-[65%]">
          <div className="bg-white my-1">
            <p className="font-bold text-lg tablet:text-2xl mt-2 ml-3">
              Employer profile
            </p>
            <p className="text-sm tablet:text-md laptop:text-xl ml-3 2xl:mt-4">
              Provide information about your company and other details
            </p>
          </div>
          <div className="flex flex-col mt-4 laptop:mt-6">
            <div className="w-full flex-col text-xs tablet:text-base">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center justify-center w-[90%]  mx-auto space-y-8"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img
                    src={
                      values.image instanceof File
                        ? URL.createObjectURL(values.image)
                        : values.image != null // Checks if it's not null or undefined
                        ? values.image
                        : pic
                    }
                    alt="Profile"
                    className="w-20 h-20 object-cover rounded-full"
                  />

                  <button
                    className="text-purple-500 font-semibold"
                    type="button"
                    onClick={handleClick}
                  >
                    Upload profile picture
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the file input
                  />
                  {errors.image && touched.image ? (
                    <p className="text-red-500">{errors.image}</p>
                  ) : null}
                </div>
                <div className="flex gap-5 tablet:gap-20 w-full">
                  <div className="flex flex-col w-full">
                    <label>First name</label>
                    <input
                      type="text"
                      placeholder="John"
                      name="first_name"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.first_name && touched.first_name ? (
                      <p className="text-red-500">{errors.first_name}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full">
                    <label>Last name</label>
                    <input
                      type="text"
                      placeholder="Francis"
                      name="last_name"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.last_name && touched.last_name ? (
                      <p className="text-red-500">{errors.last_name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-5 tablet:gap-20 w-full">
                  <div className="flex flex-col w-full">
                    <label>Chief Executive Officer</label>
                    <input
                      type="text"
                      placeholder="Ismail"
                      name="company_chief_executive"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.company_chief_executive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.company_chief_executive &&
                    touched.company_chief_executive ? (
                      <p className="text-red-500">
                        {errors.company_chief_executive}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full">
                    <label>Company name</label>
                    <input
                      type="text"
                      placeholder="7 Kings Code"
                      name="company_name"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.company_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.company_name && touched.company_name ? (
                      <p className="text-red-500">{errors.company_name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-5 tablet:gap-20 w-full">
                  <div className="flex flex-col w-full">
                    <label>Primary Industry</label>
                    <input
                      type="text"
                      placeholder="IT Services"
                      name="primary_industry"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.primary_industry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.primary_industry && touched.primary_industry ? (
                      <p className="text-red-500">{errors.primary_industry}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full">
                    <label>Founded in</label>
                    <input
                      type="date"
                      name="founded"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.founded}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.founded && touched.founded ? (
                      <p className="text-red-500">{errors.founded}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-5 tablet:gap-20 w-full">
                  <div className="flex flex-col w-full">
                    <label>Official Website</label>
                    <input
                      type="text"
                      placeholder="https://www.7kingscode.com"
                      name="official_website"
                      className="border border-gray-300 shadow-md rounded-md p-2 outline-none bg-gray-100"
                      value={values.official_website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.official_website && touched.official_website ? (
                      <p className="text-red-500">{errors.official_website}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full">
                    <label>Company size</label>
                    <input
                      type="number"
                      placeholder="100-200 employees"
                      name="company_size"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.company_size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.company_size && touched.company_size ? (
                      <p className="text-red-500">{errors.company_size}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-5 tablet:gap-20 w-full">
                  <div className="flex flex-col w-full">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Pakistan"
                      name="branches_in_countries"
                      className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                      value={values.branches_in_countries}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.branches_in_countries &&
                    touched.branches_in_countries ? (
                      <p className="text-red-500">
                        {errors.branches_in_countries}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full">
                    <label>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-100"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.password}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible className="text-gray-500" />
                        ) : (
                          <AiFillEye className="text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password ? (
                      <p className="text-red-500">{errors.password}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-end pb-10 pt-4 w-full">
                  <button
                    className="bg-LoginBtn bg-cover bg-center text-white px-10 py-3 rounded-full text-sm"
                    type="submit"
                  >
                    Complete profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default EmployeProfile;
