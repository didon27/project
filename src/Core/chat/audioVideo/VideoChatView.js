import React, { useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import styles from './styles';

const assets = {
  phoneCall: require('../assets/phone-call.png'),
  endCall: require('../assets/end-call.png'),
  microphone: require('../assets/microphone.png'),
  speaker: require('../assets/speaker.png'),
};

const VideoChatView = props => {
  const {
    remoteStreams,
    localStream,
    isComInitiated,
    peerConnectionStarted,
    isMuted,
    isSpeaker,
    toggleSpeaker,
    toggleMute,
    endCall,
    onAcceptCall,
  } = props;

  const newRemoteStreams = remoteStreams && Object.keys(remoteStreams);

  useEffect(() => {
    console.log('remoteStreams', newRemoteStreams);
  }, []);

  const renderRemoteStreams = (remoteStream, index) => {
    return (
      <View
        key={index + ''}
        style={
          newRemoteStreams.length === 1
            ? styles.remoteRtcContainer
            : styles.localRtcContainer
        }>
        <RTCView
          style={styles.rtcStream}
          objectFit={'cover'}
          zOrder={1}
          streamURL={remoteStream.toURL()}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.control}>
        <TouchableOpacity
          onPress={toggleSpeaker}
          style={[
            styles.controlIconContainer,
            isSpeaker && { backgroundColor: '#8c8d8f' },
          ]}>
          <Image
            source={assets.speaker}
            style={[styles.imageIcon, isSpeaker && { tintColor: '#fff' }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleMute}
          style={[
            styles.controlIconContainer,
            isMuted && { backgroundColor: '#8c8d8f' },
          ]}>
          <Image
            source={assets.microphone}
            style={[styles.imageIcon, isMuted && { tintColor: '#fff' }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlIconContainer, { backgroundColor: '#fc2e50' }]}
          onPress={endCall}>
          <Image source={assets.endCall} style={styles.imageIcon} />
        </TouchableOpacity>
        {!isComInitiated && (
          <TouchableOpacity
            style={[
              styles.controlIconContainer,
              { backgroundColor: '#6abd6e' },
            ]}
            onPress={onAcceptCall}>
            <Image source={assets.phoneCall} style={styles.imageIcon} />
          </TouchableOpacity>
        )}
      </View>
      {localStream && (
        <View
          style={
            newRemoteStreams.length === 1
              ? styles.singleLocalRtcContainer
              : [styles.remoteRtcContainer]
          }>
          <RTCView
            style={styles.rtcStream}
            mirror={true}
            objectFit={'cover'}
            // zOrder={1}
            streamURL={localStream.toURL()}
          />
        </View>
      )}

      {remoteStreams && (
        <View
          style={
            newRemoteStreams.length === 1
              ? {
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                }
              : styles.remoteStreamsContainer
          }>
          {newRemoteStreams.map((remoteStream, index) =>
            renderRemoteStreams(remoteStreams[remoteStream], index),
          )}
        </View>
      )}
    </>
  );
};

export default VideoChatView;
