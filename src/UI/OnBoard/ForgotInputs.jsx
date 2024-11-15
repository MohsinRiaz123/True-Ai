import React, { useState,useContext} from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useForgotPass from "../../Services/Onboard/forgotPassword/useForgotPass";

const ForgotInputs = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState("");
  const { forgotPassword, errors, loading } = useForgotPass()
  // Validation function
  const validateForm = () => {
    if (!email.trim()) {
      return { email: "Email is required." };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return { email: "Email address is invalid." };
    }
    return {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const result = await forgotPassword(email);
      if (result.success) {
        console.log("Mail send successful:", result.data);
        navigate('/emailsend');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex-1 py-20 font-poppins h-screen">
      <div className="w-[90%] mx-auto laptop:px-20">
        <div>
          <h2 className="font-bold text-center text-2xl text-pink-500">
            Forgot Password
          </h2>
        </div>
        <div className="space-y-2 mb-2 mt-16">
          <p className="font-bold text-2xl">
            Forgot
            <br />
            password?
          </p>
          <h5 className="text-sm">
            Enter your email details so we can help you reset your password
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 mb-2 mt-5">
            <label className="font-semibold flex items-center gap-2">
              <IoPersonOutline />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              className={`w-full border-solid border py-2 rounded-full border-pink-400 px-5 outline-none ${errors?.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <button
              type="submit"
              className={`w-60 border-solid border rounded-full text-white bg-LoginBtn bg-cover bg-center py-1 px-5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotInputs;
