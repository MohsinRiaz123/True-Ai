import React from "react";
import { useRef, useEffect, useState } from "react";
import rebortImg from "../../../assets/Images/robort.png";
import soundGif from "../../../assets/sound.gif";
import { FaEye } from "react-icons/fa";
import { VscCircleLargeFilled } from "react-icons/vsc";
const CandidiateVideo = ({ streamRef, gifState }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [streams, setstreams] = useState(true);

  const videoRef = useRef(null);

  // const handleToggle = () => {
  //   setIsMuted(!isMuted);
  // };
  // const handleVideo = () => {
  //   setIsVideo((prevState) => !prevState);

  //   if (isVideo && streamRef.current) {
  //     // If video is currently on and needs to be turned off
  //     let tracks = streamRef.current.getTracks();
  //     tracks.forEach((track) => track.stop()); // Stop all tracks of the stream
  //     streamRef.current = null; // Clear the reference to the stream
  //   } else {
  //     // If video is off and needs to be turned on
  //     getVideo();
  //   }
  // };
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        streamRef.current = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCamera = () => {
    setIsVideo((prevState) => {
      if (prevState && streamRef.current) {
        console.log(streamRef.current);
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          if (track.kind === "video") {
            track.stop();
          }
          console.log(streamRef.current);
        });
        streamRef.current = null;
        videoRef.current.srcObject = null;
        setIsVideo(false);
      }
      return !prevState;
    });
  };

  useEffect(() => {
    if (isVideo) {
      getVideo();
    }
  }, [isVideo]);
  return (
    <div>
      <div className="relative">
        <div className=" w-full h-screen">
          <video className="w-full h-full object-cover" ref={videoRef} />
        </div>
        <div className="absolute top-5 right-[82%] w-[16%]">
          <img src={rebortImg} alt="" />
        </div>
        <div className="absolute top-36 right-[85%] w-[10%] h-[8%] z-10">
          {gifState ? (
            <img src={soundGif} alt="" />
          ) : (
            console.log("No question available")
          )}
        </div>
        <div className="absolute top-10 flex gap-6 right-[6%]">
          {/* <div className="bg-[#000018] flex items-center gap-2 font-poppins justify-center text-white w-[130px] h-[40px] rounded-md">
            <p className="text-lg">
              <FaEye />
            </p>
            <p>Scanning</p>
          </div> */}
          <div className="bg-[#000018] flex items-center gap-2 font-poppins justify-center text-white w-[130px] h-[40px] rounded-md">
            <p className="text-red-600">
              <VscCircleLargeFilled />
            </p>
            <p>Recording</p>
          </div>
          {/* <div>
            <button onClick={handleCamera}>stop camera</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CandidiateVideo;
