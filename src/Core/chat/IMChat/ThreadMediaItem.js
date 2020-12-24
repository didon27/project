import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import Image from "react-native-image-progress";
import CircleSnail from "react-native-progress/CircleSnail";

const circleSnailProps = { thickness: 1, color: "#D0D0D0", size: 50 };

export default function ThreadMediaItem({
  dynamicStyles,
  appStyles,
  videoRef,
  item
}) {
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    if (!videoLoading) {
      setVideoPaused(true);
    }
  }, [videoLoading]);

  onVideoLoadStart = () => {
    setVideoLoading(true);
  };

  onVideoLoad = payload => {
    setVideoLoading(false);
  };

  if (item.url && item.url.mime && item.url.mime.startsWith("image")) {
    return (
      <Image
        source={{ uri: item.url.url }}
        style={dynamicStyles.mediaMessage}
        indicator={CircleSnail}
        indicatorProps={circleSnailProps}
      />
    );
  } else if (item.url && item.url.mime && item.url.mime.startsWith("video")) {
    return (
      <View>
        {videoLoading && (
          <View style={[dynamicStyles.mediaMessage, dynamicStyles.centerItem]}>
            <CircleSnail {...circleSnailProps} />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{
            uri: item.url.url
          }}
          isMuted={videoPaused}
          onLoad={onVideoLoad}
          onLoadStart={onVideoLoadStart}
          resizeMode={"cover"}
          style={[
            dynamicStyles.mediaMessage,
            { display: videoLoading ? "none" : "flex" }
          ]}
        />
        {!videoLoading && (
          <Image
            source={appStyles.iconSet.playButton}
            style={dynamicStyles.playButton}
          />
        )}
      </View>
    );
  } else {
    // To handle old format of an array of url stings. Before video feature
    return (
      <Image
        source={{ uri: item.url }}
        style={dynamicStyles.mediaMessage}
        indicator={CircleSnail}
        indicatorProps={circleSnailProps}
      />
    );
  }
}
