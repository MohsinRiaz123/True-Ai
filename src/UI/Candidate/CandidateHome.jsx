import React from "react";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { CgSortAz } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const CandidateHome = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [decline, setDecline] = useState(false);
  const [accept, setAccept] = useState(false);
  const [sortOrder, setSortOrder] = useState("newToOld");
  const [searchQuery, setSearchQuery] = useState("");

  const obj = [
    {
      id: "1",
      img: "/src/assets/Images/7kcLogo.png",
      name: "7 Kings Code",
      position: "UI/UX",
      type: "Pre-Interview",
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
      position: "Front-end Developer",
      type: "Interview",
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
      position: "Back-end Developer",
      type: "Pre-Interview",
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
      position: "UI/UX",
      type: "Interview",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
      daysLeft: "1",
      jobType: "Full Time",
      salary: "$3500 per month",
      responsibility:
        "Conduct user research to understand user behaviors, needs, and preferences.Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.Ensure consistency in design elements and user interactions across various platforms.Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.Conduct usability testing and gather feedback for continuous improvement of designs.Work closely with developers to implement and maintain design specifications.",
    },
  ];

  // Function to handle sorting by job type
  const sortByJobType = (a, b) => {
    const typeA = a.type.toLowerCase();
    const typeB = b.type.toLowerCase();
    return sortOrder === "alphabetical"
      ? typeA.localeCompare(typeB)
      : typeB.localeCompare(typeA);
  };

  const filteredAndSortedInterviews = [...obj]
    // .filter(
    //   (interview) =>
    //     interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     interview.name.toLowerCase().includes(searchQuery.toLowerCase())
    // )
    .sort(sortByJobType);

  const handelStart = () => {
    navigate("/preInterview");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <div className="flex bg-gray-300 items-center rounded-2xl w-full tablet:w-5/6 pl-1">
          <div className="mx-3 w-[5%]">
            <RiSearch2Line />
          </div>
          <div className="w-[75%]">
            <input
              type="text"
              className="bg-gray-300 placeholder:text-black outline-none text-xs tablet:text-sm w-full "
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="m-1 w-[20%] flex justify-end px-1">
            <button
              type="submit"
              className="bg-custom-dark-blue text-[8px] tablet:text-[10px] laptop:text-sm text-white p-2 rounded-xl"
            >
              Search invitations
            </button>
          </div>
        </div>
      </form>
      <div className="flex">
        <div className="text-sm tablet:text-lg laptop:text-lg font-bold w-full">
          <p>Unscheduled Interviews:</p>
        </div>
        <button
          className="relative flex flex-row items-center justify-end text-xs tablet:text md laptop:text-base w-3/6 space-x-1"
          onClick={() => setShow(!show)}
        >
          <p>Sort by</p>
          <div className="w-2/6">
            <p className="text-xl">
              <CgSortAz />
            </p>
            {show && (
              <div className="flex flex-col absolute text-[6px] tablet:text-xs space-y-2 border border-black px-1 py-1 rounded-md bg-gray-300">
                <div>
                  <button
                    className={sortOrder === "alphabetical" ? "font-bold" : ""}
                    onClick={() => {
                      setSortOrder("alphabetical");
                      setShow(false);
                    }}
                  >
                    Interview
                  </button>
                </div>
                <div>
                  <button
                    className={
                      sortOrder === "reverseAlphabetical" ? "font-bold" : ""
                    }
                    onClick={() => {
                      setSortOrder("reverseAlphabetical");
                      setShow(false);
                    }}
                  >
                    Pre Interview
                  </button>
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
      <div className="space-y-4">
        {filteredAndSortedInterviews.map((val, i) => {
          return (
            <div
              key={i}
              className="w-full flex border border-gray-300 rounded-xl shadow-lg"
            >
              <div className="w-[0%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2">
                <img src={val.img} alt="" className="p-4" />
              </div>

              <div className="flex-col w-[80%] px-3 py-3 space-y-1">
                <div className="flex">
                  <div className="flex gap-4 w-full">
                    <p className="text-sm tablet:text-md laptop:text-lg font-bold">
                      {val.name}
                    </p>
                    <p className="text-xs tablet:text-sm laptop:text-md items-center flex font-semibold text-pink-400">
                      ({val.type})
                    </p>
                  </div>
                  <div className="w-full text-[8px] tablet:text-sm laptop:text-md text-purple-800 px-1 laptop:px-4 py-1">
                    <Link to={"/candidate/job"}>(view job details)</Link>
                  </div>
                </div>
                <div className="text-sm laptop:text-md font-semibold">
                  <p>{val.position}</p>
                </div>
                <div className="text-[10px] tablet:text-xs">
                  <p>{val.Discription}</p>
                </div>
                <div className="flex">
                  <div className="flex space-x-0 tablet:space-x-1 laptop:space-x-2">
                    <div>
                      <a href="https://www.facebook.com/">
                        <img
                          src="/src/assets/Images/facebook.png"
                          alt="Facebook"
                        />
                      </a>
                    </div>
                    <div>
                      <a href="https://github.com/">
                        <img src="/src/assets/Images/github.png" alt="GitHub" />
                      </a>
                    </div>
                    <div>
                      <a href="https://pk.linkedin.com/">
                        <img
                          src="/src/assets/Images/linkedin.png"
                          alt="LinkedIn"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-start space-x-2 w-full text-[7px] tablet:text-sm laptop:text-md pl-16">
                    <p>Expires in:</p>
                    <p className="text-pink-400">{val.daysLeft} days</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-[25%] text-[6px] tablet:text-[12px] laptop:text-md">
                <div className="flex flex-col space-y-3 mr-1">
                  {val.type === "Pre-Interview" ? (
                    <button
                      className="text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-5 tablet:py-2 rounded-full"
                      onClick={() => handelStart()}
                    >
                      Start Interview
                    </button>
                  ) : (
                    <button
                      className="text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-3 tablet:py-2 rounded-full"
                      onClick={()=>setAccept(true)} // You can replace this with your actual accept functionality
                    >
                      Accept Interview
                    </button>
                    
                  )}
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
                  )}
                  <button
                    className="border border-black px-2 tablet:px-3 py-1.5 laptop:px-5 rounded-full"
                    onClick={() => setDecline(true)}
                  >
                    Decline
                  </button>
                  {decline && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="flex bg-white px-10 py-5 w-[90%] laptop:w-[45%] flex-col rounded-2xl space-y-5">
                        <div className="text-lg flex justify-between">
                          <div>
                            <p className="text-xl font-bold">
                              We’re sorry to see you decline this interview.
                            </p>
                            <p className="text-gray-500 text-sm">
                              Can you please write your reason for not accepting
                              this interview.
                            </p>
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
                        <div className="py-2 text-black placeholder:text-black">
                          <textarea
                            className="bg-gray-100 border border-gray-300 shadow-lg rounded-xl w-full outline-none px-4 py-2 h-[200px] text-black placeholder:text-black"
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

export default CandidateHome;
