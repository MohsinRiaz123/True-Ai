import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usePersonalInfo from "../../Services/Candidate/CandidateProfile/usePersonalInfo";
import { useGetPersonalInfo } from "../../Services/Candidate/CandidateProfile/useGetPersonalInfo";

const CandidatePersonalInfo = () => {
  const {
    mutate: updatedata,
    isLoading: post,
    isError: erro,
  } = usePersonalInfo();
  console.log("Post loading state:", post);
  const { data: d, isLoading: load } = useGetPersonalInfo();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date_of_birth: null,
      gender: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required."),
      last_name: Yup.string().required("Last name is required."),
      date_of_birth: Yup.date()
        .nullable()
        .required("Date of birth is required.")
        .test("minAge", "You must be at least 18 years old.", (value) => {
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return value && value <= minDate;
        }),
      gender: Yup.string().required("Gender is required."),
      profile_picture:Yup.mixed()
        .required("Please upload a profile picture")
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      try {
        await updatedata(formData);
      } catch (err) {
        console.error("Error updating data:", err);
      }
    },
  });

  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("profile_picture", file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    if (formik.errors[name]) {
      formik.setFieldError(name, undefined);
    }
  };

  const handleDateChange = (date) => {
    formik.setFieldValue("date_of_birth", date);
    if (formik.errors.date_of_birth) {
      formik.setFieldError("date_of_birth", undefined);
    }
  };

  useEffect(() => {
    if (d) {
      const fetchedDate = new Date(d.date_of_birth);
      const isValidDate = !isNaN(fetchedDate.getTime());
      formik.setValues({
        first_name: d.first_name || "",
        last_name: d.last_name || "",
        date_of_birth: isValidDate ? fetchedDate : null,
        gender: d.gender || "",
        profile_picture: d.profile_picture || null,
      });
    }
  }, [d]);
  console.log("pic", formik.values.profile_picture);
  if (load) {
    return (
      <div className="flex justify-center items-center">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-400 border-8 h-44 w-44"></div>
      </div>
    );
  }
  return (
    <div className="flex justify-between flex-col h-full">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="font-bold text-lg tablet:text-2xl">Candidate profile</p>
          <p className="text-sm tablet:text-md laptop:text-lg">
            Provide information about your profession and other details
          </p>
        </div>
        <div>
          <p className="text-xl font-bold mt-3">Personal Information</p>
        </div>

        <form className="space-y-10" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center justify-center space-y-2">
            <img
              src={
                formik.values.profile_picture instanceof File
                  ? URL.createObjectURL(formik.values.profile_picture)
                  : formik.values.profile_picture
              }
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full"
            />
            <button
              type="button"
              className="text-purple-500 font-semibold"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Picture
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              defaultValue={formik.profile_picture}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {formik.touched.profile_picture &&
              formik.errors.profile_picture && (
                <p className="text-red-500 text-sm">
                  {formik.errors.profile_picture}
                </p>
              )}
          </div>

          <div className="flex gap-5 tablet:gap-20 w-full">
            <div className="flex flex-col w-full">
              <label className="font-semibold flex gap-1">First name</label>
              <input
                type="text"
                placeholder="John"
                name="first_name"
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.first_name && formik.errors.first_name
                    ? "border-red-500"
                    : ""
                }`}
                value={formik.values.first_name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.first_name}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold flex gap-1">Last name</label>
              <input
                type="text"
                placeholder="Francis"
                name="last_name"
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.last_name && formik.errors.last_name
                    ? "border-red-500"
                    : ""
                }`}
                value={formik.values.last_name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.last_name}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-5 tablet:gap-20 w-full">
            <div className="flex flex-col w-full">
              <label className="font-semibold">Date of birth</label>
              <DatePicker
                selected={formik.values.date_of_birth}
                onChange={handleDateChange}
                dateFormat="MM / d / yyyy"
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.date_of_birth && formik.errors.date_of_birth
                    ? "border-red-500"
                    : ""
                }`}
                placeholderText="Select a date"
                showYearDropdown
                showMonthDropdown
                yearDropdownItemNumber={50}
                dropdownMode="select"
              />
              {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                <p className="text-red-500 text-sm">
                  {formik.errors.date_of_birth}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold">Gender</label>
              <select
                className={`border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200 ${
                  formik.touched.gender && formik.errors.gender
                    ? "border-red-500"
                    : ""
                } ${formik.values.gender ? "text-black" : "text-gray-400"}`}
                name="gender"
                value={formik.values.gender}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              >
                <option value="" className="text-gray-400">
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-LoginBtn bg-center bg-cover text-white px-4 py-1 rounded-full text-lg ${
                post ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={post}
            >
              {post ? "Uploading..." : "Next"}
            </button>
          </div>
        </form>
        {erro ? (
          <p className="text-red-500 text-sm"> Error in data Posting </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CandidatePersonalInfo;
