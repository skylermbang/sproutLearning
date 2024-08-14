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


const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1200px;
  color: #e5dada;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: #f0e0b6;
  margin: 20px auto;
  max-width: 1200px;
  color: black;
  font-size: 2rem;

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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    line-height: 1.5;

    .text-primary {
      color: #007bff; /* Primary color */
    }

    .loop-text {
      display: inline-block;

      span {
        display: inline-block;
        margin-right: 5px;
        color: inherit;
        text-decoration: underline;
        animation: loop 10s linear infinite;

        &:nth-child(1) {
          animation-delay: 0s;
        }

        &:nth-child(2) {
          animation-delay: 2.5s;
        }

        &:nth-child(3) {
          animation-delay: 5s;
        }

        &:nth-child(4) {
          animation-delay: 7.5s;
        }
      }
    }
  }

  @keyframes loop {
    0% { opacity: 0; }
    25% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
  }
`;

const Button = styled.a`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

function Landing() {
  return (
    <div>
      
      <Container3>
      <h1>We are Sprout Learning, dedicated to nurturing young minds by fostering connections and unlocking their full potential. Through innovative learning experiences, we empower children to explore, grow, and thrive in a connected world.</h1>
      </Container3>
      <Container2>
        <Photo src={pic4} alt="Pic4" />
        <h1> Going Around the World with Sprout Learning</h1>
      </Container2>
      
      <Container3>
        <SliderWrapper>

          <SimpleImageSlider
            width="80%"
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </SliderWrapper>

      </Container3>


      <Container>
        <Row>
          <p className="small text-uppercase mb-4">Do you want to join us?</p>
          <SectionTitle>
            <h2 className="title">Let’s make a wonderful <br />
            <span className="text-primary loop-text text-underline">
                <span> Build a brilliant mind </span>
                <span> and friends</span>
            </span> together!
            </h2>
          </SectionTitle>
          <Button href="contact.html">Get in touch!</Button>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
