import React from 'react'
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
const EmpPendingInterviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const obj = [
        {
          id: "1",
         day:"WED",
          date: "Sep 24",
          time: "09:00",
          Channel:"Online",
          dis:" meeting with John, Michael and Samuel"
        },
        {
            id: "2",
           day:"WED",
            date: "Sep 24",
            time: "09:00",
            Channel:"Online",
            dis:" meeting with John, Michael and Samuel"
          },
          {
            id: "3",
           day:"WED",
            date: "Sep 24",
            time: "09:00",
            Channel:"Online",
            dis:" meeting with John, Michael and Samuel"
          },
          {
            id: "4",
           day:"WED",
            date: "Sep 24",
            time: "09:00",
            Channel:"Online",
            dis:" meeting with John, Michael and Samuel"
          },
          {
            id: "5",
           day:"WED",
            date: "Sep 24",
            time: "09:00",
            Channel:"Online",
            dis:" meeting with John, Michael and Samuel"
          },
          {
            id: "6",
           day:"WED",
            date: "Sep 24",
            time: "09:00",
            Channel:"Online",
            dis:" meeting with John, Michael and Samuel"
          },
       
      ];
      const getRowHeight = () => {
        if (window.innerWidth >= 500) return 150;
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
      const currentRows = obj.slice(indexOfFirstRow, indexOfLastRow);
    
      const totalPages = Math.ceil(obj.length / rowsPerPage);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  return (
    <div className='w-full space-y-5 h-full flex flex-col justify-between'>
    <div className='space-y-3'>
    <div className='bg-custom-dark-blue px-3 py-2 rounded-lg space-x-8' >
      <p  className='text-pink-400'>Pendind Interviews</p>
    </div>
    <div className='space-y-3'>
        {currentRows.map((val,i)=>{
            return(
                <div className='flex justify-around px-10 py-4 border border-gray-300 shadow-lg shadow-gray-200 items-center rounded-lg '>
                    <div className='text-2xl font-semibold w-[20%] '>
                        <p>{val.day}</p>
                        <p>{val.date}</p>
                    </div>
                    <div className='space-y-2 flex flex-col   w-[30%]'>
                        <p className='flex gap-3 '><AiOutlineClockCircle/>{val.time}</p>
                        <p className='flex gap-3'><CiLocationOn />{val.Channel}</p>
                    </div>
                    <div className=' w-[40%]'>{val.dis}</div>
                    <div className=' w-[10%] text-yellow-500 text-lg font-semibold'>Pending</div>
                </div>
            )
        })}
    </div>
    </div>
    <div className="flex   mt-4 text-sm ">
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
  )
}

export default EmpPendingInterviews
