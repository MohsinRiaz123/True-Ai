import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";
import { useGetListOfCandidate } from "../../Services/Employee/HomePage/useGetListOfcandidate";
import useSearch from "../../Services/Employee/HomePage/useSearch";
import useFilter from "../../Services/Employee/HomePage/useFilter";
import { useSuggestions } from "../../Services/Employee/HomePage/useSuggestions";
import { ImProfile } from "react-icons/im";
import Openjob from "./Openjob";
import { useGetOpenJobs } from "../../Services/Employee/HomePage/useGetOpenJobs";
import useUploadResume from "../../Services/Employee/HomePage/useUploadResume";
const EmployerHome = () => {
  const [hovered, setHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    search: "",
    skills: "",
    Education: "",
    Experience: "",
    keyword: "",
  });
  const [triggerSearchTerm, setTriggerSearchTerm] = useState("");
  const { data, isLoading } = useGetListOfCandidate();
  const { data: Jobs, isLoading: lod } = useGetOpenJobs();
  const {
    mutate,
    isPending: ResUploading,
    isError,
    error: resError,
  } = useUploadResume();
  const { data: sugg } = useSuggestions();
  const { search, load, error } = useSearch();
  const { filter, load: loding, error: err } = useFilter();
  const [obj, setObj] = useState([]);
  const [resume, setResume] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showEducationDropdown, setShowEducationDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);

  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);

  const [skillsList, setSkillsList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([1, 2, 3, 4, 5, 6, 7]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Check each ref to see if the click was outside
    if (skillsRef.current && !skillsRef.current.contains(event.target)) {
      setShowSkillsDropdown(false);
    }
    if (educationRef.current && !educationRef.current.contains(event.target)) {
      setShowEducationDropdown(false);
    }
    if (
      experienceRef.current &&
      !experienceRef.current.contains(event.target)
    ) {
      setShowExperienceDropdown(false);
    }
  };
  useEffect(() => {
    console.log("Data received: ", data);

    if (Array.isArray(data)) {
      setObj(data);
    } else {
      console.warn("Expected data to be an array, received:", data);
    }
  }, [data]);
  // =============Suggestion==================
  useEffect(() => {
    if (sugg) {
      console.log("auto suggestion", sugg);
      if (sugg.skills) {
        setSkillsList(sugg.skills);
      }
      if (sugg.education) {
        setEducationList(sugg.education);
      }
    } else {
      console.warn("Expected data to be an array, received:", sugg);
    }
  }, [sugg]);

  const filteredSkills = skillsList.slice(0, 10).filter((val) => {
    const searchSkill = searchTerm.skills?.toLowerCase() || "";
    const skill = val.toLowerCase();
    return searchSkill && skill.includes(searchSkill);
  });
  const filteredquaification = educationList.slice(0, 10).filter((val) => {
    const searchedu = searchTerm.Education?.toLowerCase() || "";
    const edu = val.toLowerCase();
    return searchedu && edu.includes(searchedu);
  });

  // ===================================================

  // ==========================OpenJob====================

  const [openJobs, setOpenJob] = useState([]);

  useEffect(() => {
    if (Jobs) {
      console.log("openJob", Jobs);
      if (Array.isArray(Jobs)) {
        setOpenJob(Jobs);
      }
    } else {
      console.warn("Expected data to be an array in job, received:", Jobs);
    }
  }, [Jobs]);
  const handleChange = (key, value) => {
    setSearchTerm((prevValues) => {
      const newValues = {
        ...prevValues,
        [key]: value,
      };
      return newValues;
    });
  };

  // =======================Upload Resume============================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setResume(selectedFile);
  };

  const navigation = useNavigate();
  const handelContinue = async (resume) => {
    if (!resume) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume); // Use the correct field name expected by your backend

    try {
      const res = await mutate(formData); // Send FormData
      if (res) {
        console.log(res);
      } else {
        console.log("Error occurred");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const showCandidateProfile = (email) => {
    navigation("/employe/candidateProfile", { state: { value: { email } } });
  };
  const handelReset = () => {
    setSearchTerm({
      search: "",
      skills: "",
      Education: "",
      Experience: 0,
      keyword: "",
    });
  };

  const handleSearch = async () => {
    console.log("Search Term:", triggerSearchTerm);
    const updatedSearchTerm = {
      ...searchTerm,
      search: triggerSearchTerm, // Add your search input here
      // You can also update skills, education, and experience as needed
    };
    console.log("Search updated Term:", updatedSearchTerm);
    if (triggerSearchTerm) {
      try {
        const result = await search(updatedSearchTerm);
        if (result && Array.isArray(result)) {
          setObj(result);
        } else {
          console.warn("Expected data to be an array, received:", result);
          setObj([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    setTriggerSearchTerm("");
  };

  const handlefilter = async () => {
    console.log("Search Term:", searchTerm);

    if (searchTerm) {
      try {
        const result = await filter(searchTerm);
        if (result && Array.isArray(result)) {
          setObj(result);
        } else {
          console.warn("Expected data to be an array, received:", result);
          setObj([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    setSearchTerm({
      search: "",
      skills: "",
      Education: "",
      Experience: "",
      keyword: "",
    });
  };
  console.log("resume", resume);
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <div className="flex bg-gray-100 items-center rounded-2xl w-full tablet:w-4/6 laptop:w-3/6 pl-1">
          <div className="mx-3 w-[5%]">
            <RiSearch2Line />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="bg-gray-100 placeholder:text-black outline-none text-sm tablet:text-md w-full"
              placeholder="Search"
              value={triggerSearchTerm}
              onChange={(e) => setTriggerSearchTerm(e.target.value)}
            />
          </div>
          <div className="m-1 w-[40%] flex justify-end px-1">
            <button
              className="bg-custom-dark-blue text-[8px] tablet:text-[10px] 2xl:text-sm text-white p-2 rounded-xl"
              onClick={handleSearch} // Attach the search handler
              disabled={load}
            >
              Search invitations
            </button>
          </div>
        </div>
      </div>

      {/* =====================OpenJob=================== */}

      <Openjob openJobs={openJobs} setOpenJob={setOpenJob} setObj={setObj} />

      {/* ======================================================== */}

      <div className="flex flex-wrap gap-1 2xl:gap-4 items-center justify-center">
        <div
          className="flex bg-gray-100 px-2 py-1 rounded-lg justify-between"
          ref={skillsRef}
        >
          <div className="w-full">
            <input
              type="text"
              className="bg-gray-100 placeholder:text-black outline-none text-sm tablet:text-md w-full "
              placeholder="Preferred skill "
              value={searchTerm.skills}
              onChange={(e) => {
                const newValue = e.target.value;
                handleChange("skills", newValue);
                setShowSkillsDropdown(newValue.trim() !== ""); // Show dropdown if input is not empty
              }}
              onFocus={() =>
                setShowSkillsDropdown(searchTerm.skills.trim() !== "")
              }
            />
            {showSkillsDropdown && (
              <div className="absolute bg-gray-100 border-gray-300 rounded-lg w-[15%] mt-3 z-10 text-sm px-2 py-1">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((val, i) => (
                    <div
                      className="flex items-center gap-2 cursor-pointer w-full"
                      key={i}
                      onClick={() => {
                        handleChange("skills", val);
                        setShowSkillsDropdown(false);
                      }}
                    >
                      <RiSearch2Line /> <p>{val}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No Records Available</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mx-3 w-[5%] text-lg flex items-center">
            <RiSearch2Line />
          </div>
        </div>
        <div
          className="flex bg-gray-100 px-2 py-1 rounded-lg justify-between"
          ref={educationRef}
        >
          <div className="w-full">
            <input
              type="text"
              className="bg-gray-100 placeholder:text-black outline-none text-sm tablet:text-md  w-full"
              placeholder="Preferred qualification "
              value={searchTerm.Education}
              onChange={(e) => {
                const newValue = e.target.value;
                handleChange("Education", newValue);
                setShowEducationDropdown(newValue.trim() !== ""); // Show dropdown if input is not empty
              }}
              onFocus={() =>
                setShowEducationDropdown(searchTerm.Education.trim() !== "")
              }
            />
            {showEducationDropdown && (
              <div className="absolute bg-gray-100 border-gray-300 rounded-lg w-[15%] mt-3 z-10 text-sm px-2 py-1">
                {filteredquaification.length > 0 ? (
                  filteredquaification.map((val, i) => (
                    <div
                      className="flex items-center gap-2 cursor-pointer w-full"
                      key={i}
                      onClick={() => {
                        handleChange("Education", val);
                        setShowEducationDropdown(false);
                      }}
                    >
                      <RiSearch2Line /> <p>{val}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No Records Available</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mx-3 w-[5%] text-lg flex items-center">
            <RiSearch2Line />
          </div>
        </div>
        <div
          className="flex bg-gray-100 px-2 py-1 rounded-lg justify-between"
          ref={experienceRef}
        >
          <div className="w-full">
            <input
              type="number"
              className="bg-gray-100 placeholder:text-black outline-none text-sm tablet:text-md w-full "
              placeholder="Preferred experience "
              value={searchTerm.Experience}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                handleChange("Experience", newValue);
                setShowExperienceDropdown(newValue.trim() !== 0); // Show dropdown if input is not empty
              }}
              onFocus={() =>
                setShowExperienceDropdown(searchTerm.Experience.trim() !== "")
              }
            />
            {showExperienceDropdown && (
              <div className="absolute bg-gray-100 border-gray-300 rounded-lg w-[15%] mt-3 z-10 text-sm px-2 py-1">
                {experienceList.length > 0 ? (
                  experienceList.map((val, i) => (
                    <div
                      className="flex items-center gap-2 cursor-pointer  "
                      key={i}
                      onClick={() => {
                        setShowExperienceDropdown(false);
                        handleChange("Experience", val);
                      }} // Ensure this is set correctly
                    >
                      <RiSearch2Line /> <p>{val} year</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No Records Available</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mx-3 w-[5%] text-lg flex items-center">
            <RiSearch2Line />
          </div>
        </div>
        <div className="flex bg-gray-100 px-2 py-1 rounded-lg justify-between">
          <div className="w-full">
            <input
              type="text"
              className="bg-gray-100 placeholder:text-black outline-none text-sm tablet:text-md w-full "
              placeholder="Type keyword"
              value={searchTerm.keyword}
              onChange={(e) => handleChange("keyword", e.target.value)}
            />
          </div>
          <div className="mx-3 w-[5%] text-lg flex items-center">
            <RiSearch2Line />
          </div>
        </div>
        <div className="relative inline-block">
          <button
            className="bg-black text-white p-2 rounded-lg w-8"
            onClick={() => handelReset()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <GrPowerReset />
          </button>
          {hovered && (
            <div className="absolute bottom-full mb-1  text-xs rounded p-1">
              Reset
            </div>
          )}
        </div>
        <div>
          <button
            className="bg-black text-white p-2 rounded-lg text-xs "
            onClick={handlefilter}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="flex flex-col tablet:flex-row gap-1 text-sm tablet:text-lg items-center justify-center">
        <button
          className="text-pink-500 font-semibold "
          onClick={() => {
            setShowResumePopup(true);
            setResume(null);
          }}
        >
          Upload a Candidate’s resume
        </button>
        {showResumePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="flex bg-white px-3 py-3 w-[60%] laptop:w-[30%] flex-col rounded-2xl space-y-10">
              <div className="text-xl font-bold text-[#8E01FF] flex justify-center flex-col  ">
                <div className="flex justify-end">
                  <p
                    className="text-white text-lg bg-black p-2 w-8 rounded-lg flex items-center cursor-pointer "
                    onClick={() => setShowResumePopup(false)}
                  >
                    <RxCross1 />
                  </p>
                </div>
                <p className="flex justify-center"> Upload a Resume</p>
              </div>
              <div className="space-y-3  ">
                <div className="flex  justify-center">
                  <img
                    src="../../src/assets/Images/pdf.png"
                    alt="Resume Image"
                    className="w-16"
                  />
                </div>
                <div className="flex justify-center">
                  <label
                    className={ "cursor-pointer flex justify-center"}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span
                      className={
                        "w-20 laptop:w-[115px] text-[#8E01FF] border-0 :bg-white font-semibold"
                      }
                    >
                      Upload PDF
                    </span>
                  </label>
                </div>
              </div>
              {resume && (
                <p className="flex items-center justify-center mt-2 text-md">
                  {resume.name}
                </p>
              )}
              {isError && (
                <p className="flex items-center justify-center mt-2 text-sm text-red-500">
                  {resError}
                </p>
              )}
              <div className="flex justify-center">
                <button
                  className={`rounded-full text-white font-semibold px-5 py-2 mb-10 ${
                    ResUploading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
                  }`}
                  onClick={() => handelContinue(resume)}
                  disabled={ResUploading}
                >
                  {ResUploading ? "Uploading..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
        <p className="  ">and let the TrueAI do the rest</p>
      </div>

      <p className="text-sm tablet:text-2xl font-bold">
        Suggestions based on your preferences
      </p>
      {isLoading ||
        (load && (
          <div className="flex justify-center items-center">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-400 border-8 h-44 w-44"></div>
          </div>
        ))}
      <div className="space-y-5">
        {obj.length > 0 ? (
          obj.map((val, i) => {
            return (
              <div
                className="w-full flex bg-gray-100 border border-gray-300 rounded-xl shadow-lg cursor-pointer "
                onClick={() => showCandidateProfile(val.email)}
              >
                <div className="w-[0%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 laptop:mx-2 ">
                  <img
                    src={val.image}
                    alt=""
                    className="2xl:p-4 w-full  h-[90px] 2xl:h-[125px] object-fill rounded-full "
                  />
                </div>
                <div className="flex-col w-[80%] px-3 py-3 space-y-1">
                  <div className="   text-xs tablet:text-sm laptop:text-lg font-bold w-full ">
                    {val.first_name} {val.last_name}
                  </div>
                  <div className="text-xs laptop:text-sm font-semibold">
                    <p>{val.designation}</p>
                  </div>
                  <div className="text-[9px] tablet:text-xs ">
                    <p>{val.summary}</p>
                  </div>
                  <div className="flex gap-1 text-[10px] tablet:text-sm">
                    <p className="font-semibold">Skills:</p>
                    <p>{val.skills}</p>
                  </div>
                </div>
                <div className=" flex items-center justify-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md">
                  <div className="flex flex-col justify-between px-2 py-4 h-full">
                    <div>
                      <p className="text-sm tablet:text-lg font-bold text-pink-400">
                        {val.match}match
                      </p>
                    </div>
                    <div className="flex z-10">
                      <div className=" flex space-x-0 tablet:space-x-1 laptop:space-x-2 ">
                        <div className="bg-black rounded-sm p-1">
                          {val.portfolio_link ? (
                            <a
                              href={val.portfolio_link}
                              className="text-2xl text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ImProfile />
                            </a>
                          ) : (
                            <span className="text-2xl text-white cursor-not-allowed">
                              <ImProfile />
                            </span>
                          )}
                        </div>
                        <div>
                          {val.github_link ? (
                            <a
                              href={val.github_link}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src="/src/assets/Images/github.png"
                                alt="GitHub"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-400 cursor-not-allowed">
                              <img
                                src="/src/assets/Images/github.png"
                                alt="GitHub"
                              />
                            </span>
                          )}
                        </div>
                        <div>
                          {val.linkedin_link ? (
                            <a
                              href={val.linkedin_link}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src="/src/assets/Images/linkedin.png"
                                alt="LinkedIn"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-400 cursor-not-allowed">
                              <img
                                src="/src/assets/Images/linkedin.png"
                                alt="LinkedIn"
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No Records Available
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerHome;
