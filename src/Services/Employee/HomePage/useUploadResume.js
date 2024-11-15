import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Function to submit profile data
const uploadResume = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/employer/Upload_Your_Resume/`,
      formData
    );
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error handling
    console.error(
      "Error posting data:",
      error.response ? error.response.data : error.message
    );
    throw (
      error.response?.data?.msg ||
      "Try again, Error occurred while uploading."
    ); // Use a fallback error message
  }
};

const useUploadResume = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      if (data) {
        navigate("/employe/scannedResume");
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
    isPending,
    isError,
    error, // Return error for potential display
  };
};

export default useUploadResume;
