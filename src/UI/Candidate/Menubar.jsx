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
const Menubar = () => {
  const navigate = useNavigate();
  const goForEdit = () => {
    navigate("/candidateInfo");
  };
  return (
    <div className="  absolute laptop:relative  right-0 top-0  w-[250px] z-10   py-10 bg-custom-dark-blue ">
      <div className=" relative   flex flex-col justify-between h-full">
        <div>
          <div className="text-white text-end top-6 text-2xl font-bold  absolute right-3">
            </div>
          <div className="pb-5 px-7">
            <img src={TrueAI} alt="" />
          </div>
          <div className="px-7">
            <hr className=" border-gray-700 " />
          </div>
          <div className="px-7 mt-8">
            <div className="bg-white py-1  rounded-lg"  onClick={()=>goForEdit()}>
              <div className="flex justify-between px-2 items-center">
                <div className="flex items-center gap-2">
                  <div className="border border-pink-500 w-12 h-12  rounded-full flex justify-center items-center ">
                    <img src={user} alt="" />
                  </div>
                  <div className="font-semibold text-xs">Michael John</div>
                </div>
                <div className="text-xl font-bold text-pink-500 pr-1">
                <button><BiSolidEdit /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-7 text-white mt-20 text-sm">
            <ul className="space-y-1">
              <li>
                <div className="flex items-center gap-4 pb-3 ">
                  <RiHome7Line />
                  <a href="/candidate">Home</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 pb-3 ">
                  <FaRegStar />
                  <a href="/candidate/interviewHistory">Interview Histoty</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 pb-3 ">
                  <SlCamrecorder />
                  <a href="/candidate/interviewRecordings">Interview Recordings</a>
                </div>
              </li>
              {/* <li>
                <div className="flex items-center gap-4 pb-3">
                  <IoSettingsOutline />
                  <a href="#">Settings</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 pb-3 ">
                  <SlBookOpen />
                  <a href="#">Tutorial</a>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="">
          <div className=" p-16">
            <img src={LoginImg} alt="" className="" />
          </div>
          <div className="px-7 ">
            <hr className=" border-gray-700 " />
          </div>
          <div>
            <div className="text-white flex items-center px-7 mt-7 gap-4 pb-4 text-sm">
              <TbLogout2 />
             <a href="/"> <p>Log out</p></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
