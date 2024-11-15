import React, { useState } from "react";
import Subtitles from "./Subtitles";
import ChatControlls from "./ChatControlls";
import Chat from "./Chat";
import { chatContext } from "../../context/technicalContext";
import Result from "./Result";

const ChatMain = ({
  text,
  streamRef,
  myvoice,
  ques,
  isshowTechnical,
  startRecognition,
  stopRecognition,
  stopRecording,
  handleDownload,
  timerKey,
  duration,
  setText,
  previewStream,
  setSide,
  status,
  handleCamera,
  responseData,
}) => {
  const [isResult, setIsResult] = useState(false);
  console.log(Boolean(responseData), "jutt");
  return (
    <div>
      <div className="">
        <Subtitles myvoice={myvoice} text={text} />
        {/* {status} */}
        <ChatControlls
          previewStream={previewStream}
          status={status}
          startRecognition={startRecognition}
          stopRecognition={stopRecognition}
          stopRecording={stopRecording}
          handleDownload={handleDownload}
          setText={setText}
          setSide={setSide}
          streamRef={streamRef}
          handleCamera={handleCamera}
          setIsResult={setIsResult}
          responseData={responseData}
        />
        {isshowTechnical && (
          <Chat timerKey={timerKey} duration={duration} ques={ques} />
        )}
      </div>

      {isResult && responseData && <Result responseData={responseData} />}
    </div>
  );
};

export default ChatMain;
