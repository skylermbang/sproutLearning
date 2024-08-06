import React from "react";
import styled from "styled-components";
import SimpleImageSlider from "react-simple-image-slider";
import pic1 from '../assets/1.jpg';
import pic2 from '../assets/2.jpg';
import pic3 from '../assets/3.jpg';
import pic4 from '../assets/6.jpg';

const images = [
  { url: pic1 },
  { url: pic2 },
  { url: pic3 }
];

const Content = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1200px;
  color: black;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: #dfddc9;
  margin: 20px auto;
  max-width: 1200px;
  color:black;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Photo = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
`;

function Landing() {
  return (
    <div>
      <Wrapper2>
        <Photo src={pic4} alt="Pic4" />
        <h1> Going Around the World with Sprout Learning</h1>
      </Wrapper2>
      <Wrapper>
       
        <SimpleImageSlider
          width="80%"
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </Wrapper>
    </div>
  );
}

export default Landing;
