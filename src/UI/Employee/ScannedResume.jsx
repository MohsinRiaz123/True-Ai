import React from "react";
import { FiDownload } from "react-icons/fi";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LuBadgeDollarSign } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { LuPhone } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const ScannedResume = () => {
  const navigation = useNavigate();
  const handelBack = () => {
    navigation("/employe/Home");
  };
  const handelRecordings = () => {
    navigation("/employe/prerecordings");
  };
  const handelPreInterview = () => {
    navigation("/employe/createPreInterview");
  };
  const handelInterview = () => {
    navigation("/employe/createInterview");
  };
  const obj = {
    img: "/src/assets/Images/7king.png",
    name: "Ali Carter",
    position: " UI/UX Designer",
    skills: "Figma, Adobe Illustrator, Photoshop",
    nationality: "US",
    experience: "2 years",
    match: "88% ",
    salary: "70k$ per annum",
    contect: "+44 123 456 7890",
    loc: "Paris,france",
  };

  return (
    <div className="space-y-5">
      <div className="w-full flex">
        <div className="w-[10%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2 ">
          <img
            src={obj.img}
            alt=""
            className="p-4 w-auto h-full object-contain "
          />
        </div>
        <div className="flex-col w-[80%] px-3 py-3 space-y-1">
          <div className="flex  gap-20">
            <div className="   text-lg tablet:text-xl laptop:text-2xl font-bold  ">
              {obj.name}
            </div>
            <div className="">
              <button className="flex text-[#8E01FF] items-center gap-2 font-semibold">
                <FiDownload />
                <p>Download</p>
                <p>CV</p>
              </button>
            </div>
          </div>
          <div className="text-md laptop:text-lg font-semibold">
            <p>{obj.position}</p>
          </div>
          <div className="flex">
            <div className=" flex space-x-0 tablet:space-x-1 laptop:space-x-2 ">
              <div>
                <a href="https://www.facebook.com/">
                  <img src="/src/assets/Images/facebook.png" />
                </a>
              </div>
              <div>
                <a href="https://github.com/">
                  <img src="/src/assets/Images/github.png" />
                </a>
              </div>
              <div>
                <a href="https://pk.linkedin.com/">
                  <img src="/src/assets/Images/linkedin.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md ">
          <div className="flex flex-col justify-between px-2 py-4 h-full items-end space-y-3">
            <div>
              <p className="text-lg font-bold text-pink-400">
                {obj.match}match
              </p>
            </div>
            <div className="">
              <a className="gap-3 flex text-lg  items-center">
                <PiPaperPlaneTiltLight />
                <p className="font-semibold">Share profile</p>
              </a>
            </div>
            <div>
              <button
                className="bg-black px-2 py-1 text-white rounded-lg text-lg"
                onClick={() => handelRecordings()}
              >
                Watch my reacordings
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2  px-10 text-lg">
        <div className="flex gap-2 items-center ">
          <p className="text-[#8E01FF] text-xl">
            <IoBagCheckOutline />
          </p>
          <p>Preferred: {obj.position}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#8E01FF] text-xl">
            <SlLocationPin />
          </p>
          <p>{obj.loc}</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <p className="text-[#8E01FF] text-xl">
            {" "}
            <LuBadgeDollarSign />
          </p>
          <p>Preferred Salary: {obj.salary}</p>
        </div> */}
      </div>
      <div className="grid grid-cols-2 px-10 text-lg">
        <div className="flex gap-2 items-center">
          <p className="text-[#8E01FF] text-xl">
            <IoCalendarOutline />
          </p>
          <p className="">Work Experience: {obj.experience}</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <p className="text-[#8E01FF] text-xl">
            <SlGlobe />
          </p>
          <p>Nationality: {obj.nationality}</p>
        </div> */}
        <div className="flex gap-2 items-center">
          <p className="text-[#8E01FF] text-xl">
            <LuPhone />
          </p>
          <p className="">Contact: {obj.contect}</p>
        </div>
      </div>
      <div className="space-y-3 px-10">
        <div className="text-2xl font-bold ">Skills:</div>
        <div className="grid grid-cols-6 text-md  gap-x-12 gap-y-3 text-center  ">
          <p className="bg-gray-300 rounded-full px-2 py-1 ">Figma</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">Adobe xd</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">Illustrator</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">Canva</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">HTML</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">CSS</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">JS</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">React</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">Angular</p>
          <p className="bg-gray-300 rounded-full px-2 py-1">C++</p>
        </div>
      </div>
      <div className="px-10  space-y-3">
        <div className="text-2xl font-bold  ">Keywords:</div>
        <div className="grid grid-cols-6 text-sm  gap-x-12 gap-y-3  ">
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between ">
            Figma<p>20</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Adobe xd <p>18</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Illustrator <p>20</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Canva <p>2</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            HTML <p>10</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            CSS <p>22</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            JS <p>32</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            React <p>15</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Angular <p>2</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            C++ <p>9</p>
          </p>
        </div>
      </div>
      {/* <div className="px-10  space-y-3">
        <div className="text-2xl font-bold ">Keywords missing:</div>
        <div className="grid grid-cols-6 text-sm  gap-x-12 gap-y-3  ">
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between ">
            Figma<p>20</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between ">
            Figma<p>20</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Adobe xd <p>18</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Illustrator<p>20</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Canva <p>2</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            HTML <p>10</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            CSS <p>22</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            JS <p>32</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            React <p>15</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            Angular <p>2</p>
          </p>
          <p className="bg-gray-300 rounded-full px-5 py-1 flex justify-between">
            C++ <p>9</p>
          </p>
        </div>
      </div> */}
      <div className="px-10 pt-10 flex flex-col  gap-10 ">
        <div className="space-y-2">
          <p className="text-lg font-bold px-2">Schedule a pre interview:</p>
          <button
            className="px-8 py-2 rounded-full bg-LoginBtn bg-center bg-cover text-white"
            onClick={() => handelPreInterview()}
          >
            Schedule a pre-interview:
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold px-2">Schedule an interview:</p>
          <button
            className="px-10 py-2 rounded-full bg-LoginBtn bg-center bg-cover text-white"
            onClick={() => handelInterview()}
          >
            Schedule an interview:
          </button>
        </div>
      </div>
      <div className="flex justify-end p-10 font-bold">
        <button
          className="text-[#8E01FF] gap-5 text-lg flex items-center "
          onClick={() => handelBack()}
        >
          <p>
            <FaArrowLeft />
          </p>
          <p>Back to home</p>
        </button>
      </div>
    </div>
  );
};

export default ScannedResume;
