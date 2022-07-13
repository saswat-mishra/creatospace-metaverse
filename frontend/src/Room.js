import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Fab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
// import { Flex, IconButton, Text, Video } from "@100mslive/react-ui";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
  selectIsLocalScreenShared,
  selectPeersScreenSharing,
  selectScreenShareByPeerID,
  selectPeerSharingAudio,
  selectScreenShareAudioByPeerID,
  selectPeers,
  selectIsConnectedToRoom,
  selectRoomState,
  selectLocalPeer,
  useScreenShare,
  selectIsAllowedToPublish,
} from "@100mslive/react-sdk";
import { hmsStore } from "./hms";
import JoinForm from "./JoinForm";
import User from "./components/User";
import "./Room.css";
import ThreeDSpace from "./components/3DView/App";
import styled from "styled-components";
import * as THREE from "three";
const LeaveRoom = styled.div`
position:absolute;
top:20px;
left:20px;
width:100px;
display:flex;
justify-content:center;
align-items:center;
border:1px solid black;
padding:10px;
color:white;
border-radius:10px;
background-color:#7d327d;
cursor:pointer;
z-index:1000;

`;
function Room() {
  const params = useParams();
  const room_id = params.id;
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const screenEnabled = useHMSStore(selectIsLocalScreenShared);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  var peers = useHMSStore(selectPeers);
  // Get the peer who is sharing audio only screenshare
  const [localPeer, setLocalPeer] = useState(useHMSStore(selectLocalPeer));

  const roomState = useHMSStore(selectRoomState);

  // to know if someone is screensharing
  const screenshareOn = hmsStore.getState(selectIsLocalScreenShared);

  // to get the HMSPeer object of the peer screensharing, will select  first if multiple screenshares
  const presenter = hmsStore.getState(selectPeerScreenSharing);

  // to get the HMSPeer object of all the peers screensharing
  const presenters = hmsStore.getState(selectPeersScreenSharing);

  // a boolean to know if the local peer is the one who is screensharing
  // const amIScreenSharing = hmsStore.getState(selectIsLocalScreenShared);

  const {
    amIScreenSharing,
    screenShareVideoTrackId: video,
    screenShareAudioTrackId: audio,
    toggleScreenShare,
  } = useScreenShare();
  const isAllowedToPublish = useHMSStore(selectIsAllowedToPublish);

  const [localPeerid, setlocalPeerid] = useState("");
  useEffect(() => {
    if (localPeer) {
      setlocalPeerid(localPeer?.id);
    }
  });

  const videoRef = useRef();
  const track = useHMSStore(selectScreenShareByPeerID(localPeerid));

  useEffect(() => {
    (async () => {
      if (videoRef && videoRef.current && track) {
        if (track.enabled) {
          await hmsActions.attachVideo(track.id, videoRef.current);
          if (videoRef.current) {
            const map = new THREE.VideoTexture(videoRef.current);
            console.log(map);
          }
        } else {
          await hmsActions.detachVideo(track.id, videoRef.current);
        }
      }
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  async function onAudio() {
    await hmsActions.setLocalAudioEnabled(true);
  }

  if (audioEnabled) {
  }

  // async function toggleVideo() {
  //   await hmsActions.setLocalVideoEnabled(!videoEnabled);
  // }

  async function enableScreenShare() {
    // if (hmsActions) {
    await hmsActions.setScreenShareEnabled(true, { videoOnly: true });
    // }
  }

  // to get the screenshare video track, this can be used to call attachVideo for rendering
  const screenshareVideoTrack = () => {
    if (presenter) {
      hmsStore.getState(selectScreenShareByPeerID(presenter.id));
    }
  };

  // Get the peer who is sharing audio only screenshare
  // const localPeer = useHMSStore(selectLocalPeer);
  // Get the audio track of audio Only screenshare

  // const audioTrack = () => {
  //   if (peer) useHMSStore(selectScreenShareAudioByPeerID(peer.id));
  //   console.log(peer);
  // };

  // const screenTrack = useHMSStore(selectScreenShareByPeerID(localPeer.id));

  var locpeer = useHMSStore(selectLocalPeer);
  useEffect(() => {
    setLocalPeer(locpeer);
  });

  const leave = () => {
    hmsActions.leave();
  };
  // const menu= () =>{
  //   document.getElementById('rightmenu').style.opacity= 100;
  // }

  // function showPeers() {
  //   console.log(peers);
  // }

  return (
    <>
      {/* <div>
          {peers.map((p) => (
            <User key={p.id} peer={p} />
          ))}
        </div> */}
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
        }}
        color="primary"
        aria-label="speak"
      >
        {" "}
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
        }}
      ></video>

      <LeaveRoom onClick={leave}>Leave room</LeaveRoom>
      <Suspense fallback={null}>
        <ThreeDSpace />
      </Suspense>
    </>
  );
}

export default Room;
