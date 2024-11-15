import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const useAddOpenJob = () => {
    const email = localStorage.getItem("email");
  const url =`${BASE_URL}/user/Job_Vacancy/${email}/`;
  const [error, setError] = useState("");

  const Add= async (data) => {
    try {
      const response = await axios.post(url, data);
    
      return response.data;
    } catch (error) {
      setError(error.response?.data.detail || "An error occurred");
      
    }
  };

  return { Add, error };
};

export default useAddOpenJob
