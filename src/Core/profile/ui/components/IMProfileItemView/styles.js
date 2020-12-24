import { StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      width: '95%',
      marginVertical: 5,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: '#fff',
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      marginLeft: 10,
      alignItems: 'center',
    },
    gradient: {
      height: 40,
      width: 40,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginLeft: 15,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      lineHeight: 25,
      marginTop: 3,
    },
    itemNavigationIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
      marginTop: 20,
      tintColor: appStyles.colorSet[colorScheme].mainSubtextColor,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  });
};

export default dynamicStyles;
