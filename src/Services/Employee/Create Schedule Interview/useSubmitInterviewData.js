import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useMutation } from "@tanstack/react-query";

// Function to submit profile data
const sendRequest = async (formData) => {
  // const email = localStorage.getItem("email");

  const employer_email = localStorage.getItem("email");
  try {
    const response = await axios.post(
      `${BASE_URL}/employer/Schedule_Interview/${employer_email}/`,
      formData
    );
    console.log("API Response:", response);
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error handling
    console.error(
      "Error posting data:",
      error.response ? error.response.data : error.message
    );
    throw error.response.data.msg; // Re-throw the error for further handling if needed
  }
};

const useSubmitInterviewData = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendRequest,
    onSuccess: (data) => {
      if (data) {
        console.log("Data submitted successfully:", data);
      } else {
        console.error("Server response indicates failure:", data.message);
      }
    },
    onError: (error) => {
        console.log("msg",error.massage)
      console.error("Error posting data:", error);
      // Here you could show a notification or set a state to display the error
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error, // Return error for potential display
  };
};

export default useSubmitInterviewData;
