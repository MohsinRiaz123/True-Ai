import React, { useEffect } from "react";
import { useState } from "react";

const TodayActivities = (todayTask) => {
  console.log("today Activity", todayTask);
  const [obj, setObj] = useState([]);
  useEffect(() => {
    if (todayTask) {
      setObj(todayTask.todayTask);
    }
  }, [todayTask]);
  console.log("obj", obj);
  return (
    <div className="flex flex-col h-full ">
      <div className="bg-custom-dark-blue  p-2 rounded-md  text-white flex justify-between w-full drop-shadow-xl text-sm">
        <div>Today's activities</div>
        {/* <div>see all</div> */}
      </div>
      <div className="py-2 bg-gray-300 border-2 border-gray-300 drop-shadow-xl mt-2  rounded-lg text-xs ">
        {obj.map((val, i) => {
          return (
            <div className="bg-white px-4 flex items-center  rounded-lg m-2 p-2 gap-4">
              <div>
                <img src={val.image} alt="" className="w-7 h-7 rounded-full" />
              </div>
              <div className="space-y-2">
                <div>
                  {val.for_role} role interview with {val.candidate_name}
                </div>
                <div>{val.expiry_time} EST</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayActivities;
