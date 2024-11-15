import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import * as Yup from "yup";
import useSearchOfOpenJob from "../../Services/Employee/HomePage/useSearchOfOpenJob";
import useAddOpenJob from "../../Services/Employee/HomePage/useAddOpenJob";
const Openjob = ({ openJobs, setOpenJob, setObj }) => {
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [showJobDetailPopup, setShowJobDetailPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [erroeMsg, seterrormsg] = useState();
  const jobsRef = useRef(null);
  const { search, error, load } = useSearchOfOpenJob();
  const { Add, error: err } = useAddOpenJob();
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setShowJobDetailPopup(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobsRef.current && !jobsRef.current.contains(event.target)) {
        setShowJobsDropdown(false);
      }
      if (
        addJobPopupRef.current &&
        !addJobPopupRef.current.contains(event.target)
      ) {
        setShowAddJobPopup(false);
      }
      if (
        jobDetailPopupRef.current &&
        !jobDetailPopupRef.current.contains(event.target)
      ) {
        setShowJobDetailPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddNewOpenJob = () => {
    setShowAddJobPopup(true);
  };

  const handleAddJob = async (values) => {
    // Logic to add a new job
    const newJob = { ...values, count: 0 }; // assuming a new job starts with a count of 1
    const res = await Add(values);
    if (res) {
      setOpenJob((prevJobs) => [...prevJobs, newJob]); // update the state with the new job
      setShowAddJobPopup(false);
    } else {
      seterrormsg(err);
    }
  };

  const validationSchema = Yup.object().shape({
    designation: Yup.string().required("Required"),
    years_of_experience: Yup.number().required("Required"),
    skill_set: Yup.string().required("Required"),
    requirements_description: Yup.string().required("Required"),
    user_email: Yup.string().email("Invalid email format").required("Required"),
  });
  const searchJob = async (value) => {
    const res = await search(value);
    setObj(res);
  };
  return (
    <div className="relative w-full tablet:w-4/6 laptop:w-3/6 mx-auto">
      <button
        className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-full text-left flex items-center"
        onClick={() => setShowJobsDropdown(!showJobsDropdown)}
        ref={jobsRef}
      >
        <span className="flex-1">Open Jobs</span>
        {showJobsDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {showJobsDropdown && (
        <div
          className="absolute bg-gray-100 border-gray-300 rounded-lg w-full mt-1 text-sm"
          ref={jobsRef}
        >
          {openJobs.map((job, index) => (
            <div
              key={index}
              className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="px-4 py-1" onClick={() => handleSelectJob(job)}>
                  {job.designation}
                </div>
                <button
                  className="hover:bg-black hover:text-white hover:rounded-lg px-4 py-1"
                  onClick={() => searchJob(job.designation)}
                >
                  <RiSearch2Line />
                </button>
              </div>
            </div>
          ))}
          {openJobs.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No open jobs</div>
          )}
          <button
            className="px-4 py-2 text-purple-500 font-semibold rounded-lg text-base flex gap-2"
            onClick={handleAddNewOpenJob}
          >
            <p className="text-white linear_grad1 p-1 rounded-lg">
              <FaPlus />
            </p>
            <p className="text-purple-600 font-semibold text-base">
              Add New Open Job
            </p>
          </button>
        </div>
      )}

      {/* Add Job Popup */}
      {showAddJobPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="flex bg-white px-3 py-3 w-[60%] laptop:w-[40%] flex-col rounded-2xl space-y-10">
            <div className="text-xl font-bold text-[#8E01FF] flex justify-center flex-col">
              <div className="flex justify-end">
                <p
                  className="text-white text-lg bg-black p-2 w-8 rounded-lg flex items-center cursor-pointer"
                  onClick={() => setShowAddJobPopup(false)}
                >
                  <RxCross1 />
                </p>
              </div>
              <p className="flex justify-center text-custom-dark-blue">
                Add New Open Job
              </p>
            </div>
            <div className="space-y-3">
              <Formik
                initialValues={{
                  designation: "",
                  requirements_description: "",
                  years_of_experience: "",
                  skill_set: "",
                  user_email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddJob}
              >
                {({ handleChange, handleBlur, values }) => (
                  <Form className="flex flex-col space-y-2">
                    <div>
                      <Field
                        as="input"
                        type="email"
                        name="user_email"
                        className="border rounded-lg p-2 w-full"
                        placeholder="Client email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_email}
                      />
                      <ErrorMessage
                        name="user_email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="designation"
                        className="border rounded-lg p-2 w-full"
                        placeholder="Job designation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.designation}
                      />
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        as="input"
                        type="number"
                        name="years_of_experience"
                        className="border rounded-lg p-2 w-full"
                        placeholder="Required years of experience"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.years_of_experience}
                      />
                      <ErrorMessage
                        name="years_of_experience"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        as="input"
                        name="skill_set"
                        className="border rounded-lg p-2 w-full"
                        placeholder="Skill set"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.skill_set}
                      />
                      <ErrorMessage
                        name="skill_set"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        as="textarea"
                        name="requirements_description"
                        className="border rounded-lg p-2 h-[150px] w-full"
                        placeholder="Job Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.requirements_description}
                      />
                      <ErrorMessage
                        name="requirements_description"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    {erroeMsg ? (
                      <p className="text-red-400 flex items-center justify-center">
                        {erroeMsg}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-black rounded-lg text-white font-semibold px-5 py-2"
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Popup */}
      {showJobDetailPopup && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="flex bg-white px-3 py-3 w-[60%] laptop:w-[40%] flex-col rounded-2xl space-y-10">
            <div className="text-xl font-bold text-[#8E01FF] flex justify-center flex-col">
              <div className="flex justify-end">
                <p
                  className="text-white text-lg bg-black p-2 w-8 rounded-lg flex items-center cursor-pointer"
                  onClick={() => setShowJobDetailPopup(false)}
                >
                  <RxCross1 />
                </p>
              </div>
              <p className="flex justify-center text-custom-dark-blue ">
                Job Details : {selectedJob.designation}
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">Designation:</p>
                <p>{selectedJob.designation}</p>
              </div>
              <div>
                <p className="font-semibold">Experience:</p>
                <p>
                  {selectedJob.years_of_experience
                    ? `${selectedJob.years_of_experience} year`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Skill Set:</p>
                <p>{selectedJob.skill_set || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <div className="flex  max-h-[150px] overflow-y-auto">
                  <p>{selectedJob.requirements_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Openjob;
