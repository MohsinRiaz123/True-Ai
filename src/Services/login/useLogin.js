import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const useLogin = () => {
  const url =`${BASE_URL}/employer/Employee_LogIn/`;
  const [error, setError] = useState("");

  const login = async (formData) => {
    try {
      const response = await axios.post(url, formData);
      return response.data;
    } catch (error) {
      setError(error.response?.data.detail || "An error occurred");
      
    }
  };

  return { login, error };
};

export default useLogin;
