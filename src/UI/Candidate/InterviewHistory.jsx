import React, { useState } from "react";
import { RiSearch2Line, RiDeleteBin5Line } from "react-icons/ri";
import { LuClock } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";

const InterviewHistory = () => {
  const [interviewHistory, setInterviewHistory] = useState([
    {
      comName: "7 King Code",
      img: "/src/assets/Images/7kc.png",
      date: "Wed 26",
      sTime: "09:00",
      eTime: "09:30 PM",
      duration: "30",
      loction: "TrueAI Interview",
      member: " John, Michael and Samuel",
      M1img: "/src/assets/Images/M1.png",
      M2img: "/src/assets/Images/M2.png",
      M3img: "/src/assets/Images/M3.png",
    },
    {
      comName: "Microsoft",
      img: "/src/assets/Images/microsoft.png",
      date: "Tue 24",
      sTime: "08:00",
      eTime: "08:30 PM",
      duration: "30",
      loction: "TrueAI Interview",
      member: " John, Michael and Samuel",
      M1img: "/src/assets/Images/M1.png",
      M2img: "/src/assets/Images/M2.png",
      M3img: "/src/assets/Images/M3.png",
    },
    {
      comName: "Apple",
      img: "/src/assets/Images/apple.png",
      date: "Thu 27",
      sTime: "08:30",
      eTime: "09:30 PM",
      duration: "60",
      loction: "TrueAI Interview",
      member: " John, Michael and Samuel",
      M1img: "/src/assets/Images/M1.png",
      M2img: "/src/assets/Images/M2.png",
      M3img: "/src/assets/Images/M3.png",
    },
    {
      comName: "7 King Code",
      img: "/src/assets/Images/7kc.png",
      date: "Wed 26",
      sTime: "09:00",
      eTime: "09:30 PM",
      duration: "30",
      loction: "TrueAI Interview",
      member: " John, Michael and Samuel",
      M1img: "/src/assets/Images/M1.png",
      M2img: "/src/assets/Images/M2.png",
      M3img: "/src/assets/Images/M3.png",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (index) => {
    // Create a new array with the item removed
    const updatedHistory = interviewHistory.filter((_, i) => i !== index);
    setInterviewHistory(updatedHistory);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter interview history based on search query
  const filteredHistory = interviewHistory.filter((val) =>
    val.comName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-black py-2 px-4 rounded-xl">
        <div className="text-pink-400 text-xs tablet:text-lg">
          Interview History
        </div>
        <div className="text-white border border-white py-1 px-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-black text-xs tablet:text-lg outline-none"
          />
          <RiSearch2Line />
        </div>
      </div>
      <div className="space-y-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((val, index) => (
            <div
              key={index}
              className="flex items-center justify-around px-2 py-3 border border-gray-300 shadow-md shadow-gray-300 rounded-xl"
            >
              <div className="flex flex-col items-center justify-center w-[20%]">
                <img
                  src={val.img}
                  className="hidden tablet:block w-[50px]"
                  alt={`${val.comName} logo`}
                />
                <p className="text-[10px] tablet:text-sm laptop:text-lg font-semibold">
                  {val.comName}
                </p>
                <p className="text-[10px] tablet:text-xs laptop:text-sm text-pink-400">
                  {val.date}
                </p>
              </div>
              <div className="items-center justify-center space-y-4 text-[8px] tablet:text-xs laptop:text-base w-[30%]">
                <div className="flex items-center justify-center space-x-2">
                  <LuClock />
                  <p>
                    {val.sTime}-{val.eTime}
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <GrLocation />
                  <p>{val.loction}</p>
                </div>
              </div>
              <div className="items-center justify-center space-y-4 text-[8px] tablet:text-xs laptop:text-base w-[50%]">
                <div className="flex items-center space-x-2">
                  <p>
                    {val.duration} min call meeting with {val.member}
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    src={val.M1img}
                    className="w-[15px] tablet:w-[25px]"
                    alt="Member 1"
                  />
                  <img
                    src={val.M2img}
                    className="w-[15px] tablet:w-[25px]"
                    alt="Member 2"
                  />
                  <img
                    src={val.M3img}
                    className="w-[15px] tablet:w-[25px]"
                    alt="Member 3"
                  />
                </div>
              </div>
              <div className="flex px-10 text-2xl">
                <button
                  onClick={() => handleDelete(index)}
                  className="border border-gray-300 p-2 rounded-lg shadow-lg"
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No results found</div>
        )}
      </div>
    </div>
  );
};

export default InterviewHistory;
