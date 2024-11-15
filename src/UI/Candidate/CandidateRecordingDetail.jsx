import React from "react";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState } from "react";

const CandidateRecordingDetailes = () => {
  const [showAns, setShowAns] = useState(false);
  const [showJobRole, setShowJobRole] = useState(true);
  const [showTestInfo, setShowTestInfo] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const user = {
    img: "/src/assets/Images/7king.png",
    name: "Ali Carter",
    position: " UI/UX Designer",
    match: "88% ",
  };
  const obj = {
    img: "/src/assets/Images/recordingList.png",
    comName: "7 Kings code",
    position: "UI/UX Designer",
    date: "Sunday,18th june 2024",
    time: "09:45 pm EST",
    Skill: ["Figma", "Adobe XD", "Illustrator"],
  };
  const des = [
    "Conduct user research to understand user behaviors, needs, and preferences.",
    "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.",
    "Collaborate with product managers, developers, and other stakeholders to refine and iterate design concepts.",
    "Ensure consistency in design elements and user interactions across various platforms.",
    "Stay updated on industry trends, best practices, and emerging technologies to enhance design processes.",
    "Conduct usability testing and gather feedback for continuous improvement of designs.",
    "Work closely with developers to implement and maintain design specifications.",
  ];
  const videoId = "nmpkmCL01m8";
  const handleJobRole = () => {
    setShowJobRole(true);
    setShowTestInfo(false);
    setShowInterview(false);
  };
  const handleTestInfo = () => {
    setShowJobRole(false);
    setShowTestInfo(true);
    setShowInterview(false);
  };
  const handleInterview = () => {
    setShowJobRole(false);
    setShowTestInfo(false);
    setShowInterview(true);
  };
  
  return (
    <div className="">
  
      <div className="mt-9 w-fit">
      <ul class="flex justify-starttext-center text-black bg-gray-100 rounded-lg p-1 px-4   ">
  <li>
    <button onClick={handleJobRole}  className={`flex justify-center py-3 px-20 rounded-lg  ${
        showJobRole ? "bg-white" : "bg-gray-100"}` }>Job Role</button>
  </li>
  <li>
    <button onClick={handleTestInfo}  className={`flex justify-center py-3 px-20 rounded-lg ${
        showTestInfo ? "bg-white" : "bg-gray-100"}`}>Test Info</button>
  </li>
  <li>
    <button onClick={handleInterview}  className={`flex justify-center py-3 px-20 rounded-lg ${
        showInterview ? "bg-white" : "bg-gray-100"}`}>Interview</button>
  </li>
  
</ul>
      </div>
      <div className="mt-9">
        {showJobRole && (
          <div>
            <div>
              <div className="font-bold text-xl pt-4 ">Job Description:</div>
              <div className="flex">
                <p>
                  We at 7 Kings Code are seeking a talented UI/UX designer part
                  time to join our dynamic team. The ideal candidate will have a
                  passion for creating visually appealing and intuitive user
                  interfaces while ensuring a seamless user experience. As a
                  UI/UX designer, you will collaborate with cross-functional
                  teams to understand user needs and business requirements,
                  translating them into elegant and effective design solutions.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-xl pt-2 ">Responsibilities:</div>
              <div className="space-y-2">
                {des.map((val, i) => {
                  return (
                    <div className="gap-3 flex items-center ">
                      <div>
                        <VscDebugBreakpointData />
                      </div>
                      <div>{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="font-bold text-xl pt-2 ">Skills:</div>
            <div className="flex gap-5 mt-2">
              {obj.Skill.map((val, i) => {
                return (
                  <div className="px-5 py-1 bg-black text-white rounded-full">
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showTestInfo && (
          <div className="pt-4">
            <div className="grid grid-cols-2 gap-5">
              <div className=" h-full">
                <div className="bg-gray-100 border border-gray-300 space-y-1 text-lg rounded-xl shadow-lg flex flex-col justify-between h-full">
                  <div className=" ">
                  <p className="font-semibold  p-2 text-xl">Questions:</p>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold">Q1:</p>
                      <p>What are the components in Figma?</p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold">Q2:</p>
                      <p>What are the variants in Figma?</p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold">Q3:</p>
                      <p>What are the components in Figma?</p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold">Q4:</p>
                      <p>What are the variants in Figma?</p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold">Q5:</p>
                      <p>What are the components in Figma?</p>
                    </div>
                  </div>
                  <div className=" px-10 py-3">
                    <button
                      className="px-3 py-1 rounded-lg bg-black text-white"
                      onClick={() => setShowAns(!showAns)}
                    >
                      View Answers
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {showAns && (
                  <div className="bg-gray-100 border border-gray-300 space-y-1 text-sm rounded-xl shadow-lg">
                    <p className="font-semibold  p-2 text-xl">Answers:</p>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold"> 1:</p>
                      <p>
                        Components in Figma are reusable design elements that
                        help maintain consistency across your design by allowing
                        you to create and reuse the same elements across
                        multiple screens or projects
                      </p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold"> 2:</p>
                      <p>
                        Variants in Figma are different states or versions of a
                        component that can be managed within a single component
                        set
                      </p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold"> 3:</p>
                      <p>
                        Components in Figma are reusable design elements that
                        help maintain consistency across your design by allowing
                        you to create and reuse the same elements across
                        multiple screens or projects
                      </p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold"> 4:</p>
                      <p>
                        Variants in Figma are different states or versions of a
                        component that can be managed within a single component
                        set
                      </p>
                    </div>
                    <div className="flex gap-2 p-2 ">
                      <p className="font-bold"> 5:</p>
                      <p>
                        Components in Figma are reusable design elements that
                        help maintain consistency across your design by allowing
                        you to create and reuse the same elements across
                        multiple screens or projects
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showInterview && (
          <div className="pt-4">
            <div>
              <div className="flex text-xl gap-2">
                Interview recording for the role of{" "}
                <p className="font-semibold">{obj.position}</p> at
                <p className="text-blue-500">{obj.comName}.</p>
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">Interview Date:</p>
                  {obj.date}
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">Interview Time:</p>
                  {obj.time}
                </div>
              </div>
            </div>
            <div className="w-full">
              <iframe
                className="w-full h-96 rounded-3xl"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="my-9">
      <a
            href="/employe/prerecordings"
            className="text-purple-500  flex items-center justify-end pr-16 gap-4"
          >
            <p className="text-2xl">
              <IoArrowBackOutline />
            </p>
            <p className="font-bold text-lg">Back to previous screen</p>
          </a>
      </div>
    </div>
  );
};

export default CandidateRecordingDetailes;
