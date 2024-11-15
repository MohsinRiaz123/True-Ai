import React from 'react';
import TrueAi from "../../assets/Images/TrueAI.png";
import User from "../../assets/Images/user.png";
import Logo from "../../assets/Images/LoginImg.png";
import { RiHome7Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardList } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { LuUpload } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { LuCrown } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
const EmpMenuBar = () => {
  const navigate = useNavigate();
  const goForEdit = () => {
    navigate("/employeeprofile");
  };
  return (
    <div className="absolute laptop:relative right-0 top-0 w-[250px] bg-custom-dark-blue px-5 2xl:h-screen z-10">
      <div className=" flex flex-col justify-between min-h-screen ">
        <div>
          <div className="py-8 ">
            <img src={TrueAi} alt="" />
          </div>
          <div className="">
            <hr className=" border-gray-700 " />
          </div>
          <div className=" mt-8">
            <div className="bg-white p-2 rounded-lg"onClick={()=>goForEdit()}>
              <div className="flex justify-between  items-center">
                <div className="flex items-center gap-2">
                  <div className="border border-pink-400 w-11 h-11 rounded-full flex justify-center items-center">
                    <img src={User} alt="" />
                  </div>
                  <div className="font-semibold text-lg">Michael John</div>
                </div>
                <div className="text-xl font-bold text-pink-400">
                <button ><BiSolidEdit /></button>
                </div>
              </div>
            </div>
          </div>

          <div className=" text-white mt-11">
            <ul className="space-y-3 text-sm">
              <li>
                <div className="flex items-center gap-4  ">
                  <RxDashboard />
                  <a href="/employe">Dashboard</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <RiHome7Line />
                  <a href="/employe/employerHome">Home</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <HiOutlineClipboardList />
                  <a>Create a pre-interview</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <TbUserEdit />
                  <a href="/employe/usermanagement">User management</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <SlCalender />
                  <a >Schedule an interview</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <LuUpload />
                  <a href="/employe/bulkUpload">Upload Resumes in bulk</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <IoSettingsOutline />
                  <a>Settings</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <SlBookOpen />
                  <a>Tutorial</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4  ">
                  <LuCrown />
                  <a href="/employe/subscription">Subscription</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="mt-20 ">
            <img src={Logo} alt="" className='w-[85%] mx-auto flex justify-center"' />
          </div>
          <div className=" mt-7">
            <hr className=" border-gray-700 w-80" />
          </div>
          <div>
            <div className="text-white text-base flex items-center  mt-7 gap-4 pb-4 ">
              <TbLogout2 />
              <a href='/'>Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmpMenuBar
