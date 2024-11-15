import React, { useState } from "react";
import { MdDone } from "react-icons/md";
const Subscription = () => {
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  const monthlyPkg = () => {
    setMonthly(true);
    setYearly(false);
  };
  const yearlyPkg = () => {
    setMonthly(false);
    setYearly(true);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-xl font-bold">Upgrade your plans </p>
        <p className=" text-gray-400 text-lg">
          Unlock the full potential of TrueAI by upgrading your plans
        </p>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="px-4 py-2 shadow-md border border-gray-300 rounded-full">
          <button onClick={() => monthlyPkg()}>Monthly billing</button>
        </div>
        <div className="px-4 py-2 shadow-md border border-gray-300 rounded-full">
          <button onClick={() => yearlyPkg()}>Yearly billing</button>
        </div>
      </div>
      <div className="flex justify-around p-4">
        <div className="border border-gray-400 p-8 rounded-2xl space-y-14">
          <div className="space-y-3">
            <p className="text-lg font-semibold">Free</p>
            {monthly && (
              <div className="flex text-sm ">
                <p className="text-2xl   font-bold">$0</p>
                <p className=" flex items-center text-gray-400">/momth</p>
              </div>
            )}
             {yearly && (
              <div className="flex text-sm ">
                <p className="text-2xl font-bold">$0</p>
                <p className=" flex items-center text-gray-400">/year</p>
              </div>
            )}
            <div className=" flex items-center text-md gap-2 text-gray-400">
              <p>
                <MdDone />
              </p>
              <p>Up to 5 interviews per month </p>
            </div>
            <div className=" flex  items-center text-md gap-2 text-gray-400">
              <p>
                <MdDone />
              </p>
              <p>Ability to upload custom quizes </p>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <button className="px-4 py-2 border border-gray-600 rounded-full ">Upgrade Now</button>
          </div>
        </div>
        <div className="border border-gray-400 p-8 rounded-2xl space-y-14">
          <div className="space-y-3">
            <p className="text-lg font-semibold">Basic</p>
            {monthly && (
              <div className="flex text-sm ">
                <p className="text-2xl font-bold">$20.99</p>
                <p className=" flex items-center text-gray-400">/momth</p>
              </div>
            )}
             {yearly && (
              <div className="flex text-sm ">
                <p className="text-2xl font-bold">$220.99</p>
                <p className=" flex items-center text-gray-400">/year</p>
              </div>
            )}
            <div className=" flex items-center text-md gap-2 text-gray-400">
              <p>
                <MdDone />
              </p>
              <p>Up to 20 interviews per month </p>
            </div>
            <div className=" flex  items-center text-md gap-2 text-gray-400">
              <p>
                <MdDone />
              </p>
              <p>Ability to upload custom quizes </p>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <button className="px-4 py-2 border border-gray-600 rounded-full ">Upgrade Now</button>
          </div>
        </div>
        <div className="border border-gray-400 p-8 rounded-2xl space-y-14 text-white linear_grad">
          <div className="space-y-3">
            <p className="text-lg font-semibold">Pro</p>
            {monthly && (
              <div className="flex text-md ">
                <p className="text-2xl font-bold">$40.99</p>
                <p className=" flex items-center">/momth</p>
              </div>
            )}
             {yearly && (
              <div className="flex text-md ">
                <p className="text-2xl font-bold">$440.99</p>
                <p className=" flex items-center">/year</p>
              </div>
            )}
            <div className=" flex items-center text-md gap-2">
              <p>
                <MdDone />
              </p>
              <p>Unlimited interviews per month </p>
            </div>
            <div className=" flex  items-center text-md gap-2 ">
              <p>
                <MdDone />
              </p>
              <p>Ability to upload custom quizes </p>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <button className="px-4 py-2 border border-white rounded-full ">Upgrade Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
