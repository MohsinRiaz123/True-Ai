import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../Config/Config';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const navigate=useNavigate()
   const url = `${BASE_URL}/candidate/Candidate_SignUp/`
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (values) => {
    setLoading(true);
    setError(null); // Reset error before making a new request
    try {
      const response = await axios.post(url, values);
      setData(response.data);
      navigate('/login'); // Navigate after successfully receiving response
    } catch (err) {
      // Check if the error has a response and if so, get the data
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.data && err.response.data.error) {
          setError(err.response.data.error); // Use the structured error message
        }
        else if (err.response.data && err.response.data.email) {
          setError(err.response.data.email); // Use the structured error message
        } else {
          setError('An error occurred.'); // Fallback error message
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, error, loading };
};

export default useSignup;
