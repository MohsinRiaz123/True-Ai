import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const getList = async () => {
  const email = localStorage.getItem("email");
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const response = await axios.get(
    `${BASE_URL}/employer/General_Candidate/${email}/`,
    { headers }
  );
  return response.data; // Return the response data
};

export const useGetListOfCandidate = () => {
  // Function to submit profile data

  // Fetch the initial profile data using useQuery with caching options
  const { data, isLoading } = useQuery({
    queryKey: ["getCandidate"],
    queryFn: getList,
  });
  return { data, isLoading };
};
