import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    root: { flex: 1 },
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 50,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    loginContainer: {
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      marginTop: 30,
      height: appStyles.buttonSet.height,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      fontSize: appStyles.buttonSet.size,
      lineHeight: appStyles.buttonSet.lineHeight,
      color: appStyles.buttonSet[colorScheme].colorFilled,
    },
    signupContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: appStyles.buttonSet.width,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderRadius: appStyles.sizeSet.radius,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: appStyles.buttonSet[colorScheme].colorOutlined,
      marginTop: 20,
      height: appStyles.buttonSet.height,
    },
    signupText: {
      fontSize: appStyles.buttonSet.size,
      lineHeight: appStyles.buttonSet.lineHeight,
      color: appStyles.buttonSet[colorScheme].colorOutlined,
    },
  });
};

export default dynamicStyles;
