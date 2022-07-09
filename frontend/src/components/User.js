import React from 'react';
import { selectIsPeerAudioEnabled, selectLocalPeer, selectPeerAudioByID, useHMSStore } from "@100mslive/react-sdk";

function User({ peer }) {
  const level = useHMSStore(selectPeerAudioByID(peer.id)) || 0;
  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);

  const audioTrack = peer.audioTrack;

  return <div>
    <h1>{peer.name}</h1>
    <audio src={audioTrack}></audio>
    <h2>{level}</h2>
    <video></video>
  </div>;
}

export default User;
