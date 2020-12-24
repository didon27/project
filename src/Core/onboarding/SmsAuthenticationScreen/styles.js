import { StyleSheet, Platform } from 'react-native';
import { I18nManager } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    title: {
      fontSize: Platform.OS === 'ios' ? 30 : 20,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: Platform.OS === 'ios' ? 50 : 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },
    sendContainer: {
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      marginTop: 30,
      alignSelf: 'center',
    },
    sendText: {
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
    },

    flagStyle: {
      width: 35,
      height: 25,
      borderColor: appStyles.colorSet[colorScheme].mainTextColor,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    rootCodeContainer: { marginHorizontal: 10 },
    input: {
      flex: 1,
      borderBottomWidth: 3,
      marginRight: 15,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 24,
      lineHeight: 29,
      fontWeight: '700',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderBottomColor: appStyles.colorSet[colorScheme].border,
    },
    phoneInputTextStyle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    codeFieldContainer: {
      // borderWidth: 0,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      height: appStyles.buttonSet.height,
      width: '80%',
      marginLeft: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    tos: {
      marginVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    tosText: {
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 12,
    },
    tosLink: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12,
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
    goToLinkContainer: {
      marginTop: 30,
      alignSelf: 'center',
      flexDirection: 'row',
    },

    goToLinkText: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    backArrowStyle: {
      resizeMode: 'center',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: 30,
      height: 30,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
    },
  });
};

export default dynamicStyles;
