import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import VideoMain from "../Features/VideoCall/VideoMain";
import ChatMain from "../Features/Chat/ChatMain";
import { textContext } from "../context/textContext";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import Result from "../Features/Chat/Result";

const QuestionAnswer = ({ setSide, topic }) => {
  const [Greeting, setGreeting] = useState([]);
  const [SimpleQuestions, setSimpleQuestions] = useState([]);
  const [Pause, setPause] = useState([]);
  const [TechnicalQuestions, setTechnicalQuestions] = useState([]);
  const [Thanks, setThanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArray, setCurrentArray] = useState("Greeting");
  const [recognition, setRecognition] = useState(null);
  const [myvoice, setmyvoice] = useState();
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("Please unmute yourself first");
  const [isshowTechnical, setIsshowTechnical] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [ques, setques] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [gifState, setGifState] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();
  const ResponseBack = (data) => {
    setResponseData(data);
  };
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true, audio: true });
  const streamRef = useRef(null);

  const handleDownload = async () => {
    if (!mediaBlobUrl) {
      console.warn("Download: mediaBlobUrl is not ready.");
      return;
    }
    console.log("usman");
    // try {
    //   const a = document.createElement("a");
    //   a.href = mediaBlobUrl;
    //   a.download = "recording.webm";
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // } catch (error) {
    //   console.log("Error in downloading: ", error);
    // }
    try {
      console.log("usman");

      const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
      console.log(blob);
      const jsonData = JSON.stringify(conversationHistory);
      const formData = new FormData();
      formData.append("video", blob, "recording.mp4");
      formData.append("data", jsonData);
      console.log(formData);
      const response = await fetch(
        "https://9b86-103-217-179-73.ngrok-free.app/percept/upload/",
        {
          method: "POST",
          body: formData,
          // mode: "no-cors",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response);
      // const data = await response.json();
      if (response.ok) {
        console.log("Video and data uploaded successfully.");
        const data = await response.json();

        console.log(data, "");
        ResponseBack(data);
        console.log(data);
        console.log(responseData);
        console.log("Response data:", data);
      } else {
        console.error("Failed to upload video and data.");
      }
    } catch (error) {
      console.error("Error uploading video and data:", error);
    }
  };

  // Text to speech - start
  const speech = new SpeechSynthesisUtterance();
  // const play = (arrayBuffer) => {
  //   const audioContext = new (window.AudioContext ||
  //     window.webkitAudioContext)();
  //   audioContext.decodeAudioData(
  //     arrayBuffer,
  //     (buffer) => {
  //       const source = audioContext.createBufferSource();
  //       source.buffer = buffer;
  //       source.connect(audioContext.destination);
  //       source.start(0);
  //       source.onended = () => {
  //         setGifState(false);
  //         startRecognition();
  //       };
  //     },
  //     (error) => {
  //       console.error("Error decoding audio data:", error);
  //     }
  //   );
  // };
  //elevanlabs API Implementation - start

  // useEffect(() => {
  //   console.log("Updated gifState: ", gifState);
  // }, [gifState]);

  const textToSpeech = async () => {
    if (loading) return;
    let currentQuestion;
    console.log(currentArray);
    console.log(currentIndex);
    switch (currentArray) {
      case "Greeting":
        currentQuestion = Greeting[currentIndex];
        break;
      case "SimpleQuestions":
        currentQuestion = SimpleQuestions[currentIndex];
        break;
      case "Pause":
        currentQuestion = Pause[currentIndex];
        break;
      case "TechnicalQuestions":
        currentQuestion = TechnicalQuestions[currentIndex];
        break;
      case "Thanks":
        currentQuestion = Thanks[currentIndex];
        break;
      default:
        currentQuestion = { question: "" };
    }
    if (currentQuestion && currentQuestion.question) {
      // try {
      //   const response = await fetch(
      //     "https://330f-103-217-179-73.ngrok-free.app/generate-audio",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ text: currentQuestion.question }),
      //     }
      //   );
      //   const arrayBuffer = await response.arrayBuffer();
      //   play(arrayBuffer);
      // } catch (error) {
      //   console.error("Error with text-to-speech:", error);
      // }

      //elevanlabs API Implementation - end
      console.log("currentQuestion= ", currentQuestion);
      console.log("currentQuestion.question= ", currentQuestion.question);
      speech.text = currentQuestion.question;
      speech.pitch = 1;
      speech.rate = 1;
      speech.lang = "en-US";
      console.log(currentQuestion.question);
      console.log(currentArray, " jut array ");
      // ------------------  response send in json formate --------------------------

      setques(currentQuestion.question);
      setGifState(true);
      speechSynthesis.speak(speech);
      speech.onend = () => {
        setGifState(false);
        startRecognition();
      };
      console.log(gifState);
    } else {
      console.log("No question available");
    }
  };

  useEffect(() => {
    if (
      currentArray === "SimpleQuestions" ||
      currentArray === "TechnicalQuestions"
    ) {
      if (myvoice && myvoice.trim()) {
        console.log("Candidate finished speaking:", myvoice);
        try {
          const payload = {
            botQuestion: ques, // Question from the bot
            botAnswer:
              currentArray === "SimpleQuestions"
                ? SimpleQuestions[currentIndex].answer
                : TechnicalQuestions[currentIndex].answer, // Expected answer
            candidateAnswer: myvoice, // Candidate's final response
          };
          console.log("Sending API payload:", payload);
          setConversationHistory((prevState) => [...prevState, payload]);
          console.log(conversationHistory);

          // const sendApiResponse = async () => {
          //   const response = await fetch(
          //     "https://2485-103-217-179-73.ngrok-free.app/results",
          //     {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //       body: JSON.stringify(payload),
          //     }
          //   );
          //   const data = await response.json();
          //   console.log("API Response:", data);
          // };

          // sendApiResponse();
        } catch (error) {
          console.error("Error posting data:", error);
        }
      }
    }
  }, [myvoice]); // Only trigger this effect when myvoice is updated

  const goback = () => {
    navigate("/");
  };
  console.log(conversationHistory);

  const handleNextQuestion = async () => {
    let currentArrayLength;

    switch (currentArray) {
      case "Greeting":
        currentArrayLength = Greeting.length;
        break;
      case "SimpleQuestions":
        currentArrayLength = SimpleQuestions.length;
        break;
      case "Pause":
        currentArrayLength = Pause.length;
        break;
      case "TechnicalQuestions":
        currentArrayLength = TechnicalQuestions.length;
        break;
      case "Thanks":
        currentArrayLength = Thanks.length;
        break;
      default:
        currentArrayLength = 0;
    }

    //result store in json formate
    // setConversationHistory((prevHistory) => [
    //   ...prevHistory,
    //   { question: ques, answer: myvoice },
    // ]);

    // console.log(conversationHistory);

    if (currentIndex < currentArrayLength - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      if (
        currentArray === "Greeting" &&
        currentIndex === currentArrayLength - 1 &&
        myvoice.trim().toLowerCase().includes("yes")
      ) {
        setCurrentArray("SimpleQuestions");
      } else if (currentArray === "SimpleQuestions") {
        setCurrentArray("Pause");
      } else if (currentArray === "Pause") {
        setCurrentArray("TechnicalQuestions");
        setIsshowTechnical(true);
      } else if (currentArray === "TechnicalQuestions") {
        setCurrentArray("Response");
        setIsshowTechnical(false);
      } else if (currentArray === "Thanks") {
        // Interview is finished
        alert("Your interview has been ended");
        // Navigate to the home page or perform other appropriate actions
        return;
      } else if (myvoice.trim().toLowerCase().includes("no")) {
        // Handle unexpected array
        // console.error("Unexpected currentArray:", currentArray);
        alert("Unexpected ended of interview");
        stopRecording();
        handleDownload();
        goback();
        return;
      }
      setCurrentIndex(0);
    }
    setTimerKey((prevkey) => prevkey + 1);
  };

  // const handleNextQuestionOnButtonClick = () => {
  //   console.log("Next question button is clicked");
  //   setCurrentIndex((prevIndex) => prevIndex + 1);
  // };

  // const handleNextQuestionOnButtonClick = () => {
  //   console.log("Next question button is clicked");
  //   setCurrentIndex((prevIndex) => prevIndex + 1);
  // };
  // console.log(timerKey);

  useEffect(() => {
    startRecording();
  }, []);
  // Speech to text - start
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      let recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onstart = () => {
        setText("Voice Recognition on");
        setIsListening(true);
      };
      recognition.onspeechend = () => {
        setText("No activity");
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        setText(`Error: ${event.error}`);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setmyvoice(transcript);
            handleNextQuestion();
            console.log("Transcript:", transcript);
          } else {
            interimTranscript += transcript;
          }
        }
      };
      setRecognition(recognition);
    } else {
      setText("Speech Recognition API not supported in this browser.");
    }
  }, [currentIndex]);

  const startRecognition = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
        console.log("Speech recognition started");
      } catch (error) {
        console.error("Error starting recognition: ", error);
      }
    }
  };

  const stopRecognition = () => {
    if (recognition && isListening) {
      recognition.stop();
      console.log("Speech recognition stopped");
    }
  };
  // Speech to text - end

  useEffect(() => {
    console.log(topic);

    // Data fetching
    const fetchData = async () => {
      try {
        const InterviewData = await fetch(
          "https://9b86-103-217-179-73.ngrok-free.app/percept/generate_interview_questions/",
          {
            method: "POST",
            body: JSON.stringify(topic),
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        // const [
        //   greetingResponse,
        //   questionsResponse,
        //   pauseResponse,
        //   techQuestionsResponse,
        //   responseResponse,
        // ] = await Promise.all([
        //   // API for grreeting
        //   axios.get("https://330f-103-217-179-73.ngrok-free.app/greeting", {
        //     headers,
        //   }),
        //   // API for simple questions
        //   axios.get(
        //     "https://330f-103-217-179-73.ngrok-free.app/simplequestions",
        //     { headers }
        //   ),
        //   // API for pause
        //   axios.get("https://330f-103-217-179-73.ngrok-free.app/pause", {
        //     headers,
        //   }),
        //   // API for technical questions
        //   axios.get(
        //     "https://330f-103-217-179-73.ngrok-free.app/technicalquestions",
        //     { headers }
        //   ),
        //   // API for complete
        //   axios.get("https://330f-103-217-179-73.ngrok-free.app/complete", {
        //     headers,
        //   }),
        // ]);
        const data = await InterviewData.json();
        console.log(data);
        console.log(data.Greetings);
        console.log(data.SimpleQuestions);
        console.log(data.Pause);
        console.log(data.TechnicalQuestions);
        console.log(data.Thanks);
        setGreeting(data.Greetings);
        setSimpleQuestions(data.SimpleQuestions);
        setPause(data.Pause);
        setTechnicalQuestions(data.TechnicalQuestions);
        setThanks(data.Thanks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [topic]);
  console.log(Greeting);
  const duration =
    currentArray === "SimpleQuestions"
      ? 15000
      : currentArray === "TechnicalQuestions"
      ? 20000
      : 10000;

  // Call text-to-speech method
  useEffect(() => {
    if (!loading) {
      textToSpeech();
      // const timer = setTimeout(() => {
      //   handleNextQuestion();
      // }, duration);
      // return () => clearTimeout(timer);
    }
  }, [currentIndex, currentArray, loading]);

  const timerDuration =
    currentArray === "SimpleQuestions"
      ? 15
      : currentArray === "TechnicalQuestions"
      ? 20
      : 0;

  useEffect(() => {
    setIsButtonDisabled(true);
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [timerKey]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <textContext.Provider value={text}>
      <div className="relative h-screen">
        <div
          className={`transition-all duration-500 ${
            isshowTechnical ? "h-[70vh]" : "h-[100vh]"
          }`}
        >
          <VideoMain streamRef={streamRef} gifState={gifState} />
        </div>
        <div
          className={`absolute bottom-0 right-0 w-full transition-all duration-500`}
        >
          <ChatMain
            text={text}
            setText={setText}
            myvoice={myvoice}
            ques={ques}
            streamRef={streamRef}
            isshowTechnical={isshowTechnical}
            startRecognition={startRecognition}
            stopRecognition={stopRecognition}
            stopRecording={stopRecording}
            previewStream={previewStream}
            timerKey={timerKey}
            duration={timerDuration}
            setSide={setSide}
            handleDownload={handleDownload}
            status={status}
            responseData={responseData}
          />
        </div>
        <div
          className={`flex items-center gap-2 font-poppins justify-center w-[173px] h-[49px] rounded-md absolute top-[87%] 
        ${
          isshowTechnical
            ? "bg-gray-400  right-[13%]"
            : "bg-[#000018] text-white right-[6%]"
        }
        `}
        >
          <button
            onClick={handleNextQuestion}
            disabled={isButtonDisabled}
            className={`${
              isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next Question
          </button>
        </div>
      </div>
    </textContext.Provider>
  );
};

export default QuestionAnswer;
