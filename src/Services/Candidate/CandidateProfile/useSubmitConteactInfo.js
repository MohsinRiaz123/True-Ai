import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Function to submit profile data
const submitProfile = async (formData) => {
  const email = localStorage.getItem("email");

  try {
    const response = await axios.post(
      `${BASE_URL}/candidate/Candidate_profile2/${email}/`,
      formData
    );
    localStorage.setItem("email",formData.email);
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error handling
    console.error(
      "Error posting ",
      error.response ? error.response.data.msg : error.msg
    );
    throw error.response.data.msg; // Re-throw the error for further handling if needed
  }
};

const useSubmitContectInfo = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: submitProfile,
    onSuccess: (data) => {
      if (data) {
          navigate("/candidateInfo/additional");
       
      } else {
        console.error("Server response indicates failure:", data.msg);
      }
    },
    onError: (error) => {
      console.error("Error posting data: on error ", error.response.data.msg);
      // Here you could show a notification or set a state to display the error
    },
  });

  return {
    mutate,
    isLoading,
    isError,
    error, // Return error for potential display
  };
};

export default useSubmitContectInfo;
