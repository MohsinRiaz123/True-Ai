import React, { useEffect, useState, useContext } from "react";
import { chatContext } from "../../context/technicalContext";
import CountDown from "./CountDown";

const Chat = ({ timerKey, duration, ques }) => {
  // const textAreaValue = useContext(chatContext)

  const [textAreaValue, setTextAreaValue] = useState("");
  console.log(textAreaValue);
  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };
  useEffect(() => {
    setTextAreaValue("");
  }, [ques]);
  return (
    <div className="z-40">
      <div className="bg-[#01011f] h-[40vh] flex justify-center items-center ">
        <div className="border-2 border-gray-500 w-[95%] lg:w-[95%] h-[80%] rounded-lg">
          <div className="py-2 text-white px-4 space-y-2">
            <div className="flex justify-between w-full">
              <h3 className="text-base md:text-lg lg:text-xl font-poppins">
                TECHNICAL QUESTION
              </h3>
              <h4 className="text-base md:text-lg lg:text-xl flex gap-2">
                Time remaining:
                <span>
                  <CountDown key={timerKey} duration={duration} />
                </span>
              </h4>
            </div>
            <div>
              <p className="text-white text-center lg:text-left">{ques}</p>
            </div>
          </div>

          <textarea
            rows={4}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            className="bg-[#01011f] pt-2 text-white resize-none border-none h-[40%] w-[95%] outline-none mx-4 md:mx-6 lg:mx-8"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Chat;
