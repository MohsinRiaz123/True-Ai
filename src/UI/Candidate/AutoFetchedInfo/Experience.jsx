import React, { useState, useEffect } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format, parse } from "date-fns";

const Experience = ({ experienceList, setExperienceList }) => {
  const [addExp, setAddExp] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [sortedAndLimitedExperienceList, setSortedAndLimitedExperienceList] =
    useState([]);

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required("Job Title is required"),
    company: Yup.string().required("Company is required"),
    country: Yup.string(),
    cityState: Yup.string(),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      company: "",
      country: "",
      cityState: "",
      fromDate: "",
      ToDate: "",
      description: "",
      isCurrentlyWorking: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedData = {
        JobTitle: values.jobTitle,
        Company_Name: values.company,
        Country: values.country,
        City: values.cityState,
        From_Date: format(
          parse(values.fromDate, "dd/MM/yyyy", new Date()),
          "dd/MM/yyyy"
        ),
        To_Date: values.isCurrentlyWorking
          ? "Current"
          : format(
              parse(values.ToDate, "dd/MM/yyyy", new Date()),
              "dd/MM/yyyy"
            ),
        Description: values.description,
      };

      if (editIndex !== null) {
        setExperienceList((prev) =>
          prev.map((exp, index) => (index === editIndex ? formattedData : exp))
        );
      } else {
        setExperienceList((prev) => [...prev, formattedData]);
      }

      resetForm();
    },
  });
  const handleDateChange = (event, fieldName) => {
    const { value } = event.target; // YYYY-MM-DD format
    const dateObject = new Date(value); // Convert to Date object
    const formattedDate = format(dateObject, "dd/MM/yyyy"); // Format to DD/MM/YYYY
    formik.setFieldValue(fieldName, formattedDate); // Set the Formik field value
  };

  useEffect(() => {
    if (editIndex !== null) {
      const experience = experienceList[editIndex];
      formik.setValues({
        jobTitle: experience.JobTitle || "",
        company: experience.Company_Name || "",
        country: experience.Country || "",
        cityState: experience.City || "",
        fromDate: experience.From_Date || "",
        ToDate:
          experience.To_Date === "Current" ? "" : experience.To_Date || "",
        description: experience.Description || "",
        isCurrentlyWorking: experience.To_Date === "Current",
      });
    }
  }, [experienceList, editExp]);

  useEffect(() => {
    if (experienceList && experienceList.length > 0) {
      const sortedAndLimitedList = experienceList
        .filter((exp) => exp.To_Date === "Current" || exp.To_Date === "Present")
        .concat(
          experienceList
            .filter(
              (exp) => exp.To_Date !== "Current" && exp.To_Date !== "Present"
            )
            .sort((a, b) => new Date(b.To_Date) - new Date(a.To_Date))
        )
        .slice(0, 3);

      setSortedAndLimitedExperienceList(sortedAndLimitedList);
    } else {
      setSortedAndLimitedExperienceList([]); // Clear the list if no data
    }
  }, [experienceList]);

  const resetForm = () => {
    setAddExp(false);
    setEditExp(false);
    formik.resetForm();
    setEditIndex(null);
  };
  console.log(experienceList);

  const handleEditExperience = (index) => {
    const experience = experienceList[index];
    setEditIndex(index);
    setEditExp(true);
    setAddExp(false);
  };

  const handleDeleteExperience = (index) => {
    console.log("Deleting experience at index:", index);
    setExperienceList((prev) => prev.filter((_, i) => i !== index));
    console.log("experience now :", experienceList);
  };

  const handleToggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Work Experience</p>
        <button
          className="text-xl px-5 outline-none"
          onClick={() => {
            resetForm();
            setAddExp(true);
          }}
        >
          <VscDiffAdded />
        </button>
      </div>

      {/* Add Experience Form */}
      {addExp && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-[40%] bg-white px-5 py-2 rounded-xl">
            <div className="flex justify-between mt-8">
              <p className="text-2xl font-semibold">Add Work Experience</p>
              <button
                className="bg-black text-white p-2 text-lg rounded-lg"
                onClick={resetForm}
              >
                <RxCross1 />
              </button>
            </div>
            <form
              className="grid grid-cols-2 gap-5 mt-4"
              onSubmit={formik.handleSubmit}
            >
              {/* Job Title Field */}
              <div className="flex flex-col">
                <label className="font-semibold flex">
                  Job Title <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  className={`border ${
                    formik.touched.jobTitle && formik.errors.jobTitle
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.getFieldProps("jobTitle")}
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="text-red-600">{formik.errors.jobTitle}</p>
                )}
              </div>
              {/* Company Field */}
              <div className="flex flex-col">
                <label className="font-semibold flex">
                  Company <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  className={`border ${
                    formik.touched.company && formik.errors.company
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.getFieldProps("company")}
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="text-red-600">{formik.errors.company}</p>
                )}
              </div>
              {/* Country Field */}
              <div className="flex flex-col">
                <label className="font-semibold">Country</label>
                <input
                  type="text"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  {...formik.getFieldProps("country")}
                />
              </div>
              {/* City Field */}
              <div className="flex flex-col">
                <label className="font-semibold">City</label>
                <input
                  type="text"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  {...formik.getFieldProps("cityState")}
                />
              </div>
              {/* From Date Field */}
              <div className="flex flex-col">
                <label className="font-semibold">From</label>
                <input
                  type="date"
                  onChange={(event) => handleDateChange(event, "fromDate")}
                  className={`border ${
                    formik.touched.fromDate && formik.errors.fromDate
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.fromDate}
                />
                {formik.touched.fromDate && formik.errors.fromDate && (
                  <p className="text-red-600">{formik.errors.fromDate}</p>
                )}
              </div>
              {/* To Date Field */}
              <div className="flex flex-col">
                <label className="font-semibold">To</label>
                <input
                  type="date"
                  onChange={(event) => handleDateChange(event, "ToDate")}
                  className={`border ${
                    formik.touched.ToDate && formik.errors.ToDate
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.ToDate}
                  disabled={formik.values.isCurrentlyWorking}
                />
                {formik.touched.ToDate && formik.errors.ToDate && (
                  <p className="text-red-600">{formik.errors.ToDate}</p>
                )}
              </div>
              {/* Currently Working Checkbox */}
              <div className="flex gap-2 col-span-2">
                <input
                  type="checkbox"
                  checked={formik.values.isCurrentlyWorking}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "isCurrentlyWorking",
                      e.target.checked
                    );
                    if (e.target.checked) {
                      formik.setFieldValue("ToDate", ""); // Clear toDate if currently working
                    }
                  }}
                />
                <p>Currently working</p>
              </div>
              {/* Description Field */}
              <div className="flex flex-col col-span-2">
                <label className="font-semibold">Description</label>
                <textarea
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg min-h-[100px] mt-2"
                  {...formik.getFieldProps("description")}
                />
              </div>
              {/* Submit Button */}
              <div className="mt-5 flex justify-end col-span-2">
                <button
                  className="bg-black text-white px-6 py-1 rounded-lg"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Experience Form */}
      {editExp && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-[40%] bg-white px-5 py-2 rounded-xl">
            <div className="flex justify-between mt-8">
              <p className="text-2xl font-semibold">Edit Work Experience</p>
              <button
                className="bg-black text-white p-2 text-lg rounded-lg"
                onClick={resetForm}
              >
                <RxCross1 />
              </button>
            </div>
            <form
              className="grid grid-cols-2 gap-5 mt-4"
              onSubmit={formik.handleSubmit}
            >
              {/* Job Title Field */}
              <div className="flex flex-col">
                <label className="font-semibold flex">
                  Job Title <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  className={`border ${
                    formik.touched.jobTitle && formik.errors.jobTitle
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.getFieldProps("jobTitle")}
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="text-red-600">{formik.errors.jobTitle}</p>
                )}
              </div>
              {/* Company Field */}
              <div className="flex flex-col">
                <label className="font-semibold flex">
                  Company <p className="text-red-600">*</p>
                </label>
                <input
                  type="text"
                  className={`border ${
                    formik.touched.company && formik.errors.company
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.getFieldProps("company")}
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="text-red-600">{formik.errors.company}</p>
                )}
              </div>
              {/* Country Field */}
              <div className="flex flex-col">
                <label className="font-semibold">Country</label>
                <input
                  type="text"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  {...formik.getFieldProps("country")}
                />
              </div>
              {/* City Field */}
              <div className="flex flex-col">
                <label className="font-semibold">City</label>
                <input
                  type="text"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  {...formik.getFieldProps("cityState")}
                />
              </div>
              {/* From Date Field */}
              <div className="flex flex-col">
                <label className="font-semibold">From</label>
                <input
                  type="date"
                  onChange={(event) => handleDateChange(event, "fromDate")}
                  className={`border ${
                    formik.touched.fromDate && formik.errors.fromDate
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.fromDate}
                />
                {formik.touched.fromDate && formik.errors.fromDate && (
                  <p className="text-red-600">{formik.errors.fromDate}</p>
                )}
              </div>
              {/* To Date Field */}
              <div className="flex flex-col">
                <label className="font-semibold">To</label>
                <input
                  type="date"
                  onChange={(event) => handleDateChange(event, "ToDate")}
                  className={`border ${
                    formik.touched.ToDate && formik.errors.ToDate
                      ? "border-red-600"
                      : "border-gray-300"
                  } bg-gray-50 px-2 py-1 rounded-lg`}
                  {...formik.ToDate}
                  disabled={formik.values.isCurrentlyWorking}
                />
                {formik.touched.ToDate && formik.errors.ToDate && (
                  <p className="text-red-600">{formik.errors.ToDate}</p>
                )}
              </div>
              {/* Currently Working Checkbox */}
              <div className="flex gap-2 col-span-2">
                <input
                  type="checkbox"
                  checked={formik.values.isCurrentlyWorking}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "isCurrentlyWorking",
                      e.target.checked
                    );
                    if (e.target.checked) {
                      formik.setFieldValue("ToDate", ""); // Clear toDate if currently working
                    }
                  }}
                />
                <p>Currently working</p>
              </div>
              {/* Description Field */}
              <div className="flex flex-col col-span-2">
                <label className="font-semibold">Description</label>
                <textarea
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg min-h-[100px] mt-2"
                  {...formik.getFieldProps("description")}
                />
              </div>
              {/* Submit Button */}
              <div className="mt-5 flex justify-end col-span-2">
                <button
                  className="bg-black text-white px-6 py-1 rounded-lg"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {sortedAndLimitedExperienceList.length < 1 ? (
          <p className="text-gray-500">No work experience.</p>
        ) : (
          sortedAndLimitedExperienceList.map((exp, i) => (
            <div
              key={i}
              className="border border-gray-500 p-2 my-2 rounded-xl flex justify-between text-sm"
            >
              <div className="w-full space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {exp.JobTitle || "Job Title Missing"}
                  </h3>
                  <p>
                    {exp.From_Date
                      ? format(
                          parse(exp.From_Date, "dd/MM/yyyy", new Date()),
                          "dd/MM/yyyy"
                        )
                      : "N/A"}{" "}
                    -{" "}
                    {exp.To_Date === "Current"
                      ? "Present"
                      : exp.To_Date
                      ? format(
                          parse(exp.To_Date, "dd/MM/yyyy", new Date()),
                          "dd/MM/yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>{exp.Company_Name || "Company Missing"}</p>
                  <div className="flex gap-2">
                    <button
                      className="text-white bg-black p-2 rounded-lg w-8 text-lg"
                      onClick={() => handleEditExperience(i)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-white bg-black p-2 rounded-lg w-8 text-lg"
                      onClick={() => handleDeleteExperience(i)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
                <p>
                  {expandedIndex === i
                    ? exp.Description || "Description Missing"
                    : exp.Description && exp.Description.length > 150
                    ? `${exp.Description.slice(0, 150)}...`
                    : exp.Description || "Description Missing"}
                </p>
                {exp.Description && exp.Description.length > 150 && (
                  <button
                    className="text-blue-500 px-3"
                    onClick={() => handleToggleDescription(i)}
                  >
                    {expandedIndex === i ? "Less" : "More"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Experience;
