import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingHorizontal: 20,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 9,
      borderBottomColor: appStyles.colorSet[colorScheme].grey3,
    },
    divider: {
      bottom: 0,
      left: 72,
      right: 10,
      position: 'absolute',
      height: 0.5,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
    },
    chatItemContent: {
      flex: 1,
      alignSelf: 'center',
      marginLeft: 10,
    },
    chatFriendName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontWeight: '500',
    },
    content: {
      flexDirection: 'row',
      marginTop: 5,
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
  });
};

export default dynamicStyles;
