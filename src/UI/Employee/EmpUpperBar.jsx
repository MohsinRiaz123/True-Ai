import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { GoBell } from "react-icons/go";
import DeclinedInterview from "../../Features/TopWidgets/DeclinedInterview";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import EmpMenuBar from "./EmpMenuBar";
import { Link } from "react-router-dom";
import RescheduledInterview from "../../Features/TopWidgets/RescheduledInterviews"
import PendingInterviews from "../../Features/TopWidgets/PendingInterviews";
import ScheduledInterviews from "../../Features/TopWidgets/ScheduledInterviews";
const EmpUpperBar = () => {
  const [display, setdisplay] = useState(false);
  const fname = localStorage.getItem("FirstName");
  return (
    <div className="space-y-5">
      <div>
        <div className="flex py-5  px-5 justify-between w-full items-center">
        <div className="px-5 ">
          <p className="font-bold  text-lg tablet:text-xl 2xl:text-2xl">
            Welcome back,
            <span className="text-pink-400 px-2">{fname}</span>
          </p>
        </div>
          <div className=" text-xl tablet:text-3xl flex">
            <GoBell />
            <div className="block laptop:hidden px-3">
              <button className=" " onClick={() => setdisplay(!display)}>
                <TiThMenu />
              </button>
              {display && (
                <div className="">
                  <EmpMenuBar />
                  <button
                    className=" absolute  text-white  top-6 z-10"
                    onClick={() => setdisplay(!display)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
       
      </div>
      <div className="px-5 grid grid-cols-2 tablet:grid-cols-4 gap-3 ">
        <Link to={"/employe/scheduleInterviews"}><ScheduledInterviews/></Link>
        <Link to={"/employe/declinedInterviews"}><DeclinedInterview /></Link>
        <Link to={"/employe/pendingInterviews"}><PendingInterviews/></Link>
        <Link to={"/employe/RescheduledInterviews"}><RescheduledInterview/></Link>
      </div>
    </div>
  );
};

export default EmpUpperBar;
