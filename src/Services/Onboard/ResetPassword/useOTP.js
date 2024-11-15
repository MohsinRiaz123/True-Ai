// useOtpVerification.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../Config/Config';

const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const url=`${BASE_URL}/employer/Employer_OTP/`;
  const navigate = useNavigate();

  const verifyOtp = async (otp) => {
    setLoading(true);
    setErrors(null);
    setSuccess(null);

    try {
      const response = await axios.post(url, {otp} ); // Replace with your actual API endpoint
      setSuccess(response.data.msg);

      // Check if the OTP verification is successful
      if (response.data.msg) {
        console.log("OTP verified successfully");
        navigate('/resetpassword'); // Navigate on success
      }
      
    } catch (error) {
      // Ensure the error handling is correct
      setErrors(error.response ? error.response.data.msg : 'An error occurred while verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, errors, success };
};

export default useOTP;
