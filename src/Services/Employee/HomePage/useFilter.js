import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const useFilter = () => {
    const email = localStorage.getItem("email");
  const url =`${BASE_URL}/employer/CandidateSearch/${email}/`;
  const [error, setError] = useState("");
  const [load, setload] = useState(false);

  const filter= async (data) => {
    setload(true);
    try {
      const response = await axios.post(url, data);
      setload(false)
      return response.data;
    } catch (error) {
        setload(false)
      setError(error.response?.data.detail || "An error occurred");
      
    }
  };

  return { filter, error,load };
};

export default useFilter
