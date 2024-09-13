import { useQuery } from 'react-query';
import axios from 'axios';

// Hook to fetch the current authenticated user
const useUser = () => {
  return useQuery('currentUser', async () => {
    try {
      // First attempt: Try fetching with credentials (cookie-based)
      const response = await axios.get('http://localhost:5002/api/users/me', {
        withCredentials: true, // Ensure cookies are sent
      });
      return response.data; // If successful, return user data

    } catch (error) {
      console.error('Failed with cookie, trying with token:', error);

      // Second attempt: Try with token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found in localStorage');
      }

      // Try fetching with the Authorization header using the token
      const responseWithToken = await axios.get('http://localhost:5002/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      return responseWithToken.data; // Return the response if successful
    }
  });
};

export default useUser;
