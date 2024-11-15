import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const fatchData = async () => {
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const email = localStorage.getItem("email");
  const response = await axios.get(
    `${BASE_URL}/candidate/template_Resume/${email}/`,
    { headers }
  );
  return response.data; // Return the response data
};

export const useGetResumeData = () => {
  // Function to submit profile data

  // Fetch the initial profile data using useQuery with caching options
  const { data,  isLoading, } = useQuery({
    queryKey: ["resumeData"],
    queryFn: fatchData,
  });

  return {  data, isLoading};
};

