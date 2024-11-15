import React from "react";
import TrueAi from "../../assets/Images/TrueAI.png";
import Logo from "../../assets/Images/LoginImg.png";
import { RiHome7Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbUserEdit } from "react-icons/tb";
import { LuUpload } from "react-icons/lu";
import { LuCrown } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Services/Onboard/logout/useLogout";

const EmpDashboardSidebar = () => {
  const email = localStorage.getItem("email");
  const refreshToken = localStorage.getItem("Token");
  const fname = localStorage.getItem("FirstName");
  const lname = localStorage.getItem("LastName");
  const pic = localStorage.getItem("Image");
  const navigate = useNavigate();
  const { logout, error } = useLogout(); // Use the custom hook

  const goForEdit = () => {
    navigate("/employeeprofile");
  };

  const handleLogout = async () => {
    try {
      await logout(email, refreshToken);
      localStorage.removeItem("email");
      localStorage.removeItem("Token");
      localStorage.removeItem("FirstName");
      localStorage.removeItem("LastName");
      localStorage.removeItem("Image");
      console.log("Logout successful:", email, refreshToken);
      navigate("/"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally handle error display if needed
    }
  };

  return (
    <div className="bg-custom-dark-blue px-5 min-h-screen h-full ">
      <div className="flex justify-between h-full  flex-col  ">
        <div>
          <div className="py-8">
            <img src={TrueAi} alt="" />
          </div>
          <div className="">
            <hr className="border-gray-700" />
          </div>
          <div className="mt-8">
            <div className="bg-white p-2 rounded-lg" onClick={goForEdit}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="border border-pink-400 w-11 h-11 rounded-full flex justify-center items-center">
                    <img src={pic} alt="" className=" w-9 h-9 rounded-full" />
                  </div>
                  <div className="font-semibold text-lg">{fname} {lname}</div>
                </div>
                <div className="text-xl font-bold text-pink-400">
                  <button><BiSolidEdit /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white mt-11">
            <ul className="space-y-3 text-sm">
              <li>
                <div className="flex items-center gap-4">
                  <RxDashboard />
                  <a href="/empDashboard">Dashboard</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <RiHome7Line />
                  <a href="/employe/Home">Home</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <TbUserEdit />
                  <a href="/employe/usermanagement">User management</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <LuUpload />
                  <a href="/employe/bulkUpload">Upload Resumes in bulk</a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <LuCrown />
                  <a href="/employe/subscription">Subscription</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="mt-20">
            <img src={Logo} alt="" className="w-[85%] mx-auto" />
          </div>
          <div className="mt-7">
            <hr className="border-gray-700" />
          </div>
          <div>
            <div className="text-white flex items-center mt-7 gap-4 pb-4">
              <TbLogout2 />
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboardSidebar;
