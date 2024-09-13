import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Styling for the component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: #ffffff;
  margin: 20px auto;
  max-width: 1200px;
  color: black;
  font-size: 2rem;
`;

const StyledDiv = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: darkgreen;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: darkgreen;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: darkgreen;
  }
`;

const StyledLink = styled.a`
  color: teal;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.75rem;
  font-weight: bold;
`;

const Text = styled.h5`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
`;

const TabsContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 1rem;
  text-align: center;
  background-color: ${(props) => (props.isActive ? '#ffffff' : '#f7fafc')};
  border: none;
  border-bottom: ${(props) => (props.isActive ? '2px solid teal' : 'none')};
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    background-color: #edf2f7;
  }
`;

const TabPanels = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
`;

const TabPanel = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`;

export default function Auth() {
    const navigate = useNavigate(); // Call useNavigate hook here

  // State to toggle between 'signin' and 'signup'
  const [activeTab, setActiveTab] = useState("signup");

  // State for form data for both login and signup
  const [formData, setFormData] = useState({
    userId: "",
    userNickname: "",
    email: "",
    password: "",
  });

  // State for success and error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mutation for SignUp
  const signupMutation = useMutation(
    async (newUser: typeof formData) => {
      const response = await axios.post('http://localhost:5002/api/users/signUp', newUser);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setSuccessMessage('Account created successfully!');
      },
      onError: (error: any) => {
        console.error('Error:', error.response?.data || error.message);
        setSuccessMessage('Sign up failed. Please try again.');
      }
    }
  );

  // Mutation for SignIn
  const loginMutation = useMutation(
    async (loginUser: { userId: string; password: string }) => {
      const response = await axios.post(
        'http://localhost:5002/api/users/signIn', 
        loginUser,
        { withCredentials: true }  // This ensures cookies are included in the request
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        setSuccessMessage('Login Successful!');
        localStorage.setItem('authToken', data.token);
        navigate('/'); // Redirect to homepage after successful login
      },
      onError: (error: any) => {
        console.error('Error:', error.response?.data || error.message);
        setSuccessMessage('Login failed. Please try again.');
      }
    }
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup Form submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData); // Trigger signup mutation
  };

  // Handle Login Form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ userId: formData.userId, password: formData.password }); // Trigger login mutation
  };

  return (
    <Container>
      <Heading>{activeTab === "signup" ? "Create your account" : "Sign in to your account"}</Heading>
      <Text>
        {activeTab === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
        <StyledLink onClick={() => setActiveTab(activeTab === "signup" ? "signin" : "signup")}>
          {activeTab === "signup" ? "Sign in" : "Sign up"}
        </StyledLink>
      </Text>

      <TabsContainer>
        <TabList>
          <Tab isActive={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
            Sign Up
          </Tab>
          <Tab isActive={activeTab === 'signin'} onClick={() => setActiveTab('signin')}>
            Sign In
          </Tab>
        </TabList>

        <TabPanels>
          {/* Signup Form */}
          <TabPanel hidden={activeTab !== 'signup'}>
            <form onSubmit={handleSignupSubmit}>
              <StyledDiv>
                <StyledLabel htmlFor="userId">User ID</StyledLabel>
                <StyledInput
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="abc123"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <StyledLabel htmlFor="userNickname">Name</StyledLabel>
                <StyledInput
                  id="userNickname"
                  name="userNickname"
                  type="text"
                  placeholder="John Doe"
                  value={formData.userNickname}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <StyledLabel htmlFor="email">Email address</StyledLabel>
                <StyledInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <StyledLabel htmlFor="password">Password</StyledLabel>
                <StyledInput
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <Button type="submit" disabled={signupMutation.isLoading}>
                {signupMutation.isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
            {signupMutation.isError && <p style={{ color: 'red' }}>{signupMutation.error?.message}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </TabPanel>

          {/* SignIn Form */}
          <TabPanel hidden={activeTab !== 'signin'}>
            <form onSubmit={handleLoginSubmit}>
              <StyledDiv>
                <StyledLabel htmlFor="userId">User ID</StyledLabel>
                <StyledInput
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="abc123"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <StyledLabel htmlFor="password">Password</StyledLabel>
                <StyledInput
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </StyledDiv>
              <Button type="submit" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            {loginMutation.isError && <p style={{ color: 'red' }}>{loginMutation.error?.message}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </TabPanel>
        </TabPanels>
      </TabsContainer>
    </Container>
  );
}
