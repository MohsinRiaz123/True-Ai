import React from "react";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { CgSortAz } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RecordingsList = () => {
  const [show, setShow] = useState(false);
  const [sortOrder, setSortOrder] = useState("newToOld");
  const navigate=useNavigate();
  const handleClick = (index) => {
    navigate('/employe/recdetails');
  };
  const obj = {
    img: "/src/assets/Images/7king.png",
    name: "Ali Carter",
    position: " UI/UX Designer",
    match: "88% ",
  };
  const list = [
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "7 Kings code",
      position: "UI/UX Designer",
      date: "Sunday,18th june 2024",
      time: "09:45 pm EST",
      Skill: ["Figme", "Adobe xd", "illustrator"],
    },
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "Apple",
      position: "Front-end Developer",
      date: "Saturday,17th june 2024",
      time: "08:45 pm EST",
      Skill: ["HTML", "CSS", "Java Script"],
    },
    {
      img: "/src/assets/Images/recordingList.png",
      comName: "Microsoft",
      position: "Back-end Developer",
      date: "Monday,19th june 2024",
      time: "10:45 pm EST",
      Skill: ["Python", "Java Script", "C++"],
    },
  ];

  return (
    <div className="space-y-3">
      <div className="w-full flex">
        <div className="w-[10%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2 ">
          <img src={obj.img} alt="" className="w-24" />
        </div>
        <div className=" flex flex-col w-[80%] px-3 py-3 space-y-1 justify-center">
          <div className="   text-lg tablet:text-xl laptop:text-2xl font-bold  ">
            {obj.name}
          </div>

          <div className="text-md laptop:text-lg font-semibold">
            <p>{obj.position}</p>
          </div>
        </div>
        <div className=" flex items-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md ">
          <div className="flex flex-col justify-around px-2 py-4 h-full items-end space-y-3">
            <div>
              <p className="text-xl font-bold text-pink-400">
                {obj.match}match
              </p>
            </div>
            <div className="">
              <a className="gap-3 flex text-xl  items-center">
                <PiPaperPlaneTiltLight />
                <p className="font-semibold">Share profile</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  ">
        <div className=" text-sm tablet:text-lg laptop:text-xl font-bold w-full">
          <p>Ali’s pre-recorded interviews.</p>
        </div>
        <button
          className=" relative flex flex-row  items-center justify-end text-xs tablet:text-base  w-3/6  space-x-1"
          onClick={() => setShow(!show)}
        >
          <p>sort by </p>
          <div className=" w-2/6">
            <p className="text-xl">
              <CgSortAz />
            </p>
            {show && (
              <div className=" flex flex-col absolute text-[6px] tablet:text-xs space-y-2 border border-black px-1 py-1 rounded-md bg-gray-100">
                <div className="">
                  <button
                    className={sortOrder === "newToOld" ? "font-bold" : ""}
                    onClick={() => {
                      setSortOrder("newToOld");
                      setShow(false);
                    }}
                  >
                    New to Old
                  </button>
                </div>
                <div>
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
              </div>
            )}
          </div>
        </button>
      </div>
      <div className="space-y-4 flex flex-col">
        {list.map((val, index) => (
          <div key={index} className="flex p-1 border border-gray-500 rounded-xl gap-4"
          onClick={()=>handleClick(index)}>
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
              <div className="flex-col">
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
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default RecordingsList;
