import React from "react";
import EmpDashboardSudebar from "../../UI/Employee/EmpDashboardSudebar";
import { Outlet } from "react-router-dom";
import EmpUpperBar from "../../UI/Employee/EmpUpperBar";
const Employe = () => {
  return (
    <div className="flex ">
      <div className="w-1/4 hidden laptop:block">
        <EmpDashboardSudebar />
      </div>
      <div className="flex flex-col w-full gap-y-7">
        <div>
          <EmpUpperBar/>
        </div>
        <div className="flex justify-between px-5 gap-3 flex-col laptop:flex-row h-full ">
          <div className=" w-full   ">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employe;
