import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  NativeModules,
} from 'react-native';

import ThreadMediaItem from './ThreadMediaItem';
import TranslatedMessageItem from './TranslatedMessageItem';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import LinearGradient from 'react-native-linear-gradient';

const { VideoPlayerManager } = NativeModules;
const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

const assets = {
  boederImgSend: require('../assets/borderImg1.png'),
  boederImgReceive: require('../assets/borderImg2.png'),
  textBoederImgSend: require('../assets/textBorderImg1.png'),
  textBoederImgReceive: require('../assets/textBorderImg2.png'),
};

function ThreadItem(props) {
  const {
    item,
    user,
    onChatMediaPress,
    onSenderProfilePicturePress,
    appStyles,
    translate,
    translateTo,
    translateFrom,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [imgErr, setImgErr] = useState(false);
  const videoRef = useRef(null);

  const onImageError = () => {
    setImgErr(true);
  };

  const didPressMediaChat = () => {
    if (item.url && item.url.mime && item.url.mime.startsWith('video')) {
      if (Platform.OS === 'android') {
        VideoPlayerManager.showVideoPlayer(item.url.url);
      } else {
        if (videoRef.current) {
          videoRef.current.presentFullscreenPlayer();
        }
      }
    } else {
      onChatMediaPress(item);
    }
  };

  return (
    <View>
      {/* user thread item */}
      {item.senderID === user.userID && (
        <View style={styles.sendItemContainer}>
          {item.url != null && item.url != '' && (
            <TouchableOpacity
              onPress={didPressMediaChat}
              activeOpacity={0.9}
              style={[
                styles.itemContent,
                styles.sendItemContent,
                { padding: 0, marginRight: -1 },
              ]}>
              <ThreadMediaItem
                videoRef={videoRef}
                dynamicStyles={styles}
                appStyles={appStyles}
                item={item}
              />
              <Image
                source={assets.boederImgSend}
                style={styles.boederImgSend}
              />
            </TouchableOpacity>
          )}
          {!item.url && (
            <>
              <LinearGradient
                colors={['#6385E6', '#B36AE8']}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0 }}
                style={[styles.itemContent, styles.sendItemContent]}>
                <Text style={styles.sendTextMessage}>{item.content}</Text>
                {Platform.OS === 'android' ? (
                  <Image
                    source={assets.textBoederImgSend}
                    style={[styles.textBoederImgSend, { tintColor: '#6385E6' }]}
                  />
                ) : null}
              </LinearGradient>
              {Platform.OS === 'ios' && (
                <Image
                  source={assets.textBoederImgSend}
                  style={[
                    styles.textBoederImgSend,
                    { bottom: 0, right: 15, tintColor: '#6385E6' },
                  ]}
                />
              )}
            </>
          )}
          {/* <TouchableOpacity
            onPress={() =>
              onSenderProfilePicturePress && onSenderProfilePicturePress(item)
            }>
            <Image
              style={styles.userIcon}
              source={
                imgErr || !item.senderProfilePictureURL
                  ? { uri: defaultAvatar }
                  : { uri: item.senderProfilePictureURL }
              }
              onError={onImageError}
            />
          </TouchableOpacity> */}
        </View>
      )}
      {/* receiver thread item */}
      {item.senderID !== user.userID && (
        <View style={styles.receiveItemContainer}>
          {/* <TouchableOpacity
            onPress={() =>
              onSenderProfilePicturePress && onSenderProfilePicturePress(item)
            }>
            <Image
              style={styles.userIcon}
              source={
                imgErr
                  ? { uri: defaultAvatar }
                  : { uri: item.senderProfilePictureURL }
              }
              onError={onImageError}
            />
          </TouchableOpacity> */}
          {item.url != null && item.url != '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.itemContent,
                styles.receiveItemContent,
                { padding: 0, marginLeft: -1 },
              ]}
              onPress={() => onChatMediaPress(item)}>
              <ThreadMediaItem
                videoRef={videoRef}
                dynamicStyles={styles}
                appStyles={appStyles}
                item={item}
              />
              <Image
                source={assets.boederImgReceive}
                style={styles.boederImgReceive}
              />
            </TouchableOpacity>
          )}
          {!item.url && (
            <>
              <View
                style={[
                  styles.itemContent,
                  styles.receiveItemContent,
                  { paddingBottom: Platform.OS === 'ios' ? 17 : 10 },
                ]}>
                <Text style={[styles.receiveTextMessage, { paddingBottom: 0 }]}>
                  {item.content}
                </Text>
              </View>
              <Image
                source={assets.textBoederImgReceive}
                style={styles.textBoederImgReceive}
              />
            </>
          )}
        </View>
      )}
      {item.senderID !== user.userID && translate && (
        <View style={styles.receiveItemContainer}>
          <TouchableOpacity
            onPress={() =>
              onSenderProfilePicturePress && onSenderProfilePicturePress(item)
            }>
            <Image
              style={styles.userIcon}
              source={
                imgErr
                  ? { uri: defaultAvatar }
                  : { uri: item.senderProfilePictureURL }
              }
              onError={onImageError}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.itemContent,
              styles.receiveItemContent,
              { maxWidth: '65%' },
            ]}>
            <TranslatedMessageItem
              text={item.content}
              translateTo={translateTo}
              translateFrom={translateFrom}
              appStyles={appStyles}
            />
            <Image
              source={assets.textBoederImgReceive}
              style={styles.textBoederImgReceive}
            />
          </View>
        </View>
      )}
    </View>
  );
}

ThreadItem.propTypes = {};

export default ThreadItem;
