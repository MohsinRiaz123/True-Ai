import CandidiateVideo from "./CandidiateVideo";

const VideoMain = ({ streamRef, gifState }) => {
  return (
    <div>
      <CandidiateVideo streamRef={streamRef} gifState={gifState} />
    </div>
  );
};

export default VideoMain;
