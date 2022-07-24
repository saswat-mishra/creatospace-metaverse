import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useStore from "../store";
import { hmsActions } from "../utils/hms";
import { HMSLogLevel } from "@100mslive/react-sdk";
import Profilecard from "../components/ProfileCard/Profilecard";

const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const SubHead = styled.p`
  font-size: 15px;
  color: darkorange;
  font-weight: 600;
`;
const CreateRoomBtn = styled.div`
  background-color: #bf8c00;
  color: #231e39;
  border-radius: 7px;
  padding: 10px 30px;
  cursor: pointer;
`;
const RoomContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  // margin: auto;
`;
const LoaderContainer = styled.div``;
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
  margin-top: 10%;
`;
const MainHead = styled.p`
  font-size: 40px;
  color: white;
  font-weight: 600;
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
const ProfileImg = styled.img`


  border-radius: 20px;
  display: flex;
`;
const Roomhead = styled.p`
  font-size: 30px;
  color: darkorange;
  font-weight: 600;
`;
const Creator_profile = (props) => {
  const rooms = useStore((state) => state.rooms);
  const creators = useStore((state) => state.creators);
  const getRooms = useStore((state) => state.getRooms);
  hmsActions.setLogLevel(HMSLogLevel.WARN);
  useEffect(() => {
    getRooms();
    getCreators();
  }, []);
  const getCreators = useStore((state) => state.getCreators);
  hmsActions.setLogLevel(HMSLogLevel.WARN);
  let id = useParams().id;
  console.log(id);
  return (
    <>
    {creators.map((e, index) => (
      (() => {
        if (e._id==id) {
          return (
            <>
            <FeedContainer>
              
              <HeadContainer>
            <ProfileImg
        src="https://randomuser.me/api/portraits/women/79.jpg"
        alt="user"
      />
            <MainHead>{e.cname}</MainHead>
            <SubHead>{e.subscriber} subscribers</SubHead>
            <OptButton>Subscribe</OptButton>
            </HeadContainer>
            <Roomhead>Join {e.cname}'s Rooms: </Roomhead>
            {rooms ? (
              <RoomContainer>
                {rooms.map((e, index) => (
                  <Profilecard
                    name={e.name}
                    desc={e.desc}
                    price={e.price}
                    id={e._id}
                    key={index}
                  ></Profilecard>
                ))}
              </RoomContainer>
            ) : (
              <LoaderContainer>
                <h2>Loading...</h2>
              </LoaderContainer>
            )}
            </FeedContainer>
            </>
          )
        }  else {
          return 
        }
      })()
    ))}
    
    </>
  );
};

export default Creator_profile;
