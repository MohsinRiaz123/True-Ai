import React, { useState } from "react";
import TrueAI from "../../assets/Images/TrueAI.png";
import user from "../../assets/Images/user.png";
import LoginImg from "../../assets/Images/LoginImg.png";
import { RiHome7Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SlCamrecorder } from "react-icons/sl";
import QuestionAnswer from "./QuestionAnswer";
import { useLocation } from "react-router-dom";

const CandidateDashboard = () => {
  const location = useLocation();
  const { topic } = location.state || {};
  const [side, setSide] = useState(true);
  const navigate = useNavigate();
  const goForEdit = () => {
    navigate("/candidateInfo");
  };
  console.log(topic);

  return (
    <div className="flex h-screen">
      {/* ---------------- sidebar Started -------------- */}
      <div className={`${side ? "w-1/4" : "w-0"} transition-all duration-500`}>
        <div className="w-full h-full py-10 bg-black">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="pb-5 px-7">
                <img src={TrueAI} alt="" />
              </div>
              <div className="px-7">
                <hr className=" border-gray-700" />
              </div>
              <div className="px-7 mt-8">
                <div
                  className="bg-white py-1 rounded-lg"
                  onClick={() => goForEdit()}
                >
                  <div className="flex justify-between px-4 items-center">
                    <div className="flex items-center gap-2">
                      <div className="border border-pink-500 w-12 p-1 rounded-full flex justify-center items-center">
                        <img src={user} alt="" />
                      </div>
                      <div className="font-semibold text-sm">Michael John</div>
                    </div>
                    <div className="text-xl font-bold text-pink-500">
                      <button>
                        <BiSolidEdit />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-7 text-white mt-20 text-sm">
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center gap-4 pb-3">
                      <RiHome7Line />
                      <a href="/candidate">Home</a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 pb-3">
                      <FaRegStar />
                      <a href="/candidate/interviewHistory">
                        Interview History
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 pb-3">
                      <SlCamrecorder />
                      <a href="/candidate/interviewRecordings">
                        Interview Recordings
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="px-7">
                <img src={LoginImg} alt="" className="w-[60%] mx-auto" />
              </div>
              <div className="px-7 mt-7">
                <hr className="border-gray-700" />
              </div>
              <div className="text-white flex items-center px-7 mt-7 gap-4 text-sm">
                <TbLogout2 />
                <a href="/">Log out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  -------------- sidebar Ends here  ------------------ */}
      <div
        className={`${side ? "w-3/4" : "w-full"} transition-all duration-500`}
      >
        <div className="relative w-full h-full object-contain">
          <QuestionAnswer setSide={setSide} topic={topic} />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
