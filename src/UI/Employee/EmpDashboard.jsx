import React from "react";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import TodayActivities from "../../Features/TodayActivities";
import { GoDotFill } from "react-icons/go";
import useGetEmployerDashboardData from "../../Services/Employee/Dashboard/useGetEmployerDashboardData";
const EmpDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [interviews, setInterviews] = useState([]);
  const [activites, setActivites] = useState([]);
  const { data, isLoading, isError, error } = useGetEmployerDashboardData();
  useEffect(() => {
    if (data && data.candidates) {
      console.log("data is ", data);
      setInterviews(data.candidates);
      setActivites(data.today_candidates);
    } else {
      setInterviews([]);
    }
  }, [data]);

  const getRowHeight = () => {
    if (window.innerWidth >= 500) return 50;
    return 60;
  };

  const calculateRowsPerPage = () => {
    const rowHeight = getRowHeight();
    setRowsPerPage(Math.floor(window.innerHeight / rowHeight));
  };
  useEffect(() => {
    calculateRowsPerPage();
    window.addEventListener("resize", calculateRowsPerPage);
    return () => window.removeEventListener("resize", calculateRowsPerPage);
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = interviews.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(interviews.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getDotColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FCD34D";
      case "Diclined":
        return "red";
      case "Confirmed":
        return "#A3E635";
      default:
        return "gray";
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex justify-center items-center h-[200px] w-full">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-[100px] w-[100px] animate-spin"></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-5 h-full ">
      <div className=" w-full laptop:w-[70%] ">
        <div className="flex flex-col justify-between h-full  ">
          <div className="text-[10px] tablet:text-sm ">
            <div className="bg-custom-dark-blue  p-2 rounded-md  text-white flex  w-full ">
              <div className="w-[20%] flex justify-center">Candidate Name</div>
              <div className="w-[20%] flex justify-center">Position Name </div>
              <div className="w-[20%] flex justify-center">Expiry date</div>
              <div className="w-[20%] flex justify-center">Expiry Time</div>
              <div className="w-[20%] flex justify-center">Status</div>
            </div>
            <div className="">
              {interviews.length > 0 ? (
                currentRows.map((val, i) => {
                  return (
                    <div className="flex  border-b p-3 ">
                      <div className="w-[20%] flex justify-center">
                        {val.candidate_name}
                      </div>
                      <div className="w-[20%] flex justify-center">
                        {val.for_role}
                      </div>
                      <div className="w-[20%] flex justify-center">
                        {val.expiry_date}
                      </div>
                      <div className="w-[20%] flex justify-center">
                        {val.expiry_time}
                      </div>
                      <div className="w-[20%]  ">
                        <div className="   pl-[15%] ">
                          <div className="flex px-2 py-1 border border-gray-300  gap-1 rounded-lg">
                            <p
                              className="text-lg"
                              style={{ color: getDotColor(val.status) }}
                            >
                              <GoDotFill />
                            </p>
                            <p>{val.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center text-gray-500 text-xl h-full">
                  <p>No Data Available</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-  mt-4 text-sm ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1  flex justify-center items-center gap-1 ${
                currentPage === 1 ? "text-gray-400" : "text-black"
              }`}
            >
              <IoIosArrowBack />
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-2 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1  flex justify-center items-center gap-1 ${
                currentPage === totalPages ? "text-gray-400" : "text-black"
              }`}
            >
              Next
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div className=" ">
        <TodayActivities todayTask={activites}/>
      </div>
    </div>
  );
};

export default EmpDashboard;
