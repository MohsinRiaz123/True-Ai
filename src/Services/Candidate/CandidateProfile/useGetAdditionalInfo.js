import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const submitProfile = async (formData) => {
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const email = localStorage.getItem("email");
  const response = await axios.get(
    `${BASE_URL}/candidate/Candidate_profile3/${email}/`,
    { headers }
  );
  return response.data; // Return the response data
};

export const useGetAdditionalInfo = () => {
  // Function to submit profile data

  // Fetch the initial profile data using useQuery with caching options
  const { data,  isLoading, } = useQuery({
    queryKey: ["getProfile3"],
    queryFn: submitProfile,
  });

  return {  data, isLoading};
};

