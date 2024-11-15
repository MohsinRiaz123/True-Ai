import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useResetPass from "../../Services/Onboard/ResetPassword/useResetPass";

const ResetInputs = () => {
  const navigate = useNavigate();
  const { resetPassword, errors: apiErrors, loading } = useResetPass();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
    email:""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errors, setErrors] = useState({});
 formData.email=localStorage.getItem('REC_Email');
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    const { new_password, confirm_password } = formData;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!new_password) {
      newErrors.new_password = "Password is required.";
    } else if (new_password.length < 6) {
      newErrors.new_passwordLength =
        "Password must be at least 6 characters long.";
    } else if (!passwordRegex.test(new_password)) {
      newErrors.new_passwordMix =
        "Password must include letters, numbers, and special characters.";
    }
    if (!confirm_password) {
      newErrors.confirm_password = "Confirm Password is required.";
    } else if (new_password !== confirm_password) {
      newErrors.confirm_passwordMismatch = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const result = await resetPassword(formData);
      if (result.success) {
        console.log("Password reset successful:", result.data);
        localStorage.removeItem('REC_Email');
        navigate("/resetconfirmation");
      } else {
        setErrors({ api: result.error });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex-1 py-20 h-screen">
      <div className="w-[90%] mx-auto">
        <p className="font-semibold text-center text-lg laptop:text-2xl text-pink-500">
          Reset Password
        </p>
        <div className="space-y-2 mb-2 mt-16">
          <p className="font-bold text-2xl">
            Reset
            <br />
            password?
          </p>
          <h5 className="text-sm">
            Set up your new password and don’t share it with anyone to keep your
            account safe.
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-base laptop:text-sm laptop:px-16 space-y-6"
        >
          <div className="flex flex-col space-y-1">
            <label className="font-semibold flex items-center gap-2">
              <IoLockClosedOutline />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full border py-2 rounded-full border-pink-400 px-5 outline-none ${
                  errors.new_password || errors.new_passwordLength || errors.new_passwordMix ? "border-red-500" : ""
                }`}
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({ ...formData, new_password: e.target.value })
                }
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-sm">{errors.new_password}</p>
            )}
            {errors.new_passwordLength && (
              <p className="text-red-500 text-sm">
                {errors.new_passwordLength}
              </p>
            )}
            {errors.new_passwordMix && (
              <p className="text-red-500 text-sm">{errors.new_passwordMix}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-semibold flex items-center gap-2">
              <IoLockClosedOutline />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className={`w-full border py-2 rounded-full border-pink-400 px-5 outline-none ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({ ...formData, confirm_password: e.target.value })
                }
              />
              <div
                onClick={toggleConPasswordVisibility}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {showConPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">{errors.confirm_password}</p>
            )}
            {errors.confirm_passwordMismatch && (
              <p className="text-red-500 text-sm">
                {errors.confirm_passwordMismatch}
              </p>
            )}
          </div>

          {/* API error message */}
          {apiErrors && <p className="text-red-500 text-sm">{apiErrors.api}</p>}

          <div className="flex flex-col justify-center items-center mt-4">
            <button
              type="submit"
              className={`mx-auto w-[60%] tablet:w-[75%] laptop:w-3/6 border rounded-full text-white text-lg bg-LoginBtn bg-center bg-cover py-1 px-5 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetInputs;
