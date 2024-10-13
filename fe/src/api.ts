import axios from 'axios';

// Ensure REACT_APP_API_BASE_URL is accessible and correctly set
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002/api';
console.log("API Base URL:", baseURL);  // Log to verify the URL



const api = axios.create({
    baseURL,
    withCredentials: true,  // Include cookies if needed for authentication
});

// Function to fetch enrollments for a specific user
export const fetchUserEnrollments = async (userId: string) => {
    //console.log("Fetching enrollments for user:", userId); // Log for debugging
    const response = await api.get(`/enrollments/users/${userId}`);
    return response.data;
};

// Function to enroll a user in a class
export const enrollUserInClass = async (classId: string) => {
    const response = await api.post('/enrollments', { classId });
    return response.data;
};

export const removeUserEnrollment = async ({ classId, userId }: { classId: string; userId: string }) => {
    const response = await api.delete(`/enrollments/users/${userId}/classes/${classId}`);
    return response.data;
  };

export const addClass = async (newClass: any) => {
    //console.log("API request to add class:", newClass); // Log the data being sent
    const response = await api.post('/classes', newClass);
    //console.log("API response:", response.data); // Log the response data
    return response.data;
};

// Sign Up Function
export const signUp = async (newUser: { userId: string; password: string; email: string }) => {
    //console.log("API request to sign up user:", newUser); // Log the data being sent
    const response = await api.post('/users/signUp', newUser);
    //console.log("API response:", response.data); // Log the response data
    return response.data;
};

// Sign In Function
export const signIn = async (loginUser: { userId: string; password: string }) => {
    //console.log("API request to sign in user:", loginUser); // Log the data being sent
    const response = await api.post('/users/signIn', loginUser);
    //console.log("API response:", response.data); // Log the response data
    return response.data;
};


export default api;
