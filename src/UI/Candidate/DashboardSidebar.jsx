import React from "react";
import TrueAI from "/src/assets/Images/TrueAI.png";
import user from "/src/assets/Images/user.png";
import LoginImg from "/src/assets/Images/LoginImg.png";
import { RiHome7Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SlCamrecorder } from "react-icons/sl";
import useLogout from "../../Services/Onboard/logout/useLogout"; // Import your custom hook

const DashboardSidebar = () => {
  const email = localStorage.getItem("email");
  const refreshToken = localStorage.getItem("Token");
  const navigate = useNavigate();
  const { logout, error } = useLogout(); // Use the custom hook

  const goForEdit = () => {
    navigate("/candidateInfo");
  };

  const handleLogout = async () => {
    try {
      await logout(email, refreshToken);
      localStorage.removeItem("email");
      localStorage.removeItem("Token");
      console.log("Logout successful:", email, refreshToken);
      navigate("/"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error display if needed
    }
  };

  return (
    <div className="hidden laptop:block w-1/4 py-10 bg-custom-dark-blue">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="pb-5 px-7">
            <img src={TrueAI} alt="" />
          </div>
          <div className="px-7">
            <hr className="border-gray-700" />
          </div>
          <div className="px-7 mt-8">
            <div className="bg-white py-1 rounded-lg" onClick={goForEdit}>
              <div className="flex justify-between px-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="border border-pink-500 w-12 p-1 rounded-full flex justify-center items-center">
                    <img src={user} alt="" />
                  </div>
                  <div className="font-semibold text-sm">Michael John</div>
                </div>
                <div className="text-xl font-bold text-pink-500">
                  <button><BiSolidEdit /></button>
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
                  <a href="/candidate/interviewHistory">Interview History</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 pb-3">
                  <SlCamrecorder />
                  <a href="/candidate/interviewRecordings">Interview Recordings</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="px-7">
            <img src={LoginImg} alt="" className="w-[85%] mx-auto" />
          </div>
          <div className="px-7 mt-7">
            <hr className="border-gray-700" />
          </div>
          <div>
            <div className="text-white flex items-center px-7 mt-7 gap-4 text-sm">
              <TbLogout2 />
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
