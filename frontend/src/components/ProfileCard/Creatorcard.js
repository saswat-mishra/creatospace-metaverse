import React from "react";
import JoinForm from "../JoinButton/JoinForm";
import styled from "styled-components";

const Card = styled.div`
  font-family: Montserrat, sans-serif;
  height: 350px;
  width: 370px;
  background-color: #231e39;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
  color: #b3b8cd;
  border-radius: 7px;
  margin: 25px 0;
`;

const SpanPro = styled.span`
  color: #231e39;
  background-color: #febb0b;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  margin: 15px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RoomName = styled.p`
  font-size: 24px;
  margin: 10px;
`;
const RoomDetails = styled.p`
  font-size: 18px;
  margin: 10px;
`;
const OptButton= styled.button`
  font-size: 18px;
  color: white;
  border: 0;
  background-color: red;
  display: inline;
  border-radius: 5px;
  padding:5px;

`;
const ExpButton= styled.button`
font-size: 18px;
color: white;
margin-top: 5px;
border: 0;
background-color: darkorange;
display: inline;
border-radius: 5px;
padding:3px;
`;
function Profilecard(props) {
  // console.log(props);
  const name = props.name;
  const desc = props.desc;
  const creator_id = props.id;
  return (
    <Card>
      {/* <SpanPro>{1000}</SpanPro> */}
      <ProfileImg
        src="https://randomuser.me/api/portraits/women/79.jpg"
        alt="user"
      />
      <DetailsContainer>
        <RoomName>{name}</RoomName>
        <RoomDetails>Subscribers: {desc}</RoomDetails>
      </DetailsContainer>
      <OptButton>Subscribe</OptButton>
      <ExpButton>Explore more</ExpButton>
      {/* <JoinForm id={creator_id} /> */}
    </Card>
  );
}

export default Profilecard;
