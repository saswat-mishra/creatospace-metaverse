import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Fab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
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
} from "@100mslive/react-sdk";
import { hmsStore } from "./hms";
import JoinForm from "./JoinForm";
import User from "./components/User";

function Room() {
  const params = useParams();
  const room_id = params.id;
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  var peers = useHMSStore(selectPeers);
  const roomState = useHMSStore(selectRoomState);

  console.log(isConnected, roomState, peers, peer);
  console.log("This is the local peer:", peer);

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
    try {
      console.log(isConnected, peers, peer, screenshareOn);
      // if (hmsActions) {
      await hmsActions.setScreenShareEnabled(true, true);
      // }
      console.log("screen sharing!", screenshareOn);
    } catch (error) {
      console.log(error);
    }
  }

  // to know if someone is screensharing
  const screenshareOn = hmsStore.getState(selectIsSomeoneScreenSharing);

  // to get the HMSPeer object of the peer screensharing, will select  first if multiple screenshares
  const presenter = hmsStore.getState(selectPeerScreenSharing);

  // to get the HMSPeer object of all the peers screensharing
  const presenters = hmsStore.getState(selectPeersScreenSharing);

  // a boolean to know if the local peer is the one who is screensharing
  const amIScreenSharing = hmsStore.getState(selectIsLocalScreenShared);

  // to get the screenshare video track, this can be used to call attachVideo for rendering
  const screenshareVideoTrack = () => {
    if (presenter) {
      hmsStore.getState(selectScreenShareByPeerID(peer.id));
    }
  };

  // Get the peer who is sharing audio only screenshare
  const peer = useHMSStore(selectLocalPeer);
  // Get the audio track of audio Only screenshare

  // const audioTrack = () => {
  //   if (peer) useHMSStore(selectScreenShareAudioByPeerID(peer.id));
  //   console.log(peer);
  // };
  const screenTrack = () => {
    useHMSStore(selectScreenShareByPeerID(peer.id));
  };
  
  console.log(screenTrack());

  const leave = () => {
    hmsActions.leave();
  };

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
        {/* <video src={peer.auxiliaryTracks? peer.auxiliaryTracks[0]: null}></video> */}
        <Fab onClick={onAudio} color="primary" aria-label="speak">
          <MicIcon />
        </Fab>
        {/* <Fab onClick={toggleAudio} color="primary" aria-label="speak">
        <MicOffIcon />
      </Fab> */}
        <Fab onClick={enableScreenShare} color="primary" aria-label="speak">
          <ScreenShareIcon />
        </Fab>
        {/* <video controls muted>
        <source src={screenTrack} type="video/mp4"></source>
      </video> */}
        {/* <Card>
          <CardMedia component="video" media={screenTrack}></CardMedia>
        </Card> */}
      </div>

      {/* <button onClick={showPeers} className="btn-primary">
        Show Peers
      </button> */}
      <button onClick={leave} className="btn-primary">
        Leave room
      </button>
    </div>
  );
}

export default Room;
