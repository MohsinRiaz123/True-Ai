import React, { useEffect, useState } from "react";
import EmpDashboardSudebar from "../../UI/Employee/EmpDashboardSudebar";
import EmpDashboardUperBar from "../../UI/Employee/EmpDashboardUperBar";
import { Outlet } from "react-router-dom";
const EmployeDashboard = () => {
  const fname = localStorage.getItem("FirstName");
  const lname = localStorage.getItem("LastName");
  const pic = localStorage.getItem("Image");
  return (
    <div className="flex ">
      <div className="w-1/4 hidden laptop:block">
        <EmpDashboardSudebar />
      </div>
      <div className="flex flex-col w-full gap-y-7">
        <div>
          <EmpDashboardUperBar />
        </div>
        <div className="flex justify-between px-5 gap-3 flex-col laptop:flex-row h-full ">
          <div className=" w-full   ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeDashboard;
