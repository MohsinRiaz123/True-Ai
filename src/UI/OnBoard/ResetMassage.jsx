import React from "react";
import  {useNavigate}  from "react-router-dom";
const ResetMassage = () => {
  const navigate = useNavigate();
  const goForLogin = () => {
    navigate('/login')
  };
  return (
      <div className="flex-1 py-10 font-poppins h-screen ">
        <div className="w-[90%] mx-auto laptop:px-24">
          <div>
            <h2 className="font-bold text-center text-2xl text-pink-500 ">
              Reset Successful
            </h2>
          </div>
          <div className="  mt-14 w-[200px] h-[200px]  mx-auto ">
            <img src="/src/assets/Images/Reset.png"></img>
          </div>
          <div className="space-y-2  mb-2 ">
            <p className="font-bold text-center text-sm tablet:text-xl">
              Password successfully reset
            </p>
            <h5 className="text-sm text-center">
              Your password has been successfully reset, Please login again to
              continue.
            </h5>
          </div>
          <div className=" flex flex-col justify-center items-center mt-6 ">
            <button
              onClick={()=>goForLogin()}
              className=" w-60 border-solid border  rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
  );
};

export default ResetMassage;
