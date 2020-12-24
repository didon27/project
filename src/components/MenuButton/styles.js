import { StyleSheet } from 'react-native';
import appStyles from '../../DynamicAppStyles';

const dynamicStyles = colorScheme => {
  return new StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    btnIcon: {
      tintColor: appStyles.colorSet[colorScheme].mainTextColor,
      height: 25,
      width: 25,
    },
    btnText: {
      fontSize: 16,
      marginLeft: 10,
      marginTop: 2,
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
  });
};

export default dynamicStyles;
