import React from "react";
import JoinForm from "../JoinButton/JoinForm";
import styled from "styled-components";

const Card = styled.div`
  font-family: Montserrat, sans-serif;
  height: 350px;
  width: 270px;
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

function Profilecard(props) {
  // console.log(props);
  const name = props.name;
  const desc = props.desc;
  const price = props.price;
  const room_id = props.id;
  return (
    <Card>
      {/* <SpanPro>{1000}</SpanPro> */}
      <ProfileImg
        src="https://randomuser.me/api/portraits/women/79.jpg"
        alt="user"
      />
      <DetailsContainer>
        <RoomName>{name}</RoomName>
        <RoomDetails>{desc}</RoomDetails>
      </DetailsContainer>
      <JoinForm id={room_id} />
    </Card>
  );
}

export default Profilecard;
