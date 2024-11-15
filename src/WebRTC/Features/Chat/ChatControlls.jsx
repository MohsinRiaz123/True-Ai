import React, { useState, useContext, useRef, useEffect } from "react";
import { MdOutlineCallEnd } from "react-icons/md";
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { CiVideoOn, CiVideoOff } from "react-icons/ci";
import { HiOutlineRefresh } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { textContext } from "../../context/textContext";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Result from "./Result";

const ChatControlls = ({
  startRecognition,
  streamRef,
  stopRecognition,
  stopRecording,
  handleDownload,
  setText,
  setSide,
  status,
  setIsResult,
  responseData,
}) => {
  const [isVideo, setIsVideo] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const text = useContext(textContext);
  const videoRef = useRef(null);

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  const handleCameraToggle = () => {
    setIsVideo((prevState) => !prevState); // Toggle between true and false
  };

  // const handleCamera = () => {
  //   setIsVideo((prevState) => {
  //     if (prevState && streamRef.current) {
  //       console.log("Stopping video");
  //       const tracks = streamRef.current.getTracks();
  //       tracks.forEach((track) => {
  //         if (track.kind === "video") {
  //           track.stop();
  //         }
  //       });
  //       streamRef.current = null;
  //       videoRef.current.srcObject = null;
  //       setIsVideo(false);
  //     }
  //     return !prevState;
  //   });
  // };
  // const handleVideoclick = async () => {
  //   try {
  //     // Stop recording and stop the tracks from the preview stream
  //     stopRecording();

  //     if (previewStream) {
  //       const tracks = previewStream.getTracks();
  //       await Promise.all(tracks.map((track) => track.stop()));
  //     }

  //     // If mediaBlobUrl exists, initiate the download
  //     if (mediaBlobUrl) {
  //       const link = document.createElement("a");
  //       link.href = mediaBlobUrl;
  //       link.download = "recorded-video.webm"; // or any other file format
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   } catch (error) {
  //     console.error("Error stopping video stream or downloading video:", error);
  //   } finally {
  //     return true;
  //   }
  // };
  const handleVideo = async () => {
    console.log("outside if === ", streamRef);
    if (streamRef.current) {
      console.log("in if condition=== ", streamRef);
      const tracks = streamRef.current.getTracks();
      console.log("tracks ", tracks);
      await Promise.all(tracks.map((track) => track.stop()));
      streamRef.current = null;
    }
  };

  const goback = () => {
    setTimeout(() => {
      setIsResult(true);
      // navigate("/result");
    }, 4000);
  };
  const goToHomePage = () => {
    navigate("/candidate");
  };
  const handleFinishInterview = async () => {
    await stopRecognition();
    await stopRecording();
    goback();
    showModal();
  };

  useEffect(() => {
    if (status == "stopped") {
      handleVideo();
      handleDownload();
    }
  }, [status]);
  return (
    <div>
      {/* results of interview - starts */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Interview Results:</h2>
              <span
                className="cursor-pointer text-gray-500 text-2xl"
                onClick={hideModal}
              >
                &times;
              </span>
            </div>
            <p className="mt-4 text-gray-700">
              {<Result responseData={responseData} />}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={goToHomePage}
                className="px-4 py-2 bg-[#FF02DF] text-white rounded hover:bg-[#FF02DF] transition-all"
              >
                GO BACK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* results of interview - ends */}
      <div>
        <div className="flex justify-start items-center w-full gap-[35.5%] pb-14">
          <div
            className="bg-gray-500 text-white text-3xl rounded-lg p-1 flex items-center cursor-pointer ml-4"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <AiOutlineFullscreenExit onClick={() => setSide(true)} />
            ) : (
              <AiOutlineFullscreen onClick={() => setSide(false)} />
            )}
          </div>
          <div className="flex gap-3 items-center">
            <div
              className="bg-gray-600 w-9 h-9 text-white rounded-full flex justify-center items-center"
              onClick={handleCameraToggle}
            >
              {isVideo ? (
                <button className="text-2xl">
                  <CiVideoOn />
                </button>
              ) : (
                <button className="text-2xl">
                  <CiVideoOff />
                </button>
              )}
            </div>
            <div className="bg-gray-600 w-9 h-9 text-white rounded-full flex justify-center items-center">
              <button
                className="text-2xl"
                onClick={() => {
                  startRecognition();
                }}
              >
                {text === "No activity" ||
                text === "Error: no-speech" ||
                text === "Please unmute yourself first" ? (
                  <IoMicOffOutline
                    onClick={() => {
                      setText("Voice Recognition is on "), stopRecognition();
                    }}
                  />
                ) : (
                  <IoMicOutline
                    onClick={() => {
                      setText("Please unmute yourself first"),
                        startRecognition();
                    }}
                  />
                )}
              </button>
            </div>
            <div className="bg-red-700 w-11 h-11 text-white rounded-full flex justify-center items-center  ">
              <button className="text-2xl" onClick={handleFinishInterview}>
                <MdOutlineCallEnd />
              </button>
            </div>
            <div className="bg-gray-600 w-9 h-9 text-white rounded-full flex justify-center items-center  ">
              <button className="text-2xl">
                <HiOutlineRefresh />
              </button>
            </div>
            <div className="bg-gray-600 w-9 h-9 text-white rounded-full flex justify-center items-center  ">
              <button className="text-2xl">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatControlls;
