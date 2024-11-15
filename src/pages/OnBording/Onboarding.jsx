import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
const Onboarding = () => {
  const navigate = useNavigate();
  const goForLoginSignup = () => {
    navigate("/loginsignup");
  };
  return (
    <div className=" flex flex-col w-full h-screen bg-LoginBack bg-cover bg-center  ">
      <div className="text-white  font-bold flex items-center mt-10 ml-[5%] text-4xl ">
        TrueAI
      </div>
      <div className="mt-40 text-white flex items-center justify-center flex-col px-3  ">
        <div className="mx-auto   text-2xl tablet:text-5xl font-semibold ">Automate the Job</div>
        <div className="mx-auto  text-2xl tablet:text-5xl font-semibold">
          Interviews with True AI
        </div>
        <div className="mx-auto py-5 text-[10px] tablet:text-lg  ">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div>
            Duis id nibh vel nisi ultrices fringilla vel id felis. Etiam eun
          </div>
          <div>ulla iaculis, vulputate turpis egestas, rhoncus augue.</div>
        </div>
        <button
          className="bg-white text-black rounded-md px-2 py-1 tablet:text-lg font-semibold "
          onClick={()=>goForLoginSignup()}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
