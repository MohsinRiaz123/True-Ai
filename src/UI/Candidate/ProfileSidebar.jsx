import React from 'react'

const ProfileSidebar = () => {
  return (
    
      <div className=" hidden laptop:block w-[35%] bg-custom-dark-blue  mx-1 my-1 rounded-2xl px-2 py-3 ">
          <div className=" my-4 mx-4 ">
            <img
              src="/src/assets/images/TrueAI.png"
              alt=""
              className="h-6 mt-10 2xl:mt-20"
            />
          </div>
          <div className="ml-5 mt-16 xl:mt-26 ">
            <img
              src="/src/assets/images/idCard.png"
              alt=""
              className="h-16 2xl:h-24"
            />
            <p className="text-pink-400 text-3xl font-bold">
              Let’s Create your professional profile
            </p>
          </div>
          <div className="mt-6 2xl:mt-12 ">
            <div className="flex items-center">
              <div className="bg-blue-900 rounded-full w-5 2xl:w-6 max-h-5 2xl:max-h-10 flex items-center justify-center text-white ml-3">
                1
              </div>
              <div className="text-white ml-2">
                <p className="text-lg ">
                  Upload your professional information
                </p>
                <p className="text-sm">
                  Please upload your legitimate information
                </p>
              </div>
            </div>
            <div className="h-10  border-2 border-custom-dark-blue border-l-blue-900 ml-5"></div>
            <div className="flex items-center">
              <div className="bg-blue-900 rounded-full w-5 2xl:w-6 max-h-5 2xl:max-h-10 flex items-center justify-center text-white ml-3">
                2
              </div>
              <div className="text-white ml-2">
                <p className="text-lg">Register your account</p>
                <p className="text-sm">
                  Register your account with us easily
                </p>
              </div>
            </div>
            <div className="h-10  border-2 border-custom-dark-blue border-l-blue-900 ml-5"></div>
            <div className="flex items-center">
              <div className="bg-blue-900 rounded-full min-w-5 2xl:w-6 max-h-5 2xl:max-h-10 flex items-center justify-center text-white ml-3">
                3
              </div>
              <div className="text-white pl-2 ">
                <p className="text-lg">
                  Get Interview Invites by Top Employers
                </p>
                <p className="text-sm">
                  Get interview invites from top employer and show your skills
                  while enjoying the revolutionized Interviewing Experience with
                  TrueAI
                </p>
              </div>
            </div>
          </div>
        </div>
    
  )
}

export default ProfileSidebar
