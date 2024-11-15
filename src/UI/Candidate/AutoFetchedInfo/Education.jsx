import React, { useState, useEffect } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

// Utility function to format dates

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  Degree: Yup.string().required("Degree is required"),
  Institution: Yup.string(),
});

const Education = ({ educationList, setEducationList }) => {
  const [addEducation, setAddEducation] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortedEducationList, setSortedEducationList] = useState([]);
  console.log("edu", educationList);
  const formik = useFormik({
    initialValues: {
      Degree: "",
      Institution: "",
      Year: "", // Date of completion
      currentlyEnrolled: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formattedData = {
        Degree: values.Degree,
        Institution: values.Institution,
        Year: values.currentlyEnrolled
          ? "Current"
          : format(values.Year, "dd/MM/yyyy"), // Ensure values.Year is a date object
        currentlyEnrolled: values.currentlyEnrolled,
      };
      console.log("Submitting values:", formattedData);

      // Handle adding/updating in state
      if (editIndex !== null) {
        setEducationList((prev) =>
          prev.map((edu, index) => (index === editIndex ? formattedData : edu))
        );
      } else {
        setEducationList((prev) => [...prev, formattedData]);
      }

      resetForm();
      setAddEducation(false);
      setEditIndex(null);
    },
  });

  useEffect(() => {
    if (educationList && educationList.length > 0) {
      const sortedList = educationList
        .filter((edu) => edu.Year === "Present")
        .concat(
          educationList
            .filter((edu) => edu.Year !== "Present")
            .sort((a, b) => new Date(b.Year) - new Date(a.Year))
        )
        .slice(0, 3);
      setSortedEducationList(sortedList);
    } else {
      setSortedEducationList([]); // Clear the list if no data
    }
  }, [educationList]);

  const handleEditEducation = (index) => {
    const education = educationList[index];
    setEditIndex(index);
    setAddEducation(true);
    formik.setValues({
      Degree: education.Degree,
      Institution: education.Institution,
      Year:
        education.Year === "Present" ||
        education.Year === "Current" ||
        education.Year === "Continue"
          ? ""
          : education.Year,
      currentlyEnrolled:
        education.Year === "Present" ||
        education.Year === "Current" ||
        education.Year === "Continue",
    });
  };

  const handleDeleteEducation = (index) => {
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Education</p>
        <button className="text-xl px-5" onClick={() => setAddEducation(true)}>
          <VscDiffAdded />
        </button>
      </div>

      {addEducation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-[40%] bg-white px-5 py-2 rounded-xl">
            <div className="flex justify-between mt-8">
              <p className="text-2xl font-semibold">
                {editIndex !== null ? "Edit Education" : "Add Education"}
              </p>
              <button
                className="bg-black text-white p-2 text-lg rounded-lg"
                onClick={() => {
                  setAddEducation(false);
                  setEditIndex(null);
                  formik.resetForm();
                }}
              >
                <RxCross1 />
              </button>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-2 gap-5 mt-4"
            >
              <div className="flex flex-col">
                <label className="font-semibold px-2 flex">
                  Degree <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="Degree"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Degree}
                />
                {formik.touched.Degree && formik.errors.Degree && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.Degree}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold px-2">Institute</label>
                <input
                  type="text"
                  name="Institution"
                  className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Institution}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                  <label className="font-semibold px-2">
                    Date of Completion
                  </label>
                  <input
                    type="date"
                    name="Year"
                    className="border border-gray-300 bg-gray-50 px-2 py-1 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Year}
                    disabled={formik.values.currentlyEnrolled}
                  />
                  {formik.touched.Year && formik.errors.Year && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.Year}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="currentlyEnrolled"
                    checked={formik.values.currentlyEnrolled}
                    onChange={() =>
                      formik.setFieldValue(
                        "currentlyEnrolled",
                        !formik.values.currentlyEnrolled
                      )
                    }
                  />
                  <p>Currently enrolled</p>
                </div>
              </div>
              <div className="mt-5 col-span-2 flex justify-end ">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-1 rounded-lg"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {sortedEducationList.length > 0 ? (
          sortedEducationList.map((edu, i) => (
            <div
              key={i}
              className="border border-gray-500 p-2 my-2 rounded-xl flex justify-between text-sm"
            >
              <div className="flex flex-col justify-around">
                <h3 className="font-bold">{edu.Degree || "Degree Missing"}</h3>
                <p>{edu.Institution || "Institution Missing"}</p>
              </div>
              <div>
                <p>{edu.Year || "Year Missing"}</p>
                <div className="flex justify-end gap-2">
                  <button
                    className="text-white bg-black p-2 rounded-lg w-8 text-lg"
                    onClick={() => handleEditEducation(i)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-white bg-black p-2 rounded-lg w-8 text-lg"
                    onClick={() => handleDeleteEducation(i)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education .</p>
        )}
      </div>
    </div>
  );
};

export default Education;
