import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import useUser from '../hooks/useUser';
import Admin from "./Admin";
import { Student } from "./Student";

interface SectionContainerProps {
    bgColor?: string;
  }

  


// Styled Components
const SectionContainer = styled.div<SectionContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 90%;
  color: #333;
  font-size: 1.5rem;
  padding: 2rem;
  background-color: ${({ bgColor }) => bgColor || "#f5f6fa"};
  text-align: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Badge = styled.span`
  background-color: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const IconBookOpen = styled.div`
  width: 16px;
  height: 16px;
  background-color: #666;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 12V4m0 0a8 8 0 018 8m-8-8a8 8 0 00-8 8m8-8v16m-6-6l-2 2m12-2l2 2m0 0V10a2 2 0 00-2-2h-4a2 2 0 00-2 2v12m-2-4l2-2m0 0l2 2m0-2l2-2m0 0V4"/></svg>') no-repeat center;
`;

const IconCalendar = styled.div`
  width: 16px;
  height: 16px;
  background-color: #666;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-8 0h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>') no-repeat center;
`;

// Main AboutPage Component
const Profile = () => {
  const { data:user, isLoading, error } = useUser();


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div>
      <Header />
      <SectionContainer>  
        <Card>
          <CardHeader>
            <div style={{ flex: 1 }}>
              <CardTitle>{user ? user.userId : "Jane Doe"}</CardTitle>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>{user ? user.email : "jane.doe@example.com"}</div>
            </div>
          
            {user?.admin ?  <Badge>Student</Badge>:<Badge>Admin</Badge> }

          </CardHeader>
          <CardContent>
            <InfoRow>
              <IconBookOpen />
              <span>Sprout E-Learning</span>
            </InfoRow>
            <InfoRow>
              <IconCalendar />
              <span>More features incoming</span>
            </InfoRow>
          </CardContent>
        </Card>
      </SectionContainer>
      <SectionContainer>
        <Admin></Admin>
        <Student></Student>
      </SectionContainer>
      <Footer />
    </div>
  );
};

export default Profile;
