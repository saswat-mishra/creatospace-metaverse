import React, { useEffect } from "react";
import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import getToken from "../../utils/getToken";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useStore from "../../store";

const JoinButton = styled.div`
  border: 1px solid black;
  padding: 10px 15px;
  border-radius: 7px;
  background-color: #03bfcb;
  color: #231e39;
  margin: 35px 0 0 0;
  cursor: pointer;
`;
function JoinForm(props) {
  const hmsActions = useHMSActions();

  const room_id = props.id;
  const hmsid = useStore((state) => state.HMSId);
  const getHMSId = useStore((state) => state.getHMSId);

  const [role, setRole] = useState("speaker");
  const user_id = localStorage.getItem("user_id");
  let nav = useNavigate();

  useEffect(() => {
    getHMSId(room_id);
  }, []);

  const joinRoom = () => {
    getToken(role, hmsid)
      .then((token) => {
        hmsActions.join({
          userName: user_id,
          authToken: token,
          settings: {
            isAudioMuted: true,
          },
          initEndpoint:
            process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined,
        });
        nav("../room/" + room_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <JoinButton onClick={joinRoom}>Join room</JoinButton>;
}

export default JoinForm;
