import React from 'react'
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
// import { CgSortAz } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
const DeclinedInterview = () => {
    // const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    // const [decline, setDecline] = useState(false);
    // const [sortOrder, setSortOrder] = useState("newToOld");
    const [searchQuery, setSearchQuery] = useState("");
    const obj = [
      {
        id: "1",
        img: "/src/assets/Images/7kcLogo.png",
        name: "7 Kings Code",
        position: " UI/UX",
        Discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
        daysLeft: "3",
        jobType: "Full Time",
        salary: "$3500 per month",
        responsibility:
          "Conduct user research to understand user behaviors, needs, and preferences.Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.Ensure consistency in design elements and user interactions across various platforms.Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.Conduct usability testing and gather feedback for continuous improvement of designs.Work closely with developers to implement and maintain design specifications.",
      },
      {
        id: "2",
        img: "/src/assets/Images/apple.png",
        name: "Apple",
        position: " Front-end Developer",
        Discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
        daysLeft: "4",
        jobType: "Part Time",
        salary: "$2500 per month",
        responsibility:
          "Conduct user research to understand user behaviors, needs, and preferences.Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.Ensure consistency in design elements and user interactions across various platforms.Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.Conduct usability testing and gather feedback for continuous improvement of designs.Work closely with developers to implement and maintain design specifications.",
      },
      {
        id: "3",
        img: "/src/assets/Images/microsoft.png",
        name: "Microsoft",
        position: " Back-end Developer",
        Discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
        daysLeft: "2",
        jobType: "Full Time",
        salary: "$35000 per year",
        responsibility:
          "Conduct user research to understand user behaviors, needs, and preferences.Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.Ensure consistency in design elements and user interactions across various platforms.Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.Conduct usability testing and gather feedback for continuous improvement of designs.Work closely with developers to implement and maintain design specifications.",
      },
      {
        id: "4",
        img: "/src/assets/Images/7kcLogo.png",
        name: "7 Kings Code",
        position: " UI/UX",
        Discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
        daysLeft: "1",
        jobType: "Full Time",
        salary: "$3500 per month",
        responsibility:
          "Conduct user research to understand user behaviors, needs, and preferences.Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.Ensure consistency in design elements and user interactions across various platforms.Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.Conduct usability testing and gather feedback for continuous improvement of designs.Work closely with developers to implement and maintain design specifications.",
      },
    ];
    // Function to handle sorting
    // const sortByDayLeft = (a, b) => {
    //   const dayA = new String(a.daysLeft);
    //   const dayB = new String(b.daysLeft);
    //   return sortOrder === "newToOld" ? dayB - dayA : dayA - dayB;
    // };
  
    const filteredAndSortedInterviews = [...obj]
      .filter(
        (interview) =>
          interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interview.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      // .sort(sortByDayLeft);
  
  
  return (
    <div>
    <div className="flex justify-center">
      <div className="flex  bg-gray-300  items-center rounded-2xl w-full tablet:w-4/6 pl-1">
        <div className="mx-3 w-[5%]">
          <RiSearch2Line />
        </div>
        <div className="w-[55%]">
          <input
            type="text"
            className="bg-gray-300 placeholder:text-black outline-none text-sm tablet:text-md "
            placeholder="Search "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className=" m-1  w-[40%] flex justify-end px-1">
          <button className="bg-custom-dark-blue text-[8px] tablet:text-[10px] laptop:text-sm text-white p-2 rounded-xl  ">
            Search invitations
          </button>
        </div>
      </div>
    </div>
    <div className="flex  ">
      <div className=" text-sm tablet:text-lg laptop:text-lg font-bold w-full">
        <p>Declined Interviews:</p>
      </div>
      {/* <button
        className=" relative flex flex-row  items-center justify-end text-xs tablet:text md laptop:text-base  w-3/6  space-x-1"
        onClick={() => setShow(!show)}
      >
        <p>sort by </p>
        <div className=" w-2/6">
          <p className="text-xl">
            <CgSortAz />
          </p>
          {show && (
            <div className=" flex flex-col absolute text-[6px] tablet:text-xs space-y-2 border border-black px-1 py-1 rounded-md bg-gray-300">
              <div className="">
                <button
                  className={sortOrder === "newToOld" ? "font-bold" : ""}
                  onClick={() => {
                    setSortOrder("newToOld");
                    setShow(false);
                  }}
                >
                  Pre-Interview
                </button>
              </div>
              <div>
                <button
                  className={sortOrder === "oldToNew" ? "font-bold" : ""}
                  onClick={() => {
                    setSortOrder("oldToNew");
                    setShow(false);
                  }}
                >
                  {" "}
                  Interview
                </button>
              </div>
            </div>
          )}
        </div>
      </button> */}
    </div>
    <div className="space-y-4">
      {filteredAndSortedInterviews.map((val, i) => {
        return (
          <div className="w-full flex  border border-gray-300 rounded-xl shadow-lg">
            <div className="w-[0%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2  ">
              <img src={val.img} alt="" className="p-4 w-full" />
            </div>

            <div className="flex-col w-[80%] px-3 py-3 space-y-1">
              <div className="flex">
                <div className="   text-sm tablet:text-md laptop:text-lg font-bold w-full ">
                  {val.name}
                </div>
                <div className="w-full text-[8px] tablet:text-sm laptop:text-md text-purple-800  px-1 laptop:px-4 py-1">
                  <Link to={"/candidate/job"}>(view job details)</Link>
                </div>
              </div>
              <div className="text-sm laptop:text-md font-semibold">
                <p>{val.position}</p>
              </div>
              <div className="text-[10px] tablet:text-xs ">
                <p>{val.Discription}</p>
              </div>
              <div className="flex">
                <div className=" flex space-x-0 tablet:space-x-1 laptop:space-x-2 ">
                  <div>
                    <a href="https://www.facebook.com/">
                      <img src="/src/assets/Images/facebook.png" />
                    </a>
                  </div>
                  <div>
                    <a href="https://github.com/">
                      <img src="/src/assets/Images/github.png" />
                    </a>
                  </div>
                  <div>
                    <a href="https://pk.linkedin.com/">
                      <img src="/src/assets/Images/linkedin.png" />
                    </a>
                  </div>
                </div>
                <div className="flex justify-start space-x-2 w-full text-[7px] tablet:text-sm laptop:text-md  pl-16">
                  <p className="text-pink-400">Declined :</p>
                  <p className="">24 Sep 2023</p>
                </div>
              </div>
            </div>
            {/* <div className=" flex items-center justify-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md">
              <div className="flex flex-col space-y-3 mr-1">
                <button className=" text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-5 tablet:py-2 rounded-full"
                onClick={()=>handelStart()}>
                  Start Interview
                </button>
                <button
                  className=" border border-black px-2 tablet:px-3 py-1.5  laptop:px-5   rounded-full"
                  onClick={() => setDecline(true)}
                >
                  Decline
                </button>
                {decline && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="flex bg-white px-10 py-5 w-[90%] laptop:w-[45%] flex-col rounded-2xl space-y-5">
                      <div className="text-lg flex justify-between">
                        <div className="">
                          <div>
                            <p className="text-xl font-bold">
                              We’re sorry to see you decline this interview.
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Can you please write your reason for not
                              accepting this inerview.
                            </p>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setDecline(false);
                            }}
                          >
                            <div className="bg-black text-white rounded-md p-2">
                              <RxCross1 />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="py-2 text-black placeholder:text-black     ">
                        <textarea
                          type="textarea"
                          className="bg-gray-100 border border-gray-300 shadow-lg rounded-xl w-full outline-none px-4 py-2 h-[200px] text-black placeholder:text-black "
                          placeholder="Dummy text............."
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="bg-black text-white px-4 py-1 rounded-lg"
                          onClick={() => {
                            setDecline(false);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default DeclinedInterview
