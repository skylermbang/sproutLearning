import { useQuery } from 'react-query';
import axios from 'axios';

interface UserProps {
  userId: string;
  userNickname: string;
  email: string;
  admin: boolean;
}

// Hook to fetch the current authenticated user
const useUser = () => {
  return useQuery<UserProps, Error>('currentUser', async () => {
    try {
      // Fetch user data from the /me endpoint
      const response = await axios.get('http://localhost:5002/api/users/me', {
        withCredentials: true, // Ensure cookies are sent
      });

      if (response.data.success) {
        return response.data.user; // Return the user data if the request is successful
      } else {
        throw new Error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Handle error
    }
  });
};

export default useUser;
