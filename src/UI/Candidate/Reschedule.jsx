import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import michael from "../../assets/Images/michael.png";
import { Link, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import Menubar from "./Menubar";
import { RxCross2 } from "react-icons/rx";

const Reschedule = () => {
  const navigate=useNavigate();
  const [display, setDisplay] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [errors, setErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTimeSlot = () => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const startTimeObj = new Date(`${selectedDate}T${startTime}`);
    const newErrors = [];

    if (!selectedDate) {
      newErrors.push("Please select a date.");
    } else if (selectedDateObj < currentDate.setHours(0, 0, 0, 0)) {
      newErrors.push("Selected date must be a future date.");
    }

    if (!startTime) {
      newErrors.push("Please select available times.");
    } else if (
      startTimeObj < new Date(currentDate.setHours(currentDate.getHours() + 1))
    ) {
      newErrors.push(
        "Available time must be at least one hour ahead of the current time."
      );
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const newSlot = { date: selectedDate, startTime };

    if (isEditing) {
      const updatedSlots = [...timeSlots];
      updatedSlots[editIndex] = newSlot;
      setTimeSlots(updatedSlots);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTimeSlots([...timeSlots, newSlot]);
    }

    setStartTime("10:00");
    setSelectedDate("");
    setErrors([]);
  };

  const handleEdit = (index) => {
    setSelectedDate(timeSlots[index].date);
    setStartTime(timeSlots[index].startTime);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
  };
const goBack=()=>{
 navigate("/candidate/scheduleInterview")
}
  return (
    <div className="">
      {/* <DashboardSidebar />
      <div className="px-5 py-5 w-full space-y-5">
        <div>
          <div className="block laptop:hidden p-3 w-full text-end">
            <button className="text-2xl" onClick={() => setDisplay(true)}>
              <TiThMenu />
            </button>
            {display && (
              <div>
                <Menubar />
                <button
                  className="absolute text-white text-2xl top-9 right-7"
                  onClick={() => setDisplay(false)}
                >
                  <RxCross2 />
                </button>
              </div>
            )}
          </div>
          <div className="linear_grad1 text-white rounded-xl p-5">
            <div className="flex flex-col tablet:flex-row items-center justify-between space-y-2 laptop:space-y-0">
              <div className="flex">
                <div className="flex  rounded-full h-15">
                  <img
                    src={michael}
                    alt="Michael"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="pl-2 tablet:pl-4">
                  <p className="font-bold text-sm laptop:text-lg">
                    Michael John
                  </p>
                  <p className="text-sm laptop:text-md">UI/UX Designer</p>
                </div>
              </div>
              <div className="">
                <Link to="/reschedule" className="block hover:underline">
                  Scheduled Interviews
                </Link>
                <Link to="/" className="block hover:underline">
                  Confirmed Interviews
                </Link>
                <Link to="/" className="block hover:underline">
                  Declined Interviews
                </Link>
              </div>
              <div>
                <Link to="/" className="block hover:underline">
                  Pending pre-Interviews
                </Link>
                <Link to="/" className="block hover:underline">
                  Confirmed pre-Interviews
                </Link>
                <Link to="/" className="block hover:underline">
                  Declined pre-Interviews
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          <p className="text-xl font-bold">Hello Michael,</p>
          <p className="text-sm">
            Please fill below form to reschedule interview
          </p>
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold py-2">
            Reason for rescheduling
          </label>
          <textarea
            placeholder="Explain reason for rescheduling"
            className="placeholder:text-gray-400 border border-gray-300 text-sm p-3 rounded-lg shadow-lg shadow-gray-300 w-full outline-none"
          ></textarea>
        </div>
        <div className="py-6 space-y-3">
          <label className="text-md font-bold py-2">
            Choose available time slots
          </label>
          <div className="flex flex-col laptop:flex-row items-center space-y-4 laptop:space-y-0 laptop:space-x-4">
            <div className="w-full space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg shadow-lg shadow-gray-300 w-full outline-none text-gray-400"
              />
            </div>
            <div className="space-y-2 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Available Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg shadow-lg shadow-gray-300 w-full outline-none text-gray-400"
              />
            </div>
          </div>
          {errors.length > 0 && (
            <div className="py-4">
              <ul className="list-disc pl-5 text-red-500">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="py-6 space-y-3">
            <button
              onClick={handleAddOrUpdateTimeSlot}
              className={`text-white bg-LoginBtn bg-center bg-cover py-2 px-4 rounded-full ${
                isEditing ? "bg-LoginBtn bg-center bg-cover" : ""
              }`}
            >
              {isEditing ? "Save Time Slot" : "Add Time Slot"}
            </button>
            <div className="py-4 flex  gap-4">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="py-2  p-4 "
                  >
                    <p className="text-md font-bold">Time Slot {index + 1}:</p>
                    <p>Date: {new Date(slot.date).toDateString()}</p>
                    <p>Available Time: {slot.startTime}</p>
                    <div className="flex justify-center gap-3 text-xs mt-3">
                      <button
                        className="bg-LoginBtn bg-center bg-cover px-4 py-1 rounded-xl text-white"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
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
        <div>
          <button className="text-white bg-LoginBtn bg-center bg-cover py-2 px-4 rounded-full" onClick={()=>goBack()}>
            Request Reschedule
          </button>
        </div>
      </div>
  );
};

export default Reschedule;
