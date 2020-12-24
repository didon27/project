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
    sentButtonContainer: {
      height: appStyles.buttonSet.height,
      width: appStyles.buttonSet.width,
      borderRadius: appStyles.buttonSet.radius,
      marginTop: 30,
      alignSelf: 'center',
    },
    titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    title: { fontSize: 28, fontWeight: '700' },
    subtitle: {
      fontWeight: '400',
      fontSize: 17,
      color: '#8F9BB3',
      textAlign: 'center',
      marginTop: 8,
    },
    sentButtonText: {
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
  });
};

export default dynamicStyles;
