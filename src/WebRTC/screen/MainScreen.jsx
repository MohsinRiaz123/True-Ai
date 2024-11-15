import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import CandidateDashboard from "../component/CandidateDashboard";

const MainScreen = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const navigate = useNavigate();
  const handleComponent = () => {
    try {
      setHideButton(true);
      setShowComponent(true);
      navigate("/preinterview");
    } catch (error) {
      console.log("Error in recording");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen">
        {!hideButton && (
          <button
            className="bg-black text-white p-4 rounded-md font-poppins"
            onClick={handleComponent}
          >
            Start Interview
          </button>
        )}
        <div>{showComponent && <CandidateDashboard />}</div>
      </div>
    </div>
  );
};

export default MainScreen;
