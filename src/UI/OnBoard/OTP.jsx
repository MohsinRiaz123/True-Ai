import { useState, useEffect } from "react";
import React from "react";
import useOtp from '../../Services/Onboard/ResetPassword/useOTP'; // Import the custom hook
import useForgotPass from "../../Services/Onboard/forgotPassword/useForgotPass";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false); // Loading state for resend

  // Use the custom hooks
  const { verifyOtp, loading, errors, success } = useOtp();
  const { forgotPassword } = useForgotPass();

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only digits or an empty string
    if (!/^\d*$/.test(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    // Automatically focus on the next input
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    // Move focus back on Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    // Check OTP length before submitting
    if (otpString.length === 4) {
      await verifyOtp(otpString);
      setOtp(["", "", "", ""]);
      setTimer(30);
      setIsResendEnabled(false);
      setError(""); // Reset error state
    } else {
      setError("Please enter a valid 4-digit OTP."); // Set error message
    }
  };

  const handleResendOtp = async () => {
    const recEmail = localStorage.getItem("REC_Email");
    if (!recEmail) {
      setError("No email found for OTP resend."); // Handle case where email is not available
      return;
    }
    
    setIsResending(true); // Set loading state for resend
    setError(""); // Reset error message before sending

    // Call the forgot password logic
    await forgotPassword(recEmail);
    
    // Reset OTP fields and timer
    setTimer(30);
    setOtp(["", "", "", ""]);
    setIsResendEnabled(false);
    setIsResending(false); // Reset loading state after resend
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex-1 py-10 font-poppins h-screen">
      <div className="w-[90%] mx-auto laptop:px-24 space-y-10">
        <div>
          <p className="font-bold text-center text-2xl text-pink-500">OTP Sent</p>
        </div>
        <div className="space-y-2 mb-2 mt-20">
          <h5 className="text-sm text-center">
            Kindly check your email, OTP is sent to you for resetting your password.
          </h5>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-center mb-6">Enter OTP</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex space-x-2 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength="1"
                  className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}
            <button
              type="submit"
              className={`px-6 py-2 text-white bg-pink-400 rounded-lg hover:bg-pink-500 focus:outline-none ${loading || timer === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading || timer === 0}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <div className="text-center mt-5">
            <p>{timer !== 0 ? `Time left: ${formatTime(timer)}` : "Time out"}</p>
            <button
              onClick={handleResendOtp}
              className={`text-pink-500 ${isResendEnabled ? "block" : "hidden"}`}
              disabled={isResending} // Disable button while resending
            >
              {isResending ? "Sending..." : "Resend OTP"} {/* Change button text based on loading state */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
