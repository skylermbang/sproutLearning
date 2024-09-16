import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';


const token = Cookies.get('authToken');
console.log('token', token);  

// Utility to extract a specific cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Define the shape of the user data (optional, for typing)
interface User {
  userId: string;
  userNickname: string;
}

// Hook to fetch the current authenticated user
const useUser = () => {
  return useQuery<User, Error>('currentUser', async () => {
    try {
      // First attempt: Try fetching with credentials (cookie-based)
      const response = await axios.get<User>('http://localhost:5002/api/users/me', {
       withCredentials : true // Ensure cookies are sent
      });
      return response.data; // If successful, return user data

    } catch (error) {
      console.error('Failed with cookie, trying with token from cookie:', error);

      // Second attempt: Manually get token from cookie
      let token = getCookie('authToken'); // Assuming 'authToken' is the cookie name
      if (!token) {
        token = localStorage.getItem('authToken');
      }

      // Try fetching with the Authorization header using the token from the cookie
      const responseWithToken = await axios.get<User>('http://localhost:5002/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      return responseWithToken.data; // Return the response if successful
    }
  });
};

export default useUser;
