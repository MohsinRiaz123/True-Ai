import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
const Job = () => {
  const [decline, setDecline] = useState(false);
  const navigate = useNavigate();
  const handelStart=()=>
    {
      navigate('/preInterview');
    }

  const obj = [
    {
      id: "1",
      img: "/src/assets/Images/michael.png",
      name: "7 Kings Code",
      position: " UI/UX Designer",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nibh vel nisi ultrices fringilla vel id felis",
      daysLeft: "3",
      jobType: "Full Time",
      salary: "3500 per month",
      place: "Paris , France",
      responsibility: {
        r1: "Conduct user research to understand user behaviors, needs, and preferences.",
        r2: "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.",
        r3: "Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.",
        r4: " Ensure consistency in design elements and user interactions across various platforms.",
        r5: "Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.",
        r6: "Conduct usability testing and gather feedback for continuous improvement of designs.",
        r7: "Work closely with developers to implement and maintain design specifications.",
      },
    },
  ];

  return (
    <div>
      <div className="w-full mt-2">
        {obj.map((val, i) => {
          return (
            <div className="flex flex-col">
              <div className="flex gap-2 text-sm tablet:text-2xl font-bold">
                Pre-interview invite from{" "}
                <p className=" text-[#de43e4]">{val.name}:</p>
              </div>
              <div className="flex text-xs tablet:text-base justify-start mt-2">
                Hello Michael, you’ve got a pre-interview invite from 7 Kings
                Code for the role of a {val.position}. This interview will be AI
                based and TrueAi will ask pre-selected questions by the
                employer.
              </div>
              <div className="flex items-center justify-between mt-3 px-4">
                <div>
                  <div className=" flex items-center justify-center text-[6px] tablet:text-[12px] laptop:text-md ">
                    <div className="flex  space-x-3 mr-1">
                      <button
                        className=" text-white bg-LoginBtn bg-center bg-cover px-2 tablet:px-3 py-1 laptop:py-2 laptop:px-5 tablet:py-2 rounded-full "
                        onClick={()=>handelStart()}
                      >
                        Start Interview
                      </button>
                     
                      <button className=" border border-black px-2 tablet:px-3 py-1.5  laptop:px-5   rounded-full"
                      onClick={() => setDecline(true)}>
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
                <div className=" flex space-x-0 tablet:space-x-1 laptop:space-x-2 ">
                  <div>
                    <a href="https://www.facebook.com">
                      <img
                        src="/src/assets/Images/facebook.png"
                        className="w-5 tablet:w-auto h-5 tablet:h-auto"
                      />
                    </a>
                  </div>
                  <div>
                    <a href="https://github.com">
                      <img
                        src="/src/assets/Images/github.png"
                        className="w-5 tablet:w-auto h-5 tablet:h-auto"
                      />
                    </a>
                  </div>
                  <div>
                    <a href="https://pk.linkedin.com">
                      <img
                        src="/src/assets/Images/linkedin.png"
                        className="w-5 tablet:w-auto h-5 tablet:h-auto"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2 gap-2 ">
                <p className="text-sm tablet:text-2xl font-bold">
                  Job Details:
                </p>
                <div className=" flex gap-2 items-center text-xs tablet:text-lg">
                  <div className="text-[#de43e4]">
                    <FaBusinessTime />
                  </div>
                  {val.jobType}
                </div>
                <div className=" flex gap-2 items-center text-xs tablet:text-lg">
                  <div className="text-[#de43e4]">
                    <MdOutlineAttachMoney />
                  </div>
                  {val.salary}
                </div>
                <div className=" flex gap-2 items-center text-xs tablet:text-lg">
                  <div className="text-[#de43e4]">
                    <CiLocationOn />
                  </div>
                  {val.place}
                </div>
                <div>
                <div className="px-3 p-1 bg-black text-white font-semibold w-fit rounded-lg">Expiry date: Sep 02, 2024</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm tablet:text-2xl font-bold">
                  Responsibilities:
                </div>
                <div className="text-xs laptop:text-sm">
                  <li>{val.responsibility.r1}</li>
                  <li>{val.responsibility.r2}</li>
                  <li>{val.responsibility.r3}</li>
                  <li>{val.responsibility.r4}</li>
                  <li>{val.responsibility.r5}</li>
                  <li>{val.responsibility.r6}</li>
                  <li>{val.responsibility.r7}</li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
