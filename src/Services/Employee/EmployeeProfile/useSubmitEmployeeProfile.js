import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Function to submit profile data
const submitProfile = async (formData) => {
 const email=localStorage.getItem('email');

  try {
    const response = await axios.post(
      `${BASE_URL}/employer/ProfileEdit/${email}/`,
      formData
    );
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error handling
    console.error("Error posting data:", error.response ? error.response.data : error.message);
    throw error.response.data.msg; // Re-throw the error for further handling if needed
  }
};

const useSubmitEmployeeProfile = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: submitProfile,
    onSuccess: (data) => {
      if (data) { // Check if the response indicates success
        navigate("/empDashboard");
      } else {
        console.error("Server response indicates failure:", data.message);
      }
    },
    onError: (error) => {
      console.error("Error posting data:", error);
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

export default useSubmitEmployeeProfile;
