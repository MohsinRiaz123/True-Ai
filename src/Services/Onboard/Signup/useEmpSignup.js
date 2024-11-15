import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../Config/Config';
import {  useNavigate } from 'react-router-dom';

const useEmpSignup = () => {
    const navigate = useNavigate();

   const url = `${BASE_URL}/employer/Employee_SignUp/`
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (values) => {

    setLoading(true);
    setError(null); // Reset error before making a new request
    try {
      const response = await axios.post(url, values);
      setData(response.data);
      navigate("/login")
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, error, loading };
};

export default useEmpSignup;
