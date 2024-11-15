import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useNavigation } from "react-router-dom";
const LogInSignUp = () => {
  const navigate = useNavigate();

  const goForLogin = () => {
    navigate("/login");
  };

  const goForSignUp = () => {
    navigate("/signupchoice");
  };
  return (
    <div className=" flex flex-col w-full h-full 2xl:h-screen bg-LoginBack bg-cover bg-center px-4 text-xs tablet:text-lg xl:text-2xl ">
      <div className="text-white  font-bold flex items-center mt-10 ml-[4%] text-4xl  ">
        TrueAI
      </div>
      <div className="h-auto flex items-center justify-center px-3 mt-10 mb-5  ">
        <div className=" h-auto   flex  ">
          <div className=" bg-white mx-auto rounded-l-3xl rounded-r-xl laptop:rounded-r-none px-2 py-8 w-full tablate:w-5/6 laptop:w-3/6">
            <div className=" flex text-2xl font-bold px-5 tablet:px-12">
              <div className="text-pink-500">Hello,</div>
              <div>Let's</div>
            </div>
            <div className="text-2xl font-bold px-5 tablet:px-12">get started!</div>
            <div className=" flex mt-3 text-xs tablet:text-sm px-5 tablet:px-12">
              Join and revolutionize the Job interviewing process with us.
            </div>
            <div className=" flex flex-col items-center justify-center  mt-10 text-base tablet:text-lg  ">
              <button
                onClick={()=>goForLogin()}
                className=" mx-auto w-[60%] tablet:w-[75%] laptop:w-[60%]  border-solid border  rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5 "
              >
                Log In 
              </button>
            </div>
            <div className="  font-semibold flex flex-col  items-center justify-center mt-6 text-base tablet:text-lg ">
              <button
                onClick={()=>goForSignUp()}
                className=" mx-auto w-[60%] tablet:w-[75%] laptop:w-[60%]  border-solid border rounded-full border-pink-500 py-1 px-5 "
              >
                Sign Up
              </button>
            </div>
            <div className="w-[80%] flex items-center  mx-auto mt-6 text-lg ">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 font-semibold">Or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className=" font-semibold flex flex-col mt-4 ">
              <button
                onClick=""
                className="  mx-auto w-[60%] tablet:w-[75%] laptop:w-[60%]  mb-10 border-solid border rounded-full border-pink-500 py-1 px-5 flex items-center justify-center gap-2 text-xs tablet:text-lg"
              >
                <FcGoogle />
                Continue with Google
              </button>
            </div>
          </div>
          <div className=" flex-1 px-20   bg-custom-dark-blue rounded-r-2xl hidden laptop:flex items-center justify-center ">
            <img src="/src/assets/Images/LoginImg.png" alt="Logo Image" className="w-[250px]"></img>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUp;
