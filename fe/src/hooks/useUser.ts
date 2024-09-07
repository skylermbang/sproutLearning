// src/hooks/useUser.js
import { useQuery } from 'react-query';
import axios from 'axios';

const useUser = (userId: string) => {
  return useQuery(['user', userId], async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/users/${userId}`);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  });
};

export default useUser;
