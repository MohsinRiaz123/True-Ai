import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const getData = async (email) => {
  const headers = {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  };

  // Send a POST request with the email formatted correctly
  const response = await axios.post(
    `${BASE_URL}/employer/SelectCandidate/`,
    email, // Send the email directly as a property
    { headers }
  );

  return response.data; // Return the response data
};

export const useGetCandidateProfileData = (email) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getDetails", email],
    queryFn: () => getData(email),
    enabled: !!email, // Only run the query if email is provided
  });

  return { data, isLoading, isError };
};
