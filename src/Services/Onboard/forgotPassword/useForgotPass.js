import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
const url = `${BASE_URL}/employer/Employer_ForgotPassword/`;
const useForgotPass = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const forgotPassword = async (email) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await axios.post(url, { email });
      localStorage.setItem("REC_Email",email)
      return { success: true, data: response.data };
     
    } catch (error) {
      const errorMessage = error.response?.data?.detail;
      setErrors({ email: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, errors, loading };
};

export default useForgotPass;
