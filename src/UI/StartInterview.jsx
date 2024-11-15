import React, { useState } from "react";
import TrueAI from "/src/assets/Images/TrueAI.png";
import user from "/src/assets/Images/user.png";
import LoginImg from "/src/assets/Images/LoginImg.png";
import { RiHome7Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SlCamrecorder } from "react-icons/sl";
import { BsEyeFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { BsCameraVideoOff, BsCameraVideo } from "react-icons/bs";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { LiaPhoneSolid } from "react-icons/lia";
import { FaArrowsRotate } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
const StartInterview = () => {
  const [side, setSide] = useState(true);
  const navigate = useNavigate();
  const goForEdit = () => {
    navigate("/candidateInfo");
  };
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState);
  };

  const toggleMic = () => {
    setIsMicOn((prevState) => !prevState);
  };
  return (
    <div className="flex">
      <div>
        <div>
          {side && (
            <div className=" hidden laptop:block  w-full h-screen py-10 bg-custom-dark-blue  ">
              <div className="   flex flex-col justify-between h-full">
                <div>
                  <div className="pb-5 px-7">
                    <img src={TrueAI} alt="" />
                  </div>
                  <div className="px-7">
                    <hr className=" border-gray-700 " />
                  </div>
                  <div className="px-7 mt-8">
                    <div
                      className="bg-white py-1  rounded-lg"
                      onClick={() => goForEdit()}
                    >
                      <div className="flex justify-between px-4 items-center">
                        <div className="flex items-center gap-2">
                          <div className="border border-pink-500 w-12 p-1 rounded-full flex justify-center items-center">
                            <img src={user} alt="" />
                          </div>
                          <div className="font-semibold text-sm">
                            Michael John
                          </div>
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
                        <div className="flex items-center gap-4 pb-3 ">
                          <FaRegStar />
                          <a href="/candidate/interviewHistory">
                            Interview Histoty
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center gap-4 pb-3 ">
                          <SlCamrecorder />
                          <a href="/candidate/interviewRecordings">
                            Interview Recordings
                          </a>
                        </div>
                      </li>
                      {/* <li>
                      <div className="flex items-center gap-4 pb-3 ">
                        <IoSettingsOutline />
                        <a >Settings</a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-4 pb-3 ">
                        <SlBookOpen />
                        <a >Tutorial</a>
                      </div>
                    </li> */}
                    </ul>
                  </div>
                </div>
                <div className="">
                  <div className=" px-7">
                    <img src={LoginImg} alt="" className="w-[60%] mx-auto" />
                  </div>
                  <div className="px-7 mt-7">
                    <hr className=" border-gray-700 " />
                  </div>
                  <div>
                    <div className="text-white flex items-center px-7 mt-7 gap-4  text-sm">
                      <TbLogout2 />
                      <a href="/">Log out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-screen relative">
        <img
          src="/src/assets/Images/candidate.png"
          alt="Candidate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex p-5 justify-between ">
          <img
            src="/src/assets/Images/robort.png"
            alt="Robort"
            className="w-[20%] h-[40%] "
          />
          <div className="gap-5 h-11 flex">
            <div className="bg-black px-4 py-2 flex gap-2 text-white rounded-lg">
              <p className="flex items-center">
                <BsEyeFill />
              </p>
              <p className="flex items-center">Scanning</p>
            </div>
            <div className="bg-black px-4 py-2 flex gap-2 text-white rounded-lg">
              <p className="flex items-center text-2xl text-red-500">
                <GoDotFill />
              </p>
              <p className="flex items-center">Recording</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-40  flex justify-center w-full items-center  ">
          <p className="bg-gray-500 text-white px-5 py-2 text-lg font-semibold rounded-lg  ">
            Yes, sure
          </p>
        </div>
        <div className="absolute bottom-14  flex w-full items-center justify-between  px-10">
          <div onClick={toggleFullscreen}>
            <p className="bg-gray-500 text-white text-3xl rounded-lg p-2 flex items-center">
              {isFullscreen ? (
                <button onClick={() => setSide(true)}>
                  <AiOutlineFullscreenExit />
                </button>
              ) : (
                <button onClick={() => setSide(false)}>
                  <AiOutlineFullscreen />
                </button>
              )}
            </p>
          </div>
          <div className="flex gap-2 text-white items-center">
            <p
              className="bg-gray-500 text-lg rounded-full flex items-center justify-center w-10 h-10 cursor-pointer"
              onClick={toggleCamera}
            >
              {isCameraOn ? <BsCameraVideo /> : <BsCameraVideoOff />}
            </p>
            <p
              className="bg-gray-500 text-lg rounded-full flex items-center justify-center w-10 h-10 cursor-pointer "
              onClick={toggleMic}
            >
              {isMicOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
            </p>
            <p className="bg-red-500 text-3xl rounded-full flex items-center justify-center h-16 w-16">
              <LiaPhoneSolid />
            </p>
            <p className="bg-gray-500 text-lg rounded-full flex items-center justify-center w-10 h-10">
              <FaArrowsRotate />
            </p>
            <p className="bg-gray-500 text-lg rounded-full flex items-center justify-center w-10 h-10">
              <PiDotsThreeOutlineVerticalFill />
            </p>
          </div>
          <div>
            <p className="bg-gray-500 text-white rounded-lg px-4 py-2">
              Next Question
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
