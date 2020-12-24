import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    friendItemContainer: {
      // paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    chatIconContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    nameStatusContainer: {
      padding: 10,
    },
    name: {
      alignSelf: 'center',
      fontSize: 17,
      lineHeight: 27,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    status: {
      fontSize: 17,
      lineHeight: 27,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },

    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      width: 82,
      height: 26,
      justifyContent: 'center',
      borderRadius: 12,
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
      marginRight: 25,
    },
    addFlexContainerFollow: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    followButton: {
      width: 115,
      height: 30,
      justifyContent: 'center',
      borderRadius: 6,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginRight: 18,
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    followActionTitle: {
      padding: 0,
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    divider: {
      bottom: 0,
      left: 80,
      right: 10,
      position: 'absolute',
      height: 0.5,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
    },
  });
};

export default dynamicStyles;
