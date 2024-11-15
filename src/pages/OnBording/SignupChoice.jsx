import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignupChoice = () => {
  const navigate = useNavigate();

  const goForLoginEmployer = () => {
    navigate("/empsignup");
  };

  const goForLoginCandidate = () => {
    navigate("/signup");
  };

 
  return (
    <div className=" flex flex-col w-full h-screen  bg-LoginBack bg-cover bg-center ">
      <div className="text-white  font-bold flex items-center mt-10 ml-[5%] text-2xl laptop:text-4xl  ">
        TrueAI
      </div>
      <div className="h-auto flex items-center justify-center px-3 mt-10 ">
        <div className=" h-auto flex     ">
          <div className=" bg-white mx-auto rounded-l-3xl rounded-r-3xl laptop:rounded-r-none px-2 py-12 w-full tablate:w-5/6 laptop:w-3/6  ">
            <div className=" flex text-2xl font-bold px-5 tablet:px-12">
              <div className="text-pink-500 ">Hello,</div>
              <div>Let's</div>
            </div>
            <div className="text-2xl laptop:text-2xl font-bold px-5 tablet:px-12">
              get started!
            </div>
            <div className=" mt-3 px-12 tablet:px-12 text-xs tablet:text-sm laptop:text-md">
              Join and revolutionize the Job interviewing process with us.
            </div>
            <div className="space-y-6">
             

              <div className=" flex flex-col justify-center items-center mt-4 text-xs tablet:text-md xl:text-lg">
                <button
                  onClick={() => goForLoginCandidate()}
                  className="mx-auto w-[60%] tablet:w-[75%] laptop:w-[70%]  border-solid border  rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5"
                >
                  Sign up as a Candidate
                </button>
              </div>
              <div className="w-[80%] flex items-center ml-[10%] mt-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 font-semibold">Or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
              <div className=" flex flex-col justify-center items-center mt-10 text-xs tablet:text-md xl:text-lg ">
                <button
                  onClick={() => goForLoginEmployer()}
                  className="mx-auto w-[60%] tablet:w-[75%] laptop:w-[70%] border-solid border  rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5 "
                >
                  Sign up as an Employer
                </button>
              </div>
            </div>
           
            <div className="mt-5 text-center text-md ">
              <p className="text-gray-400">
                Already have an account?
                <span className="text-pink-400 pl-3 ">
                  <Link to="/login" className="font-semibold">
                    Log in
                  </Link>
                </span>
              </p>
            </div>
          </div>

          <div className="flex-1 px-20   bg-custom-dark-blue rounded-r-2xl hidden laptop:flex items-center justify-center ">
            <img
              src="/src/assets/Images/LoginImg.png"
              alt="Logo Image"
              className="w-[250px]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupChoice;
