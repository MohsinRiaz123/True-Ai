import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../UI/Candidate/ProfileSidebar"
const CandidateProfile = () => {
  return (
    <div className=" bg-LoginBack bg-center bg-cover  w-full   py-4 flex items-center justify-center  ">
      <div className=" flex w-[85%] mx-auto  bg-white rounded-3xl flex-row">
        <ProfileSidebar />
        <div className=" w-full laptop:w-[65%] px-5 py-5 h-full ">
          
          <div className=" "><Outlet/></div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
