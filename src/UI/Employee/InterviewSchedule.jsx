import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import useSubmitInterviewData from "../../Services/Employee/Create Schedule Interview/useSubmitInterviewData";

const InterviewSchedule = () => {
  const location = useLocation();
  const { detail } = location.state?.value || {};
  const [obj, setObj] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dateTimeError, setDateTimeError] = useState("");
  const [reqListError, setReqListError] = useState("");
  const {
    mutate: sendRequset,
    isPending,
    isError,
    error: reqError,
  } = useSubmitInterviewData();
  const navigate = useNavigate();
  useEffect(() => {
    if (detail) {
      setObj(detail);
      console.log("obj", obj);
    }
  }, [obj]);

  const formik = useFormik({
    initialValues: {
      job_role: "",
      job_type: "",
      salary: "",
      salaryFrequency: "",
      location: "",
      startDate: "",
      startTime: "",
      job_description: "",
      job_responsibilties: "",
      email: "",
    },
    validationSchema: Yup.object({
      job_role: Yup.string().required("Job role is required."),
      job_type: Yup.string().required("Job type is required."),
      salary: Yup.number()
        .required("Salary is required.")
        .positive("Salary must be a positive number."),
      salaryFrequency: Yup.string().required("Salary period is required."),
      location: Yup.string().required("Location is required."),
      job_description: Yup.string().required("Job description is required."),
      job_responsibilties: Yup.string().required(
        "job_responsibilties are required."
      ),
    }),
    onSubmit: async (values) => {
      if (timeSlots.length === 0 || emailList.length === 0) {
        setReqListError(
          "Please add at least one time slot and one panel member."
        );
        return; // Prevent submission
      }
      const timeZone = moment.tz.guess(); // Get the timezone in IANA format (e.g., "America/New_York")
      const shortTimeZone = moment.tz(timeZone).format("z");
      const dataToSend = {
        candidate_email: obj.email,
        job_role: values.job_role,
        interview_type: "Schedule_Interview",
        job_type: values.job_type,
        salary: values.salary,
        salaryFrequency: values.salaryFrequency,
        location: values.location,
        job_description: values.job_description,
        job_responsibilties: values.job_responsibilties,
        other_members: emailList, // Include the email list if needed
        scheduled_date_option: timeSlots, // Send the array of time slots
        time_zone: shortTimeZone,
      };
      console.log("Form submitted data:", dataToSend);
      try {
        const res = await sendRequset(dataToSend);
        if (res) {
          setShowPopup(true);
          setTimeSlots([]);
          setEmailList([]);
          formik.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const addTimeSlot = () => {
    const newSlot = {
      date: formik.values.startDate,
      time: formik.values.startTime,
    };
    setTimeSlots([...timeSlots, newSlot]);
    formik.setFieldValue("startDate", ""); // Clear date field
    formik.setFieldValue("startTime", ""); // Clear time field
    setReqListError("");
  };

  const updateTimeSlot = () => {
    const updatedSlots = [...timeSlots];
    updatedSlots[editingIndex] = {
      date: formik.values.startDate,
      Time: formik.values.startTime,
    };
    setTimeSlots(updatedSlots);
    formik.setFieldValue("startDate", ""); // Clear date field
    formik.setFieldValue("startTime", ""); // Clear time field
    setEditingIndex(null);
  };

  const handleSubmitTimeSlot = () => {
    const { startDate, startTime } = formik.values;

    // Reset error messages
    setDateTimeError("");
    // Validate date and time
    if (!startDate || !startTime) {
      setDateTimeError("Date and time are required.");
    }
    if (startDate && startTime) {
      if (editingIndex !== null) {
        updateTimeSlot();
      } else {
        addTimeSlot();
      }
    }
  };

  const handleEdit = (index) => {
    const slotToEdit = timeSlots[index];
    formik.setFieldValue("startDate", slotToEdit.date);
    formik.setFieldValue("startTime", slotToEdit.startTime);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newSlots);
    if (editingIndex === index) {
      setEditingIndex(null);
      formik.resetForm();
    }
  };

  const handleAddEmail = () => {
    if (emailList.length >= 3) {
      setShowLimitPopup(true);
      return;
    }
    const { email } = formik.values;
    if (email && !emailList.includes(email)) {
      setEmailList([...emailList, email]);
      formik.setFieldValue("email", ""); // Clear the input field after adding
      setReqListError("");
    }
  };

  const handleRemoveEmail = (index) => {
    const newList = emailList.filter((_, i) => i !== index);
    setEmailList(newList);
  };

  return (
    <div className="space-y-5">
      <div className="w-full flex">
        <div className="w-[10%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2">
          <img
            src={obj.img}
            alt=""
            className="w-auto h-full object-contain rounded-full"
          />
        </div>
        <div className="flex-col w-[80%] px-3 py-3 space-y-1">
          <div className="text-lg tablet:text-xl laptop:text-2xl font-bold">
            {obj.fame}
            {obj.lname}
          </div>
          <div className="text-md laptop:text-lg font-semibold">
            <p>{obj.position}</p>
          </div>
          <div>
            <button
              className="bg-black px-2 py-1 text-white rounded-lg text-lg"
              onClick={() => navigate("/employe/prerecordings")}
            >
              Proceed with pre-recorded interviews
            </button>
          </div>
        </div>
        <div className="flex items-center w-[25%] text-[6px] tablet:text-[12px] laptop:text-md">
          <div className="flex flex-col justify-around px-2 py-4 h-full items-end space-y-3">
            <div>
              <p className="text-xl font-bold text-pink-400">{} match</p>
            </div>
            <div>
              <a className="gap-3 flex text-xl items-center">
                <PiPaperPlaneTiltLight />
                <p className="font-semibold">Share profile</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <form className="space-y-5 py-7" onSubmit={formik.handleSubmit}>
        <div className="flex">
          <div className="space-y-5 w-full">
            <div className="flex flex-col space-y-2">
              <label className="text-2xl font-bold">
                Preparing interview for the role:
              </label>
              <input
                type="text"
                placeholder="UI/UX Designer"
                className="px-3 py-2 bg-gray-100 border border-gray-300 text-black rounded-lg w-fit outline-none"
                value={formik.values.job_role}
                onChange={formik.handleChange("job_role")}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="text-2xl font-bold">Job Details:</label>
              <div className="flex items-center gap-3">
                <p className="text-purple-400 text-2xl">
                  <IoBagCheckOutline />
                </p>
                <select
                  className="bg-gray-100 border border-gray-300 rounded-lg"
                  value={formik.values.job_type}
                  onChange={formik.handleChange("job_type")}
                >
                  <option value="" disabled>
                    Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-purple-400 text-2xl">
                  <LuBadgeDollarSign />
                </p>
                <div className="flex">
                  <input
                    type="number"
                    placeholder="$3500"
                    className="px-3 py-1 bg-gray-100 border border-gray-300 text-black rounded-l-lg outline-none w-[30%]"
                    value={formik.values.salary}
                    onChange={formik.handleChange("salary")}
                  />
                  <select
                    className="bg-gray-100 border border-gray-300 rounded-r-lg"
                    value={formik.values.salaryFrequency}
                    onChange={formik.handleChange("salaryFrequency")}
                  >
                    <option value="" disabled>
                      Salary period
                    </option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-purple-400 text-2xl">
                  <SlLocationPin />
                </p>
                <input
                  type="text"
                  placeholder="Florida, US"
                  className="px-3 py-1 bg-gray-100 border border-gray-300 text-black rounded-lg outline-none"
                  value={formik.values.location}
                  onChange={formik.handleChange("location")}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 w-full">
            <label className="text-2xl font-bold py-2">
              Choose available time slots
            </label>
            <div className="flex flex-col laptop:flex-row items-center space-y-4 laptop:space-y-0 laptop:space-x-4">
              <div className="w-full space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps("startDate")}
                  className="border border-gray-300 p-2 rounded-lg shadow-lg w-full outline-none text-gray-400"
                />
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Available Time
                </label>
                <input
                  type="time"
                  {...formik.getFieldProps("startTime")}
                  className="border border-gray-300 p-2 rounded-lg shadow-lg w-full outline-none text-gray-400"
                />
              </div>
            </div>
            {dateTimeError && (
              <div className="text-red-500 text-sm">{dateTimeError}</div>
            )}
            <div className="py-6 space-y-3">
              <button
                type="submit"
                className="text-white bg-black py-2 px-4 rounded-xl"
                onClick={handleSubmitTimeSlot}
              >
                {editingIndex !== null ? "Update Time Slot" : "Add Time Slot"}
              </button>
              <div className="py-4 flex gap-4">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                    <div key={index} className="py-2 p-4 border rounded-lg">
                      <p className="text-md font-bold">
                        Time Slot {index + 1}:
                      </p>
                      <p>Date: {new Date(slot.date).toDateString()}</p>
                      <p>Available Time: {slot.startTime}</p>
                      <div className="flex justify-center gap-3 text-xs mt-3">
                        <button
                          type="button"
                          className="bg-black px-4 py-1 rounded-xl text-white"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="border border-gray-400 px-2 py-1 rounded-xl"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No time slots added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="text-2xl font-bold">Job Description:</label>
          <textarea
            className="bg-gray-100 border border-gray-300 shadow-xl rounded-xl w-full outline-none px-4 py-2 min-h-[300px] text-black"
            placeholder=""
            value={formik.values.job_description}
            onChange={formik.handleChange("job_description")}
          />
        </div>
        <div>
          <label className="text-2xl font-bold">Job Responsibilties:</label>
          <textarea
            className="bg-gray-100 border border-gray-300 shadow-xl rounded-xl w-full outline-none px-4 py-2 min-h-[300px] text-black"
            placeholder=""
            value={formik.values.job_responsibilties}
            onChange={formik.handleChange("job_responsibilties")}
          />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">Add others to Panelist</p>
            <p className="text-lg font-semibold">
              You can add up to 3 additional members
            </p>
          </div>
          <div className="flex gap-5">
            <input
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              placeholder="Type the email of the member here...."
              className="px-5 py-2 placeholder:text-gray-500 bg-gray-100 border border-gray-300 w-full rounded-xl shadow-xl outline-none"
            />
            <button
              className="p-3 bg-black text-white rounded-xl text-2xl shadow-xl"
              type="button"
              onClick={handleAddEmail}
            >
              <FaPlus />
            </button>
            {showLimitPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-custom-dark-blue p-6 rounded-xl shadow-lg w-[40%]">
                  <div className="flex items-center justify-between py-5">
                    <h2 className="text-xl font-bold text-white">
                      Email Limit Reached
                    </h2>
                    <button
                      className="p-2 rounded-lg text-white bg-gray-500 w-8 flex items-center justify-center"
                      type="button"
                      onClick={() => setShowLimitPopup(false)}
                    >
                      <ImCross />
                    </button>
                  </div>
                  <p className="py-5 flex items-center text-center text-lg text-white">
                    You can only add up to 3 members in your basic plan. Please
                    upgrade your subscription to add more members.
                  </p>
                  <div className="py-5 text-center">
                    <a
                      href="/employe/subscription"
                      className="mt-4 linear_grad1 text-white py-2 px-4 rounded-lg"
                    >
                      Upgrade Now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="py-4 px-10">
            {emailList.length > 0 && (
              <ul className="pl-5 text-black list-none space-y-4">
                {emailList.map((email, index) => (
                  <li key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src="/src/assets/Images/7king.png"
                          className="w-8"
                        />
                        <p>Lesie Alexandre</p>
                      </div>
                      <p>Administrator</p>
                      <p>{email}</p>
                      <button
                        className="border border-gray-400 shadow-md py-1 px-3 rounded-lg"
                        onClick={() => handleRemoveEmail(index)}
                      >
                        - Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="text-red-500 text-sm text-center">
          <ul>
            {Object.entries(formik.errors)
              .map(
                ([key, error]) =>
                  formik.touched[key] && <li key={key}>{error}</li>
              )
              .slice(0, 1)}
          </ul>
        </div>
        {reqListError && (
          <div className="text-red-500 text-sm">{reqListError}</div>
        )}
        {isError && <div className="text-red-500 text-sm">{reqError}</div>}

        <div className="flex justify-between py-5">
          <button
            className={`bg-LoginBtn px-10 py-3 text-white rounded-full bg-center bg-cover ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isPending}
          >
            {isPending ? " Sending Request" : "Send an interview invite"}
          </button>
          {showPopup && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-30 flex items-center justify-center">
              <div className="w-[25%] bg-custom-dark-blue p-3 rounded-xl space-y-5">
                <div className="flex justify-end">
                  <button
                    className="font-bold p-2 rounded-lg bg-gray-500 text-black w-8 flex items-center justify-center"
                    type="button"
                    onClick={() => setShowPopup(false)}
                  >
                    <ImCross />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/src/assets/Images/mail.png"
                    className="w-28"
                    alt="Mail Icon"
                  />
                </div>
                <div className="flex items-center justify-center text-white py-3">
                  <p>The invitation was successfully sent.</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-purple-600 text-lg font-semibold">
            <a href="Home" className="flex items-center gap-3">
              <FaArrowLeft />
              Back to home
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InterviewSchedule;
