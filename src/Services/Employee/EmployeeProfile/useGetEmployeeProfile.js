import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const submitProfile = async (formData) => {
  const email = localStorage.getItem("email");
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const response = await axios.get(
    `${BASE_URL}/employer/ProfileEdit/${email}/`,
    { headers }
  );
  return response.data; // Return the response data
};

export const useGetEmployeeProfile = () => {
  // Function to submit profile data

  // Fetch the initial profile data using useQuery with caching options
  const { data,  isLoading, } = useQuery({
    queryKey: ["getEmpProfile"],
    queryFn: submitProfile,
  });

  return {  data, isLoading};
};

