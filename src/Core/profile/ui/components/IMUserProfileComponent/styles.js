import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';
const { height } = Dimensions.get('window');
const imageSize = height * 0.14;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    buttonContainer: {
      height: 53,
      width: '98%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: 80,
      width: '100%',
      marginVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemContainer: {
      width: '100%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    image: {
      height: 55,
      width: 55,
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
    userName: {
      marginTop: 5,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      marginBottom: 40,
      marginLeft: 20,
    },
    logoutContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingLeft: 20,
      marginVertical: 10,
    },
    logout: {
      fontSize: 15,
      flexDirection: 'row',
      alignItems: 'center',
      // paddingHorizontal: 20,
    },
    logoutText: {
      fontSize: 17,
      lineHeight: 25,
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    gradient: {
      height: 40,
      width: 40,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 17,
    },
    icon: {
      height: 24,
      width: 24,
      tintColor: '#fff',
    },
    itemNavigationIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
      marginTop: 15,
      tintColor: appStyles.colorSet[colorScheme].mainSubtextColor,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  });
};

export default dynamicStyles;
