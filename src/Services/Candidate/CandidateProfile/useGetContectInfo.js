import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const submitProfile = async (formData) => {
  const headers = {
    "ngrok-skip-browser-warning": "adsadas",
  };
  const email = localStorage.getItem("email");
  const response = await axios.get(
    `${BASE_URL}/candidate/Candidate_profile2/${email}/`,
    { headers }
  );
  return response.data; // Return the response data
};

export const useGetContectInfo = () => {
  // Function to submit profile data

  // Fetch the initial profile data using useQuery with caching options
  const { data,  isLoading, } = useQuery({
    queryKey: ["getProfile2"],
    queryFn: submitProfile,
  });

  return {  data, isLoading};
};

