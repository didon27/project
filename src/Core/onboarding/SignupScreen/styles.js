import { StyleSheet, Dimensions, I18nManager } from 'react-native';

const { height } = Dimensions.get('window');
const imageSize = height * 0.232;
const photoIconSize = imageSize * 0.27;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    signUpButtonContainer: {
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      marginTop: 30,
      alignSelf: 'center',
    },
    signUpText: {
      color: '#fff',
    },
    placeholder: {
      color: 'red',
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

    signupContainer: {
      alignSelf: 'center',
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      padding: 10,
      marginTop: 50,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
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
      alignItems:'center',
      flexDirection: 'row',
    },
    goToLinkText: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
  });
};

export default dynamicStyles;
