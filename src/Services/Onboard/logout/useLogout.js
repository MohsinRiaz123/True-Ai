import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const useLogout = () => {
  const URL = `${BASE_URL}/employer/Employee_LogOut/`;
  const [error, setError] = useState("");

  const logout = async (email, refreshToken) => {
    try {
      const response = await axios.post(`${URL}${email}/${refreshToken}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data; // Return success response data if needed
      } else {
        setError(response.data.detail || "An error occurred during logout");
        throw new Error(response.data.detail || "An error occurred");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "An error occurred");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return { logout, error };
};

export default useLogout;
