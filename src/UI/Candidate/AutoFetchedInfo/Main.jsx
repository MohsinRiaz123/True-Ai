import React, { useState, useEffect } from "react";
import Experience from "./Experience";
import Education from "./Education";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetResumeData } from "../../../Services/Candidate/CandidateProfile/useGetResumeData";
import useSubmitResumaData from "../../../Services/Candidate/CandidateProfile/useSubmitResumaData";

const Main = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [discription, setdiscription] = useState("");

  const handleChange = (event) => {
    setdiscription(event.target.value);
  };
  const completeData = {
    Summary: discription,
    Education: educationList,
    experience: experienceList,
  };
  const { data: d, isLoding: load } = useGetResumeData();
  const { mutate, isPending, isError } = useSubmitResumaData();
  const navigate = useNavigate();

  const completeProfile = async () => {
    try {
      await mutate(completeData);
    } catch (error) {
      console.error("Error submitting Resuma Data:");
    }
  };

  const backPage = () => {
    navigate("/candidateInfo/additional");
  };
  if (load) {
    return (
      <div className="flex justify-center items-center">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-400 border-8 h-44 w-44"></div>
      </div>
    );
  }
  useEffect(() => {
    if (d) {
      console.log("Geted data", d);
      setdiscription(d.Summary);
      setExperienceList(d.experience);
      setEducationList(d.Education);
    }
  }, [d]);
  console.log("data", completeData);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl font-bold">Candidate Information</p>
        <p className="text-lg">
          Please make sure the information shown here is correct.
        </p>
      </div>
      <div className="w-full">
        <p className="text-xl px-3 font-semibold">Description</p>
        <textarea
          className="border border-gray-500 min-h-[150px] rounded-2xl w-full  p-2 my-2 outline-none text-sm"
          placeholder="Lorem ipsum is a dummy text/............"
          value={discription}
          onChange={handleChange}
        ></textarea>
      </div>
      <Experience
        experienceList={experienceList}
        setExperienceList={setExperienceList}
      />
      <Education
        educationList={educationList}
        setEducationList={setEducationList}
      />
      <p className="text-red-500">{isError ? "Error in uploading data" : ""}</p>
      <div className="flex justify-between items-center py-3 mt-20">
        <button className="gap-2 flex items-center text-lg" onClick={backPage}>
          <p>
            <MdOutlineArrowBackIos />
          </p>
          <p>Previous</p>
        </button>
        <button
          className={`bg-LoginBtn bg-center bg-cover text-white px-4 py-1 rounded-full text-lg ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={completeProfile}
          disabled={isPending}
        >
          {isPending ? "Uploading..." : "Complete Profile"}
        </button>
      </div>
    </div>
  );
};

export default Main;
