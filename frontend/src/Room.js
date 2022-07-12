import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Fab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { Flex, IconButton, Text, Video } from "@100mslive/react-ui";
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
import './Room.css';
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

  console.log(isConnected, roomState, peers, localPeer, screenEnabled);
  console.log("This is the local peer:", localPeer);

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
      setlocalPeerid(localPeer.id);
    }
  });

  const videoRef = useRef(null);
  const track = useHMSStore(selectScreenShareByPeerID(localPeerid));
  useEffect(() => {
    (async () => {
      if (videoRef && videoRef.current && track) {
        if (track.enabled) {
          await hmsActions.attachVideo(track.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(track.id, videoRef.current);
        }
      }
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  });

  console.log(amIScreenSharing, isAllowedToPublish);
  async function onAudio() {
    console.log("audio started enabling!", isConnected, audioEnabled, peers);
    await hmsActions.setLocalAudioEnabled(true);
  }

  if (audioEnabled) {
    console.log("audio is now enabled!", isConnected, audioEnabled, peers);
  }

  // async function toggleVideo() {
  //   await hmsActions.setLocalVideoEnabled(!videoEnabled);
  // }

  async function enableScreenShare() {
    console.log(
      "started screensharing!",
      isConnected,
      presenter,
      localPeer,
      screenshareOn
    );
    // if (hmsActions) {
    await hmsActions.setScreenShareEnabled(true, { videoOnly: true });
    // }
    console.log("screen sharing!", screenshareOn);
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

  console.log(localPeer, presenter, screenshareVideoTrack());

  const leave = () => {
    hmsActions.leave();
  };
  // const menu= () =>{
  //   document.getElementById('rightmenu').style.opacity= 100;
  // }
  console.log(peers);

  // function showPeers() {
  //   console.log(peers);
  // }

  return (
    <div>
      {/* <div>
        {isConnected ? (
          <JoinForm id={room_id}></JoinForm>
        ) : (
          <p>not connected, please join.</p>
        )}
      </div> */}
      <div>
        {peers.map((p) => (
          <User key={p.id} peer={p} />
        ))}
      </div>

      <div>
        {/* <video>
          <source src={screenTrack}></source>
        </video> */}
        <Fab onClick={onAudio} color="primary" aria-label="speak" id="mic-icon">
          <MicIcon />
        </Fab>
        {/* <Fab onClick={toggleAudio} color="primary" aria-label="speak">
        <MicOffIcon />
      </Fab> */}
        <Fab id="src-icon"
          onClick={async () => {
            await hmsActions.setScreenShareEnabled(true, { videoOnly: true });
            console.log(track);
          }}
          color="primary"
          aria-label="speak"
        >
          {" "}
          <ScreenShareIcon />
        </Fab>
        <video ref={videoRef} autoPlay muted></video>

      </div>

      {/* <button onClick={showPeers} className="btn-primary">
        Show Peers
      </button> */}
      <button onClick={leave} className="btn-primary">
        Leave room
      </button>
      {/* <button id="menu" onClick={menu}>Options</button>
      <div id="rightmenu"></div> */}
    </div>
  );
}

export default Room;
