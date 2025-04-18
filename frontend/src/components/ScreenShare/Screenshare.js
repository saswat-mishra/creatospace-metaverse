import React, { useRef, useState } from "react";
import {
  useHMSStore,
  selectPeerByID,
  selectScreenShareAudioByPeerID,
  selectScreenShareByPeerID,
} from "@100mslive/react-sdk";

const labelStyles = {
  position: "unset",
  width: "100%",
  textAlign: "center",
  transform: "none",
  mt: "$2",
  flexShrink: 0,
};

function Screen ({
  peerId,
  showStatsOnTiles,
  width = "100%",
  height = "100%",
}) {
  const track = useHMSStore(selectScreenShareByPeerID(peerId));
  const peer = useHMSStore(selectPeerByID(peerId));
  const isAudioOnly = useUISettings(UI_SETTINGS.isAudioOnly);
  const isHeadless = useIsHeadless();
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const label = getVideoTileLabel({
    peerName: peer.name,
    isLocal: false,
    track,
  });
  const fullscreenRef = useRef(null);
  // fullscreen is for desired state
  const [fullscreen, setFullscreen] = useState(false);
  // isFullscreen is for true state
  const isFullscreen = useFullscreen(fullscreenRef, fullscreen, {
    onClose: () => setFullscreen(false),
  });
  const isFullScreenSupported = screenfull.isEnabled;
  const audioTrack = useHMSStore(selectScreenShareAudioByPeerID(peer?.id));
  return (
    <StyledVideoTile.Root
      css={{ width, height }}
      data-testid="screenshare_tile"
    >
      {peer ? (
        <StyledVideoTile.Container
          transparentBg
          ref={fullscreenRef}
          css={{ flexDirection: "column" }}
          onMouseEnter={() => setIsMouseHovered(true)}
          onMouseLeave={() => {
            setIsMouseHovered(false);
          }}
        >
          {showStatsOnTiles ? (
            <VideoTileStats
              audioTrackID={audioTrack?.id}
              videoTrackID={track?.id}
            />
          ) : null}
          {isFullScreenSupported && !isHeadless ? (
            <StyledVideoTile.FullScreenButton
              onClick={() => setFullscreen(!fullscreen)}
            >
              {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
            </StyledVideoTile.FullScreenButton>
          ) : null}
          {track ? (
            <Video
              screenShare={true}
              mirror={peer.isLocal && track?.source === "regular"}
              attach={!isAudioOnly}
              trackId={track.id}
            />
          ) : null}
          <StyledVideoTile.Info css={labelStyles}>{label}</StyledVideoTile.Info>
          {isMouseHovered && !isHeadless && !peer?.isLocal ? (
            <TileMenu
              isScreenshare
              peerID={peer?.id}
              audioTrackID={audioTrack?.id}
              videoTrackID={track?.id}
            />
          ) : null}
        </StyledVideoTile.Container>
      ) : null}
    </StyledVideoTile.Root>
  );
};

// const ScreenshareTile = React.memo(Tile);

export default Screen;