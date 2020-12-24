import { StyleSheet } from 'react-native';
import { size } from '../../helpers/devices';

const dynamicStyles = (appStyles, colorScheme) => {
  const chatBackgroundColor =
    appStyles.colorSet[colorScheme].mainThemeBackgroundColor;

  return StyleSheet.create({
    personalChatContainer: {
      backgroundColor: chatBackgroundColor,
      flex: 1,
    },
    //Bottom Input
    inputBar: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopColor: appStyles.colorSet[colorScheme].hairlineColor,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingBottom: 15,
    },
    progressBar: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: 3,
      shadowColor: '#000',
      width: 0,
    },
    inputIconContainer: {
      marginVertical: 10,
    },
    inputIcon: {
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: 25,
      height: 25,
    },
    input: {
      marginLeft: 10,
      paddingRight: 20,
      height: 50,
      flex: 2,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 16,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
      borderColor: appStyles.colorSet[colorScheme].inputOutline,
    },
    // Message Thread
    messageThreadContainer: {
      margin: 6,
      paddingHorizontal: 10,
    },
    // Thread Item
    sendItemContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    itemContent: {
      padding: 10,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 10,
      maxWidth: '70%',
    },
    sendItemContent: {
      marginRight: 9,
      position: 'relative',
      // backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    mediaMessage: {
      width: size(160),
      height: size(130),
      borderRadius: 10,
    },
    boederImgSend: {
      position: 'absolute',
      width: size(160),
      height: size(130),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    textBoederImgSend: {
      position: 'absolute',
      right: -5,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      zIndex: 99,
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    sendTextMessage: {
      fontSize: 14,
      lineHeight: 18,
      padding: 5,
      color: '#ffffff',
    },
    userIcon: {
      width: 34,
      height: 34,
      borderRadius: 17,
    },
    receiveItemContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10,
    },
    receiveItemContent: {
      marginLeft: 9,
      // paddingBottom: 0,
    },
    boederImgReceive: {
      position: 'absolute',
      width: size(160),
      height: size(130),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    receiveTextMessage: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      lineHeight: 14,
      padding: 5,
    },
    textBoederImgReceive: {
      position: 'absolute',
      left: 4,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      position: 'absolute',
      top: '40%',
      alignSelf: 'center',
      width: 38,
      height: 38,
      backgroundColor: 'transparent',
    },
  });
};

export default dynamicStyles;
