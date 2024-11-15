import React, { useState } from "react";
import DashboardSidebar from "../../UI/Candidate/DashboardSidebar";
import michael from "../../assets/Images/michael.png";
import DeclinedInterview from "../../Features/TopWidgets/DeclinedInterview";
import { TiThMenu } from "react-icons/ti";
import Menubar from "../../UI/Candidate/Menubar";
import { RxCross2 } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";
import InterviewInvites from "../../Features/TopWidgets/InterviewInvites";
import UnscheduledInterviews from "../../Features/TopWidgets/UnscheduledInterviews";
import RescheduledInterviews from "../../Features/TopWidgets/RescheduledInterviews";
const Candidate = () => {
  const [display, setdisplay] = useState(false);
  
  return (
    <div>
      <div className="flex ">
        <DashboardSidebar />

        <div className=" px-4 w-full space-y-3 relative">
          <div className=" flex mt-5 justify-between  ">
            <div className="flex">
              <div className=" flex items-center justify-center rounded-full h-20 ">
                <img src={michael} alt="" className="w-20" />
              </div>
              <div className=" p-4 flex-col ">
                <div>
                  <p className="font-bold text-2xl laptop:text-2xl ">
                    Welcome back,
                    <span className="text-[#de43e4] mx-2">Michael</span>
                  </p>
                </div>
                <div>
                  <p className="text-md laptop:text-lg text-gray-500">
                    UI/UX Designer
                  </p>
                </div>
                
              </div>
            </div>
            <div className="block laptop:hidden px-3 ">
              <button className=" " onClick={() => setdisplay(!display)}>
                <TiThMenu />
              </button>
              {display && (
                <div className="">
                  <Menubar/>
                  <button
                    className=" absolute z-10  text-white text-xl top-6"
                    onClick={() => setdisplay(!display)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className=" grid grid-cols-2 tablet:grid-cols-4 gap-1">

            <Link to="/candidate/scheduleInterview"><InterviewInvites /></Link>
            <Link to="/candidate/declinedInterview" > <DeclinedInterview /></Link>
            <Link><UnscheduledInterviews /></Link>
            <Link to="rescheduledInterview"><RescheduledInterviews/></Link>
          </div>
          <div>
            <Outlet/>
          </div>
         </div>
      </div>
    </div>
  );
};

export default Candidate;
