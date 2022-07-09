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
} from "@100mslive/react-sdk";
import { hmsStore } from "../hms";

function Bottomctrl() {
  const params = useParams();
  const room_id = params.id;
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  var peers = useHMSStore(selectPeers);
  console.log(isConnected, peers);
  


  async function onAudio() {
    await hmsActions.setLocalAudioEnabled(true);
    if (isConnected){
      console.log(isConnected, audioEnabled, peers);
    }
    console.log(audioTrack);
  }

  // async function toggleVideo() {
  //   await hmsActions.setLocalVideoEnabled(!videoEnabled);
  // }

  async function enableScreenShare() {
    try {
      if (hmsActions) {
        await hmsActions.setScreenShareEnabled(true, true);
      }
      console.log("sharing!");
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
      hmsStore.getState(selectScreenShareByPeerID(presenter.id));
    }
  };

  // Get the peer who is sharing audio only screenshare
  const peer = hmsStore.getState(selectPeerSharingAudio);
  // Get the audio track of audio Only screenshare

  const audioTrack = () => {
    if (peer) hmsStore.getState(selectScreenShareAudioByPeerID(peer.id));
    console.log(peer);
  };
  const screenTrack = () => {
    if (peer) hmsStore.getState(selectScreenShareByPeerID(peer.id));
  };
  return (
    <div>
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
      <Card>
        <CardMedia component="video" media={screenTrack}></CardMedia>
      </Card>
    </div>
  );
}

export default Bottomctrl;
