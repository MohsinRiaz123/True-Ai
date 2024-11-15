import React, { useState } from "react";
import { CgSortAz } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const CandidateRecordingHistory = () => {
  const [show, setShow] = useState(false);
  const [sortOrder, setSortOrder] = useState("newToOld");
  const [switchStates, setSwitchStates] = useState({});
  const list = [
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "7 Kings code",
      position: "UI/UX Designer",
      date: "18th June 2024",
      time: "09:45 PM EST",
      Skill: ["Figma", "Adobe XD", "Illustrator"],
    },
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "Apple",
      position: "Front-end Developer",
      date: "17th June 2024",
      time: "08:45 PM EST",
      Skill: ["HTML", "CSS", "JavaScript"],
    },
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "Microsoft",
      position: "Back-end Developer",
      date: "19th June 2024",
      time: "10:45 PM EST",
      Skill: ["Python", "JavaScript", "C++"],
    },
  ];
  const handleToggle = (index, event) => {
    event.stopPropagation();
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate('/candidate/recdetails');
  };

  // Helper function to parse the date and time strings into a Date object
  const parseDateTime = (dateStr, timeStr) => {
    // Format: "DDth Month YYYY HH:mm AM/PM"
    const dateTimeStr = `${dateStr.replace(/(\d+)(th|st|nd|rd)/, "$1")} ${timeStr.replace(/(AM|PM) EST/, "$1")}`;
    
    // Convert to a Date object; adjust format if needed
    // The following assumes the format is like "18 June 2024 09:45 PM"
    const date = new Date(dateTimeStr);
    return date;
  };

  // Sort the list based on the date and time
  const sortedList = [...list].sort((a, b) => {
    const dateTimeA = parseDateTime(a.date, a.time);
    const dateTimeB = parseDateTime(b.date, b.time);

    if (sortOrder === "newToOld") {
      return dateTimeB - dateTimeA; // Newest first
    } else {
      return dateTimeA - dateTimeB; // Oldest first
    }
  });

 

  return (
    <div className="">
      <div className="flex mb-1">
        <div className="text-sm tablet:text-lg laptop:text-xl font-bold w-full">
          <p>Pre-recorded interviews.</p>
        </div>
        <button
          className="relative flex flex-row items-center justify-end text-xs tablet:text-base w-3/6 space-x-1"
          onClick={() => setShow(!show)}
        >
          <p>Sort by </p>
          <div className="w-2/6">
            <p className="text-xl">
              <CgSortAz />
            </p>
            {show && (
              <div className="flex flex-col absolute text-[6px] tablet:text-xs space-y-2 border border-black px-1 py-1 rounded-md bg-gray-100">
                <button
                  className={sortOrder === "newToOld" ? "font-bold" : ""}
                  onClick={() => {
                    setSortOrder("newToOld");
                    setShow(false);
                  }}
                >
                  New to Old
                </button>
                <button
                  className={sortOrder === "oldToNew" ? "font-bold" : ""}
                  onClick={() => {
                    setSortOrder("oldToNew");
                    setShow(false);
                  }}
                >
                  Old to New
                </button>
              </div>
            )}
          </div>
        </button>
      </div>
      <div className="space-y-4 flex flex-col">
        {sortedList.map((val, index) => (
          <div
            key={index}
            className="flex p-1 border border-gray-500 rounded-xl gap-4"
            onClick={() => handleClick(index)}
          >
            <div>
              <img
                src={val.img}
                alt="video"
                className="rounded-xl w-52"
              />
            </div>
            <div className="w-full">
              <div>
                <div className="flex text-lg gap-2">
                  Interview recording for the role of{" "}
                  <p className="font-semibold">{val.position}</p> at
                  <p className="text-blue-500">{val.comName}.</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">Interview Date:</p>
                  {val.date}
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">Interview Time:</p>
                  {val.time}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Skills tested:</p>
                  <div className="flex gap-4">
                    {val.Skill.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="px-5 py-1 bg-black text-white rounded-full"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 px-4">
                  <span
                    className={`text-sm font-medium ${
                      switchStates[index] ? "text-purple-500" : "text-pink-400"
                    }`}
                  >
                    {switchStates[index] ? "Public" : "Private"}
                  </span>
                  <div
                    onClick={(event) => handleToggle(index, event)}
                    className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                      switchStates[index] ? "bg-purple-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        switchStates[index] ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateRecordingHistory;
