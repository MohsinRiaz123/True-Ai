import React from "react";

const Subtitles = ({ text, myvoice, status }) => {
  return (
    <div className="flex justify-center w-full pb-4">
      <div>
        {myvoice ? (
          <div className="text-wrap max-w-[30rem]">
            <p className="bg-slate-600 font-poppins text-white rounded-md p-1 break-words h-full">
              {myvoice}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Subtitles;
