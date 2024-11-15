import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const url = `${BASE_URL}/employer/Employer_ResetPassword/`;

const useResetPass = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetPassword = async (formData) => {
    setLoading(true);
    setErrors(null);

    try {
      console.log("Sending data to reset password:", formData);
      const response = await axios.post(url, formData);
      console.log(response)
      return { success: true, data: response.data };
     
    } catch (error) {
      console.error("Error during password reset:", error);
      const errorMessage = error.message ;
      setErrors({ api: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, errors, loading };
};

export default useResetPass;
