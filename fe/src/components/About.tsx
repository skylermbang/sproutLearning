import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import logo from "../assets/logo2.png"; // Make sure this path is correct
import BDD from "../assets/bdd.jpg"
import Skyler from "../assets/skyler.jpg"
import Adit from "../assets/adit.jpg"
import Jacky from "../assets/jackkie.jpg"
import Guo from "../assets/guo.jpg"

interface SectionContainerProps {
  bgColor?: string;
}


// Styled components for the layout
const AboutSection = styled.section`
  padding: 4rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: darkgreen;
  text-align: center;

`;



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

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: darkgreen;
`;

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Card = styled.li`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-size: 1.2rem;
  color: #333;

  strong {
    color: darkgreen;
  }

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SpinningCircle = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleText = styled.svg`
  max-width: 200px;
  max-height: 200px;
  animation: spin 10s linear infinite;
  text {
    fill: darkgreen;
    font-size: 2.2rem;
    letter-spacing: 2px;
  }
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;


const Partner = styled.div`
width: 200px;
height: 200px;
background-image: url(${BDD});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 1rem; /* Space between the box and the text */
`

const Timeline = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const TimelineItem = styled.div`
  margin: 20px 0;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

const TimelineContent = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 80%;
  margin: 0 auto;
  text-align: left;
`;


const TeamCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;
const Picture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 0.5rem;
`;

const Expertise = styled.p`
  font-size: 1.2rem;
  color: #007bff;
  margin: 0 0 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;


const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two cards per row
  gap: 20px;
  padding: 20px;
`;

const Team = [
  {
    Picture: Skyler,
    name: "Skyler Minsu Bang",
    desc: "Experienced in teaching English and programming, currently spearheading the development and technological direction of Sprout Learning",
    Expertise: "Lead Software Engineer",
  },
  {
    Picture: Adit,
    name: "Adit",
    desc: "Expert in business relations and international politics, driving strategic operations at Sprout Learning.",
    Expertise: "Lead of Operations and Strategy ",
  },
  {
    Picture: Guo,
    name: "Guo Cheng",
    desc: "PTE/ILETS English Educator & Passionate AI and Backend Software Engineer",
    Expertise: "Software Engineer",
  },
  {
    Picture: Jacky,
    name: "Jacky Chiakang Ni",
    desc: "Experienced in eucational PPP(Public-Private-Parnership) projects and consulting ,now leading strategic marketing initiative",
    Expertise: "Head of Marketing and Strategy",
  },
  // Add more team members here...
];
// Main AboutPage Component
const AboutPage = () => (
  <div>
    <Header />
    <AboutSection>
      <div className="container">
        
        <Title>About Sprout Learning</Title>
      </div>
    </AboutSection>
    <SpinningCircle>
      <CircleText viewBox="0 0 460 460">
        <defs>
          <path
            id="circle-button-text"
            d="M230,380 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          />
        </defs>
        <text>
          <textPath href="#circle-button-text">
            Critical Thinking — Innovation — Empowerment —
          </textPath>
        </text>
      </CircleText>
    </SpinningCircle>
    <SectionContainer >
     
      <p>
        At Sprout Learning, we are dedicated to shaping tomorrow's leaders by nurturing creativity 
        and critical thinking in today's students. Through our innovative, game-based learning 
        approach, we help young minds develop essential skills that are crucial for success in 
        the modern world.
      </p>
    </SectionContainer>
    <SectionContainer >
      <SectionTitle>Our Unique Learning Experiences</SectionTitle>
      <CardList>
        <Card><strong>Situation-Based Card Game:</strong> A game designed to teach students about entrepreneurship and problem-solving through real-world scenarios.</Card>
        <Card><strong>Online Interactive Learning:</strong> An online platform that extends the learning experience with interactive games and community-driven projects.</Card>
        <Card><strong>Community Learning:</strong> Students across schools can share their projects, participate in competitions, and collaborate on ideas.</Card>
      </CardList>
    </SectionContainer>


    <SectionContainer >
    <SectionTitle> Team Sprout </SectionTitle>
    <CardGrid>
    {Team.map((member, index) => (
      <TeamCard key={index}>
        <Picture src={member.Picture} alt={member.name} />
        <Content>
          <Name>{member.name}</Name>
          <Expertise>{member.Expertise}</Expertise>
          <Description>{member.desc}</Description>
        </Content>
      </TeamCard>
    ))}
  </CardGrid>

   
    </SectionContainer>


    <SectionContainer >
    <SectionTitle> Partnership</SectionTitle>
    <CardList>
    <Card>
        <Partner> </Partner>
        Talent Beyond Borders
        </Card>
    </CardList>
    </SectionContainer>

  
  
    <SectionContainer >
    <SectionTitle> Awards & Recognition </SectionTitle>

    <Timeline>
      <TimelineItem>
        <TimelineContent>
          <h3>National Teaching and Learning Information Practice Exchange</h3>

           award by Chinese Ministry of Education 
          <p>Creative Award - 2022</p>
        </TimelineContent>
      </TimelineItem>
      {/* Add more timeline items here */}
    </Timeline>
    </SectionContainer>
    <Footer />
  </div>
);

export default AboutPage;
