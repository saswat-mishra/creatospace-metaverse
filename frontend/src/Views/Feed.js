import { HMSLogLevel } from "@100mslive/react-sdk";
import React, { useEffect, useState } from "react";
import Profilecard from "../components/ProfileCard/Profilecard";
import Creatorcard from "../components/ProfileCard/Creatorcard";
import { hmsActions } from "../utils/hms";
import styled from "styled-components";
import useStore from "../store";
const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const MainHead = styled.p`
  font-size: 40px;
  color: white;
  font-weight: 600;
`;
const SubHead = styled.p`
  font-size: 30px;
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
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 10px;
`;
function Feed() {
  const rooms = useStore((state) => state.rooms);
  const creators = useStore((state) => state.creators);
  const getRooms = useStore((state) => state.getRooms);
  hmsActions.setLogLevel(HMSLogLevel.WARN);
  useEffect(() => {
    getRooms();
  }, []);
  const getCreators = useStore((state) => state.getCreators);
  hmsActions.setLogLevel(HMSLogLevel.WARN);
  useEffect(() => {
    getCreators();
  }, []);

  return (
    <FeedContainer>
      <HeadContainer>
        <CreateRoomBtn>Create Room</CreateRoomBtn>
        <MainHead>Join your favourite events here!</MainHead>
      </HeadContainer>
      <section id="user-friends">
        <SubHead>Creators</SubHead>
        {creators.map((e, index) => (
            <Creatorcard
              name={e.cname}
              desc={e.roomsOwned}
              price={e.subscriber}
              id={e._id}
              key={index}
            ></Creatorcard>
          ))}
    </section>
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
  );
}

export default Feed;
