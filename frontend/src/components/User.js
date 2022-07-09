import React from 'react';
import { selectIsPeerAudioEnabled, selectLocalPeer, selectPeerAudioByID, useHMSStore } from "@100mslive/react-sdk";

function User({ peer }) {
  const level = useHMSStore(selectPeerAudioByID(peer.id)) || 0;
  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);
  return <div>
    <h1>{peer.username}</h1>
  </div>;
}

export default User;
