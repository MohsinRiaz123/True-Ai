import axios from "axios";
import { BASE_URL } from "../../../Config/Config";
import { useQuery } from "@tanstack/react-query";

const getDetails = async () => {
  const email = localStorage.getItem("email");
  const headers = {
    "ngrok-skip-browser-warning": "true",
  };
  const response = await axios.get(`${BASE_URL}/employer/General/${email}/`, {
    headers,
  });
  return response.data; // Return the response data
};

const useGetEmployerDashboardData = () => {
  // Fetch the initial profile data using useQuery with caching options
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getDetails"],
    queryFn: getDetails,
  });

  return { data, isLoading, isError, error }; // Return all relevant states
};

export default useGetEmployerDashboardData;
