import React, { useState } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';

const assets = {
  phoneCall: require('../assets/phone-call.png'),
  endCall: require('../assets/end-call.png'),
  microphone: require('../assets/microphone.png'),
  speaker: require('../assets/speaker.png'),
};

const AudioChatView = props => {
  const {
    audioVideoChatReceivers,
    remoteStreams,
    hoursCounter,
    minutesCounter,
    secondsCounter,
    isComInitiated,
    isSpeaker,
    isMuted,
    toggleSpeaker,
    endCall,
    onAcceptCall,
    toggleMute,
    initialCallState,
    channelTitle,
  } = props;

  let fullName = channelTitle;

  const [backgroundBlurImage] = useState(
    audioVideoChatReceivers[0].profilePictureURL,
  );
  const [chatReceivers] = useState(audioVideoChatReceivers);

  if (!channelTitle) {
    fullName = `${audioVideoChatReceivers[0].firstName} ${audioVideoChatReceivers[0].lastName}`;
  }

  const renderTimer = () => {
    let timer = `${minutesCounter} : ${secondsCounter}`;
    if (Number(hoursCounter) > 0) {
      timer = `${hoursCounter} : ${minutesCounter} : ${secondsCounter}`;
    }
    return <Text style={styles.timer}>{timer}</Text>;
  };

  const renderUserAvatar = (receiver, index) => {
    const isMultiAvatar = audioVideoChatReceivers.length > 2;
    if (index < 3) {
      return (
        <View
          key={index + ''}
          style={[
            styles.profilePictureContainer,
            index === 0 && isMultiAvatar && styles.profilePictureContainerLeft,
            index === 1 &&
              isMultiAvatar &&
              styles.profilePictureContainerCenter,
            index === 2 && isMultiAvatar && styles.profilePictureContainerRight,
          ]}>
          <Image
            source={{ uri: receiver.profilePictureURL }}
            style={styles.profilePicture}
          />
        </View>
      );
    }
  };

  return (
    <ImageBackground
      blurRadius={20}
      source={{ uri: backgroundBlurImage }}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.receiverAvatarContainer}>
            {chatReceivers.map((receiver, index) =>
              renderUserAvatar(receiver, index),
            )}
          </View>

          <Text style={styles.userName}>{fullName}</Text>
          {remoteStreams ? (
            renderTimer()
          ) : (
            <Text style={styles.timer}>{initialCallState}</Text>
          )}
        </View>
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
            style={[
              styles.controlIconContainer,
              { backgroundColor: '#fc2e50' },
            ]}
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
      </View>
    </ImageBackground>
  );
};

export default AudioChatView;
