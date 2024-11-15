import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../../Config/Config";

const useGetQuestions = () => {
  const url = `${BASE_URL}/employer/Sim_Tech/`;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(url, data);
      return response.data;
    },
  });

  return {
    getData: mutation.mutateAsync, // Use mutateAsync for async/await handling
    error: mutation.error,
    isLoading: mutation. isLoading, // Use isLoading instead of isPending
    data: mutation.data,
   
  };
};

export default useGetQuestions;
