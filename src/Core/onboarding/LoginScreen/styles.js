import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    root: { flex: 1 },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    loginButtonContainer: {
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      marginTop: 30,
      alignSelf: 'center',
    },
    loginButtonText: {
      color: '#ffffff',
    },
    InputContainer: {
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      alignSelf: 'center',
      marginTop: 30,
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: 20,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    forgetContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    floatButton: {
      position: 'absolute',
      right: 55,
      bottom: '20%',
    },
    forgetText: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    goToLinkContainer: {
      marginTop: 30,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    goToLinkText: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    separator: {
      flexDirection: 'row',
      width: appStyles.WINDOW_WIDTH * 0.8,
      alignSelf: 'center',
      marginVertical: 35,
    },
    separatorLine: {
      backgroundColor: appStyles.colorSet[colorScheme].mainSubtextColor,
      height: 2,
      flex: 2,
      alignSelf: 'center',
      opacity: 0.5,
    },
    separatorText: {
      alignSelf: 'center',
      paddingHorizontal: 15,
      fontSize: 14,
      lineHeight: 16,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    socialIcons: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    socialIconContainer: { marginHorizontal: 10 },
    socialIcon: {
      color: '#fff',
    },
  });
};

export default dynamicStyles;
