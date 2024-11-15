import React, { useState, useEffect } from "react";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useSubmitPreInterview from "../../Services/Employee/CreatePre_Interview/useSubmitPreInterview";
import useGetQuestions from "../../Services/Employee/CreatePre_Interview/useGetQuestions";
const CreatePreInterview = () => {
  const location = useLocation();
  const { detail } = location.state?.value || {};

  const [obj, setObj] = useState({});
  const [formError, setFormError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [personalQuestions, setPersonalQuestions] = useState([]);
  const [newPersonalQuestion, setNewPersonalQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [technicalQuestions, setTechnicalQuestions] = useState([]);

  const [selectedTechnicalQuestions, setSelectedTechnicalQuestions] = useState(
    []
  );
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newTechnicalQuestion, setNewTechnicalQuestion] = useState("");

  const MAX_SELECTED_QUESTIONS = 5;
  const MAX_TECHNICAL_QUESTIONS = 3;
  const MAX_PERSONAL_QUESTIONS = 3;
  const [skills, setSkills] = useState([]);
  const [interviewData, setInterviewData] = useState({
    interview_type: "Pre Interview",
    candidate_email: "",
    job_role: "",
    job_type: "",
    salary: "",
    salaryFrequency: "",
    location: "",
    job_description: "",
    job_responsibilties: "",
    skill_test_level: "",
    selected_skill_for_interview: "",
    selected_questions_for_interview: {
      SimpleQuestions: selectedQuestions || [], // Ensure this is initialized as an array
      TechnicalQuestions: selectedTechnicalQuestions || [], // Ensure this is initialized as an array
    },
    personal_question_for_candidate: personalQuestions,
    expiry_date: "",
    expiry_time: "",
  });

  const validateInterviewData = (data) => {
    const requiredFields = [
      "candidate_email",
      "job_role",
      "job_type",
      "salary",
      "salaryFrequency",
      "location",
      "job_description",
      "job_responsibilties",
      "skill_test_level",
      "selected_skill_for_interview",
      "expiry_date",
      "expiry_time",
    ];

    for (const field of requiredFields) {
      const value = data[field];

      // Check if value is a string and trim it, otherwise check if it's empty
      if (typeof value !== "string" || value.trim() === "") {
        return `${field.replace(/_/g, " ")} is required.`;
      }
    }

    // If selected_questions_for_interview contains empty arrays, return a message
    const { SimpleQuestions, TechnicalQuestions } =
      data.selected_questions_for_interview;

    if (!Array.isArray(SimpleQuestions) || !SimpleQuestions.length) {
      return "At least one Simple Question is required.";
    }
    if (!Array.isArray(TechnicalQuestions) || !TechnicalQuestions.length) {
      return "At least one Technical Question is required.";
    }
    const timeFormat = /^\d{2}:\d{2}$/; // 24-hour format
    if (!timeFormat.test(data.expiry_time)) {
      return "Expiry time must be in HH:MM format.";
    }

    const expiryDate = new Date(data.expiry_date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight for comparison

    if (expiryDate <= currentDate) {
      return "Expiry date must be a future date.";
    }

    return null; // Return null if validation passes
  };
  const resetForm = () => {
    setInterviewData({
      interview_type: "Pre Interview",
      candidate_email: "",
      job_role: "",
      job_type: "",
      salary: "",
      salaryFrequency: "",
      location: "",
      job_description: "",
      job_responsibilties: "",
      skill_test_level: "",
      selected_skill_for_interview: "",
      selected_questions_for_interview: {
        SimpleQuestions: [],
        TechnicalQuestions: [],
      },
      personal_question_for_candidate: [],
      expiry_date: "",
      expiry_time: "",
    });
    setSelectedQuestions([]);
    setSelectedTechnicalQuestions([]);
  };

  const {
    mutate: sendRequest,
    isPending,
    isError,
    error,
  } = useSubmitPreInterview();
  const { getData, error: err, isLoading: Qloading, data } = useGetQuestions();

  useEffect(() => {
    if (interviewData) {
      setFormError("");
    }
  }, [interviewData]);
  useEffect(() => {
    if (detail) {
      console.log("detail", detail.skill);
      setObj(detail);
      setSkills(detail.skill);
      setInterviewData({
        ...interviewData,
        candidate_email: detail.email,
      });
    }
  }, [detail]);
  useEffect(() => {
    setInterviewData((prevState) => ({
      ...prevState,
      selected_questions_for_interview: {
        SimpleQuestions: selectedQuestions,
        TechnicalQuestions: selectedTechnicalQuestions,
      },
      personal_question_for_candidate: personalQuestions,
    }));
  }, [selectedQuestions, selectedTechnicalQuestions, personalQuestions]);

  const handleSelectQuestion = (question) => {
    if (selectedQuestions.length >= MAX_SELECTED_QUESTIONS) {
      alert(`You can only select up to ${MAX_SELECTED_QUESTIONS} questions.`);
      return;
    }

    if (!selectedQuestions.some((q) => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
      setQuestions(questions.filter((q) => q.id !== question.id));
    }
  };

  const handleTechnicalSelectQuestion = (question) => {
    if (selectedTechnicalQuestions.length >= MAX_TECHNICAL_QUESTIONS) {
      alert(
        `You can only select up to ${MAX_TECHNICAL_QUESTIONS} technical questions.`
      );
      return;
    }

    if (!selectedTechnicalQuestions.some((q) => q.id === question.id)) {
      setSelectedTechnicalQuestions([...selectedTechnicalQuestions, question]);
      setTechnicalQuestions(
        technicalQuestions.filter((q) => q.id !== question.id)
      );
    }
  };

  const handleDeselectQuestion = (question) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== question.id));
    setQuestions([...questions, question]);
  };

  const handleDeselectTechnicalQuestion = (question) => {
    setSelectedTechnicalQuestions(
      selectedTechnicalQuestions.filter((q) => q.id !== question.id)
    );
    setTechnicalQuestions([...technicalQuestions, question]);
  };

  const handleAddNewQuestion = () => {
    if (newQuestion.trim() === "") return;

    const newQuestionObj = { id: Date.now(), question: newQuestion.trim() };

    if (selectedQuestions.length >= MAX_SELECTED_QUESTIONS) {
      alert(`You can only select up to ${MAX_SELECTED_QUESTIONS} questions.`);
      return;
    }

    setSelectedQuestions([...selectedQuestions, newQuestionObj]);
    setNewQuestion(""); // Clear input
  };

  const handleAddNewTechnicalQuestion = () => {
    if (newTechnicalQuestion.trim() === "") return;

    const newTechnicalQuestionObj = {
      id: Date.now(),
      question: newTechnicalQuestion.trim(),
    };

    if (selectedTechnicalQuestions.length >= MAX_TECHNICAL_QUESTIONS) {
      alert(
        `You can only select up to ${MAX_TECHNICAL_QUESTIONS} technical questions.`
      );
      return;
    }

    setSelectedTechnicalQuestions([
      ...selectedTechnicalQuestions,
      newTechnicalQuestionObj,
    ]);
    setNewTechnicalQuestion(""); // Clear input
  };

  const handleAddPersonalQuestion = () => {
    if (newPersonalQuestion.trim() === "") return;

    if (personalQuestions.length >= MAX_PERSONAL_QUESTIONS) {
      alert(
        `You can only add up to ${MAX_PERSONAL_QUESTIONS} personal questions.`
      );
      return;
    }

    const newPersonalQuestionObj = {
      id: Date.now(),
      question: newPersonalQuestion.trim(),
    };

    setPersonalQuestions([...personalQuestions, newPersonalQuestionObj]);
    setNewPersonalQuestion(""); // Clear input
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();

  const handleRecordings = () => {
    navigate("/employe/prerecordings");
  };

  const handleInputChange = (key) => (event) => {
    setInterviewData({
      ...interviewData,
      [key]: event.target.value,
    });
  };
  const handleSkillLevelChange = (event) => {
    setInterviewData({
      ...interviewData,
      skill_test_level: event.target.value,
    });
  };
  const handleSkillChange = (skillName) => {
    setInterviewData((prevState) => {
      const selectedSkills = prevState.selected_skill_for_interview
        ? prevState.selected_skill_for_interview
            .split(",")
            .map((skill) => skill.trim())
        : [];

      const updatedSkillsSet = new Set(selectedSkills);

      if (updatedSkillsSet.has(skillName)) {
        updatedSkillsSet.delete(skillName);
      } else {
        updatedSkillsSet.add(skillName);
      }

      return {
        ...prevState,
        selected_skill_for_interview: Array.from(updatedSkillsSet).join(", "),
      };
    });
  };

  const handleSendRequest = async () => {
    const validationError = validateInterviewData(interviewData);

    if (validationError) {
      setFormError(validationError); // Display the error message
      return; // Prevent the request from being sent
    }

    const payload = {
      ...interviewData,
      selected_questions_for_interview: JSON.stringify(
        interviewData.selected_questions_for_interview
      ),
      personal_question_for_candidate: JSON.stringify(
        interviewData.personal_question_for_candidate
      ),
    };
    try {
      const isDone = await sendRequest(payload);
      console.log("Submission response:", isDone);
      if (isDone) {
        // Ensure res has a value indicating success
        setShowPopup(true); // Show the popup
        resetForm(); // Reset the form
      }
    } catch (error) {
      console.log("Error in sending preinterview request:", error);
    }
  };
  // ++++++++++++++++++++++Quwestion Genration+++++++++++++++++++++++++++?

  const updateQuestions = (
    questionsArray,
    setQuestionsFunction,
    questionsName
  ) => {
    const randomId = () => Math.floor(Math.random() * 100) + 1;
    if (Array.isArray(questionsArray)) {
      const updatedQuestions = questionsArray.map((question) => ({
        ...question,
        id: randomId(),
      }));
      setQuestionsFunction(updatedQuestions);
      console.log(`${questionsName} are`, updatedQuestions);
    } else {
      console.error(`${questionsName} is not an array:`, questionsArray);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (
        !interviewData.selected_skill_for_interview ||
        !interviewData.skill_test_level
      ) {
        console.warn("Missing skill or test level data.");
        return; // Early return if data is missing
      }

      const formData = {
        topic: JSON.stringify(interviewData.selected_skill_for_interview),
        medium: interviewData.skill_test_level,
      };

      try {
        console.log("Calling getData with:", formData);
        const res = await getData(formData);
        setTriggerFetch(false);

        // Update SimpleQuestions and TechnicalQuestions
        updateQuestions(res.SimpleQuestions, setQuestions, "SimpleQuestions");
        updateQuestions(
          res.TechnicalQuestions,
          setTechnicalQuestions,
          "TechnicalQuestions"
        );
      } catch (err) {
        setTriggerFetch(false);
        console.error("API call failed:", err);
      }
    };

    // Fetch data if either condition is met
    if (
      (interviewData.selected_skill_for_interview &&
        interviewData.skill_test_level) ||
      triggerFetch
    ) {
      fetchData();
    }
  }, [
    interviewData.selected_skill_for_interview,
    interviewData.skill_test_level,
    triggerFetch,
  ]);

  // +++++++++++++++++++++++++++++++++++++++++++++++++?
  const handleGenrateMore = () => {
    setTriggerFetch(true);
  };

  return (
    <div className="space-y-5">
      <div className="w-full flex">
        <div className="w-[10%] tablet:w-[10%] flex items-center justify-center rounded-full mx-0 tablet:mx-2 ">
          <img
            src={obj.img}
            alt=""
            className=" w-full h-[100px] 2xl:h-[125px]   object-fill rounded-full "
          />
        </div>
        <div className="flex-col w-[80%] px-3 py-3 space-y-1">
          <div className="   text-lg tablet:text-xl laptop:text-2xl font-bold flex gap-2  ">
            <p>{obj.fname}</p>
            <p>{obj.lname}</p>
          </div>

          <div className="text-md laptop:text-lg font-semibold">
            <p>{obj.position}</p>
          </div>
          <div>
            <button
              className="bg-black px-2 py-1 text-white rounded-lg text-lg"
              onClick={() => handleRecordings()}
            >
              Proceed with pre-recorded interviews
            </button>
          </div>
        </div>
        <div className=" flex items-center  w-[25%]  text-[6px] tablet:text-[12px] laptop:text-md ">
          <div className="flex flex-col justify-around px-2 py-4 h-full items-end space-y-3">
            <div>
              <p className="text-xl font-bold text-pink-400">
                {obj.match}match
              </p>
            </div>
            <div className="">
              <a className="gap-3 flex text-xl  items-center">
                <PiPaperPlaneTiltLight />
                <p className="font-semibold">Share profile</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <form className="space-y-7 py-7">
          <div className="flex flex-col space-y-2">
            <label className="text-2xl font-bold">
              {" "}
              Preparing interview for the role:
            </label>
            <input
              type="text"
              placeholder="Designation"
              className="px-3 py-2 bg-gray-100 border border-gray-300 text-black placeholder:text-gray-400 rounded-lg w-fit outline-none"
              value={interviewData.job_role}
              onChange={handleInputChange("job_role")}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-2xl font-bold"> Job Details:</label>
            <div className="flex items-center gap-3">
              <p className="text-purple-400 text-2xl ">
                <IoBagCheckOutline />
              </p>
              <div className="px-3 py-1 bg-gray-100 border border-gray-300 text-black placeholder:text-black rounded-lg  outline-none  ">
                <select
                  className="bg-gray-100 outline-none bg-none  "
                  value={interviewData.job_type}
                  onChange={handleInputChange("job_type")}
                >
                  <option value="" disabled className="text-gray-400 px-3">
                    Select an option
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-purple-400 text-2xl ">
                <LuBadgeDollarSign />
              </p>
              <div className="flex  ">
                <input
                  type="number"
                  placeholder="$3500"
                  className="px-3 py-1 bg-gray-100 border border-gray-300 text-black placeholder:text-gray-400   outline-none  w-[30%] rounded-l-lg "
                  value={interviewData.salary}
                  onChange={handleInputChange("salary")}
                />
                <select
                  className="bg-gray-100 border border-gray-300 px-2 rounded-r-lg outline-none"
                  value={interviewData.salaryFrequency}
                  onChange={handleInputChange("salaryFrequency")}
                >
                  <option value="" disabled className="text-gray-400 px-3">
                    Select an option
                  </option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-purple-400 text-2xl ">
                <SlLocationPin />
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Location"
                  className="px-3 py-1 bg-gray-100 border border-gray-300 text-black placeholder:text-gray-400 rounded-lg  outline-none"
                  value={interviewData.location}
                  onChange={handleInputChange("location")}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold"> Job Description:</label>
            <div className="py-2 text-black placeholder:text-black     ">
              <textarea
                type="textarea"
                className="bg-gray-100 border border-gray-300 shadow-lg rounded-xl w-full outline-none px-4 py-2 min-h-[300px] text-black "
                value={interviewData.job_description}
                onChange={handleInputChange("job_description")}
              />
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">Responsibilities:</label>
            <div className="py-2 text-black placeholder:text-black     ">
              <textarea
                type="textarea"
                className="bg-gray-100 border border-gray-300 shadow-lg rounded-xl w-full outline-none px-4 py-2 min-h-[300px] text-black  "
                value={interviewData.job_responsibilties}
                onChange={handleInputChange("job_responsibilties")}
              />
            </div>
          </div>
          <div className="space-y-3 ">
            <p className="text-2xl font-bold">Choose the skill test level</p>
            <div className="text-lg flex justify-around bg-gray-100 border border-gray-300 px-8 py-4  w-[50%] rounded-xl shadow-lg ">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="skills"
                  id="easy"
                  value="Easy"
                  onChange={handleSkillLevelChange}
                />
                <lable for="easy" className="font font-semibold">
                  Easy
                </lable>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="skills"
                  id="medium"
                  value="medium"
                  onChange={handleSkillLevelChange}
                />
                <lable for="medium" className="font font-semibold">
                  Medium
                </lable>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="skills"
                  id="hard"
                  value="hard"
                  onChange={handleSkillLevelChange}
                />
                <lable for="hard" className="font font-semibold">
                  Hard
                </lable>
              </div>
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">
              Select the skills in which you want TrueAi to generate questions
              for interview:
            </label>
            <div className="flex gap-10 py-2">
              {skills.map((skill, i) => (
                <div className="flex items-center bg-gray-300 px-3 py-2 rounded-xl gap-5">
                  <label>{skill}</label>
                  <input
                    type="checkbox"
                    checked={interviewData.selected_skill_for_interview.includes(
                      skill
                    )}
                    onChange={() => handleSkillChange(skill)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-2xl font-bold">
              Following are a few questions generated for the above selected
              skills:
            </label>
            <div className="grid grid-cols-2 gap-5">
              <div className="h-full">
                <div className="bg-gray-100 border border-gray-300 space-y-1 text-lg rounded-xl shadow-lg h-full flex flex-col justify-between ">
                  <p className="font-semibold p-2 text-xl">
                    Please select five questions you want TrueAi to ask the
                    candidate you are interviewing:
                  </p>
                  <div className="p-2">
                    <p className="font-semibold ">Simple Questions:</p>
                    {questions.map((question) => (
                      <div key={question.id} className="flex gap-2 p-2">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.some(
                            (q) => q.id === question.id
                          )}
                          onChange={() => handleSelectQuestion(question)}
                        />
                        <p className="font-bold flex items-center">{`Q:`}</p>
                        <p>{question.question}</p>
                      </div>
                    ))}
                    <div className="flex gap-5 px-5 py-3">
                      <input
                        type="text"
                        placeholder="Live Test:"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="px-5 py-2 placeholder:text-gray-500 bg-gray-100 border border-gray-300 w-full rounded-xl shadow-lg outline-none"
                      />
                      <button
                        type="button"
                        className="p-3 bg-black text-white rounded-xl text-2xl shadow-lg"
                        onClick={handleAddNewQuestion}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center py-5">
                    <span className="border border-b-2 border-gray-300 w-[80%]"></span>
                  </div>
                  <div className="p-2">
                    <p className="font-semibold "> Technical Questions:</p>
                    {technicalQuestions.map((question) => (
                      <div key={question.id} className="flex gap-2 p-2">
                        <input
                          type="checkbox"
                          checked={selectedTechnicalQuestions.some(
                            (q) => q.id === question.id
                          )}
                          onChange={() =>
                            handleTechnicalSelectQuestion(question)
                          }
                        />
                        <p className="font-bold flex items-center ">{`Q:`}</p>
                        <p>{question.question}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-10 py-3">
                    <button
                      className={`px-3 py-1 rounded-lg bg-black text-white ${
                        triggerFetch
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black"
                      }`}
                      onClick={handleGenrateMore}
                      disabled={triggerFetch}
                      type="button"
                    >
                      {triggerFetch ? "Genrating...." : "Generate more"}
                    </button>
                  </div>
                  {err ? (
                    <p className="text-red-500 text-sm text-center">
                      Error occure during question genration. Try again
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="flex gap-5 px-5 pb-3">
                    <input
                      type="text"
                      placeholder="Live Test:"
                      value={newTechnicalQuestion}
                      onChange={(e) => setNewTechnicalQuestion(e.target.value)}
                      className="px-5 py-2 placeholder:text-gray-500 bg-gray-100 border border-gray-300 w-full rounded-xl shadow-lg outline-none"
                    />
                    <button
                      type="button"
                      className="p-3 bg-black text-white rounded-xl text-2xl shadow-lg"
                      onClick={handleAddNewTechnicalQuestion}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="h-full">
                  <div className="bg-gray-100 border border-gray-300 space-y-1 text-lg rounded-xl shadow-lg h-full flex flex-col justify-between">
                    <div className=" h-full">
                      <p className="font-semibold px-20 py-2 text-xl">
                        Selected Questions
                      </p>
                      <div className="flex flex-col justify-between h-full">
                        <div className="">
                          <div className="p-2">
                            <p className="font-semibold ">Simple Questions:</p>
                            {selectedQuestions.map((question) => (
                              <div key={question.id} className="flex gap-2 p-2">
                                <button
                                  className="text-xl"
                                  onClick={() =>
                                    handleDeselectQuestion(question)
                                  }
                                >
                                  <RiDeleteBinLine />
                                </button>
                                <p className="font-bold flex items-center">{`Q:`}</p>
                                <p>{question.question}</p>
                              </div>
                            ))}

                            <div className="flex justify-center py-5">
                              <span className="border border-b-2 border-gray-300 w-[80%]"></span>
                            </div>
                            <div className="p-2">
                              <p className="font-semibold ">
                                {" "}
                                Technical Questions:
                              </p>
                              {selectedTechnicalQuestions.map((question) => (
                                <div
                                  key={question.id}
                                  className="flex gap-2 p-2"
                                >
                                  <button
                                    className="text-xl"
                                    onClick={() =>
                                      handleDeselectTechnicalQuestion(question)
                                    }
                                  >
                                    <RiDeleteBinLine />
                                  </button>
                                  <p className="font-bold flex items-center">{`Q:`}</p>
                                  <p>{question.question}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">
                Add a personal question you would like TrueAi to ask Michael
              </p>
              <p className="text-lg font-semibold">
                You can add up to 3 additional questions.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="Type your question:"
                  value={newPersonalQuestion}
                  onChange={(e) => setNewPersonalQuestion(e.target.value)}
                  className="px-5 py-2 placeholder:text-gray-500 bg-gray-100 border border-gray-300 w-full rounded-xl shadow-lg  outline-none"
                />
                <button
                  type="button"
                  className="p-3 bg-black text-white rounded-xl text-2xl shadow-lg"
                  onClick={handleAddPersonalQuestion}
                >
                  <FaPlus />
                </button>
              </div>
              {personalQuestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Added Questions:</p>
                  {personalQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="flex gap-2 p-2 bg-gray-100 rounded-lg"
                    >
                      <p className="font-bold">{`Q:`}</p>
                      <p>{question.question}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col laptop:flex-row items-center space-y-4 laptop:space-y-0 laptop:space-x-4">
            <div className=" space-y-2 w-[20%]">
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                className=" p-2 rounded-lg shadow-lg shadow-gray-300 w-full outline-none text-black bg-gray-100 border border-gray-300"
                value={interviewData.expiry_date}
                onChange={handleInputChange("expiry_date")}
              />
            </div>
            <div className="space-y-2 w-[20%]">
              <label className="block text-sm font-medium text-gray-700">
                Expiry Time
              </label>
              <input
                type="time"
                className="bg-gray-100 border border-gray-300 p-2 rounded-lg shadow-lg shadow-gray-300 w-full outline-none text-black"
                value={interviewData.expiry_time}
                onChange={handleInputChange("expiry_time")}
              />
            </div>
          </div>
          {formError ? (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          ) : (
            ""
          )}
          {error ? (
            <p className="text-red-500 text-sm text-center">
              Error in Schedule pre Interview request{" "}
            </p>
          ) : (
            ""
          )}
          <div className="flex justify-between py-5">
            <button
              className={`${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } bg-LoginBtn px-10 py-3 bg-center bg-cover text-white rounded-full `}
              type="button"
              onClick={handleSendRequest}
              disabled={isPending}
            >
              {isPending ? "Sending ..." : "Send a pre-interview invite"}
            </button>
            {showPopup && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-30 flex items-center justify-center">
                <div className="w-[25%] bg-custom-dark-blue p-3 rounded-xl space-y-5">
                  <div className=" flex justify-end">
                    <button
                      className=" font-bold p-2 rounded-lg bg-gray-500 text-black w-8 flex items-center justify-center"
                      type="button"
                      onClick={() => handleCancel()}
                    >
                      <ImCross />
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="/src/assets/Images/mail.png"
                      className="w-28 "
                    ></img>
                  </div>
                  <div className="flex items-center justify-center text-white py-3">
                    <p>The invitation was successfully sent.</p>
                  </div>
                </div>
              </div>
            )}
            <div className="  text-purple-600 text-lg font-semibold">
              <a href="Home" className="flex items-center gap-3">
                <FaArrowLeft />
                Back to home
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePreInterview;
