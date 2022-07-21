import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Fab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
// import { Flex, IconButton, Text, Video } from "@100mslive/react-ui";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import {
  useHMSActions,
  useHMSStore,
  selectScreenShareByPeerID,
  selectPeers,
  selectLocalPeer,
  selectPeerScreenSharing,
} from "@100mslive/react-sdk";
import { hmsStore } from "../utils/hms";
import "./Room.css";
import ThreeDSpace from "../components/3DView/App";
import styled from "styled-components";
const LeaveRoom = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  color: white;
  border-radius: 10px;
  background-color: #7d327d;
  cursor: pointer;
  z-index: 1000;
`;
const Room = () => {
  const [videoSrc, setVideoSrc] = useState();
  const [localPeer, setLocalPeer] = useState(useHMSStore(selectLocalPeer));

  const params = useParams();
  const hmsActions = useHMSActions();
  var peers = useHMSStore(selectPeers);
  const [localPeerid, setlocalPeerid] = useState("");
  const presenter = hmsStore.getState(selectPeerScreenSharing);
  const videoRef = useRef();
  const track = useHMSStore(selectScreenShareByPeerID(localPeerid));

  useEffect(() => {
    if (localPeer) {
      setlocalPeerid(localPeer?.id);
    }
  }, [localPeer]);

  useEffect(() => {
    (async () => {
      if (videoRef && videoRef.current && track) {
        if (track.enabled) {
          await hmsActions.attachVideo(track.id, videoRef.current);
          setTimeout(() => {
            setVideoSrc(videoRef.current);
          }, 3000);
        } else {
          await hmsActions.detachVideo(track.id, videoRef.current);
        }
      }
    })();
  }, [videoRef, track]);

  const onAudio = async () => {
    await hmsActions.setLocalAudioEnabled(true);
  };

  const enableScreenShare = async () => {
    // if (hmsActions) {
    await hmsActions.setScreenShareEnabled(true, { videoOnly: true });
    // }
  };

  const screenshareVideoTrack = () => {
    if (presenter) {
      hmsStore.getState(selectScreenShareByPeerID(presenter.id));
    }
  };

  const locpeer = useHMSStore(selectLocalPeer);
  useEffect(() => {
    setLocalPeer(locpeer);
  });

  const leave = () => {
    hmsActions.leave();
  };

  return (
    <>
      <Fab
        style={{ position: "absolute", bottom: "20px", zIndex: "1000" }}
        onClick={onAudio}
        color="primary"
        aria-label="speak"
        id="mic-icon"
      >
        <MicIcon />
      </Fab>

      <Fab
        style={{ position: "absolute", bottom: "20px", zIndex: "1000" }}
        id="src-icon"
        onClick={async () => {
          await hmsActions.setScreenShareEnabled(true, { videoOnly: true });
          await hmsStore.getState(selectScreenShareByPeerID(presenter.id));
        }}
        color="primary"
        aria-label="speak"
      >
        <ScreenShareIcon />
      </Fab>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          zIndex: "0",
          position: "absolute",
          top: "0",
          opacity: "0",
        }}
      ></video>

      <LeaveRoom onClick={leave}>Leave room</LeaveRoom>
      <Suspense fallback={null}>
        <ThreeDSpace videoSrc={videoSrc} />
      </Suspense>
    </>
  );
};

export default Room;
