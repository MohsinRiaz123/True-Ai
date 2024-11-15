import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
// import Progressbar from "@ramonak/react-progress-bar";

const Result = ({ responseData }) => {
  const [Response, setResponse] = useState(null);
  // const [progress, setProgress] = useState(0);
  const navigator = useNavigate();
  const goback = () => {
    navigator("/candidate");
  };
  // useEffect(() => {
  //   if (Response) {
  //     const interval = setInterval(() => {
  //       setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  //     }, 300);
  //     return () => clearInterval(interval);
  //   }
  // }, [Response]);
  useEffect(() => {
    if (responseData) {
      console.log(responseData);

      const { final_score, status } = responseData;
      setResponse(
        <div>
          <div>
            <span className="font-semibold">Score: </span>
            <p>{final_score !== undefined ? final_score : "N/A"}</p>
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            <p>{status !== undefined ? status : "N/A"}</p>
          </div>
        </div>
      );
    }
  }, [responseData]);
  return (
    <div className="text-center font-poppins">
      {Response ? Response : <Loader />}
    </div>
  );
};

export default Result;
