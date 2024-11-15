import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useMutation } from "@tanstack/react-query";

// Function to submit profile data
const deleteProfile = async (id) => {
    // const email = localStorage.getItem("email");
  try {
    const response = await axios.delete(
      `${BASE_URL}/employer/EmployeeDelete/${id}/`,
    );
    return response.data; // Return the response data
  } catch (error) {
    // Enhanced error handling
    console.error("Error posting data:", error.response ? error.response.data : error.message);
    throw error.response.data.msg; // Re-throw the error for further handling if needed
  }
};

const usedeleteUser = () => {
 

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data) => {
      if (data) { // Check if the response indicates success
        console.log(data)
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

export default usedeleteUser;