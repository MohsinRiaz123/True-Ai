import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
// import { CgSortAz } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ScheduledInterview = () => {
  const navigate = useNavigate();
  const reschedule = () => {
    navigate("/candidate/reschedule");
  };
  // const [show, setShow] = useState(false);
  const [decline, setDecline] = useState(false);
  const [accept, setAccept] = useState(false);
  // const [sortOrder, setSortOrder] = useState("newToOld");
  const [searchQuery, setSearchQuery] = useState("");
  const obj = [
    {
      id: "1",
      img: "/src/assets/Images/7kcLogo.png",
      name: "7 Kings Code",
      position: " UI/UX",
      date: "Sep 24,2024",
      time: "09:00 pm (EST time zone)",
    },
    {
      id: "2",
      img: "/src/assets/Images/apple.png",
      name: "Apple",
      position: " Front-end Developer",
      date: "Sep 20,2024",
      time: "12:00 pm (EST time zone)",
    },
    {
      id: "3",
      img: "/src/assets/Images/microsoft.png",
      name: "Microsoft",
      position: " Back-end Developer",
      date: "Sep 22,2024",
      time: "20:00 pm (EST time zone)",
    },
  ];
  // Function to handle sorting
  // const sortByDate = (a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);
  //   return sortOrder === "newToOld" ? dateB - dateA : dateA - dateB;
  // };

  const filteredAndSortedInterviews = [...obj].filter(
    (interview) =>
      interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // .sort(sortByDate);
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
          <p>Interview invites:</p>
        </div>
        {/* <button
          className=" relative flex flex-row  items-center justify-end   w-3/6  space-x-1"
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
            <div className="w-full flex  border border-gray-300 rounded-xl shadow-lg py-1">
              <div className="w-[0%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2 ">
                <img src={val.img} alt="" className="p-4" />
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
                <div className="text-sm laptop:text-md font-semibold flex gap-10">
                  <div className="flex gap-2">
                    <p className="text-pink-400 ">Date :</p>
                    <p>{val.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-pink-400 ">Time :</p>
                    <p>{val.time} </p>
                  </div>
                </div>
                <div className="flex gap-5 ">
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
                </div>
              </div>
              <div className=" flex items-center justify-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md">
                <div className="flex flex-col space-y-4 mr-1">
                  {/* <button
                    className=" text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-5 tablet:py-2 rounded-full"
                    onClick={() => setAccept(true)}
                  >
                    Accept
                  </button>
                  {accept && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="flex bg-white px-10 py-5 w-[90%] laptop:w-[45%] flex-col rounded-2xl space-y-5">
                        <div className="text-lg flex justify-between">
                          <div className="">
                            <div>
                              <p className="text-xl font-bold">
                                Choose a time slot
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-sm">
                                Please choose a time slot fpor this interview
                                according to your availability
                              </p>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setAccept(false);
                              }}
                            >
                              <div className="bg-black text-white rounded-md p-2">
                                <RxCross1 />
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex items-center">
                            <input type="radio" name="time"></input>
                          </div>

                          <div>
                            <p className="font-bold text-lg">Time Slot 1: (EST)</p>
                            <div className="flex gap-2 ">
                              <p className="font-semibold">Date:</p>{" "}
                              <p>17 sep, 2024</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-semibold">Available time:</p>
                              <p>02:00pm (EST Time Zone)</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex items-center">
                            <input type="radio" name="time"></input>
                          </div>

                          <div>
                            <p className="font-bold text-lg">Time Slot 2: (EST)</p>
                            <div className="flex gap-2 ">
                              <p className="font-semibold">Date:</p>{" "}
                              <p>17 sep, 2024</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-semibold">Available time:</p>
                              <p>03:00pm (EST Time Zone)</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex items-center">
                            <input type="radio" name="time"></input>
                          </div>

                          <div>
                            <p className="font-bold text-lg">Time Slot 3: (EST)</p>
                            <div className="flex gap-2 ">
                              <p className="font-semibold">Date:</p>{" "}
                              <p>17 sep, 2024</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-semibold">Available time:</p>
                              <p>04:00pm (EST Time Zone)</p>
                            </div>
                          </div>
                        </div>
                        <div className=" flex justify-end">
                          <button className="bg-black text-white px-5 py-1 rounded-lg text-lg"
                           onClick={() => {
                            setAccept(false);
                          }}>
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )} */}
                  <button
                    className="text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-5 tablet:py-2 rounded-full"
                    onClick={reschedule}
                  >
                    Re-Schedule
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduledInterview;