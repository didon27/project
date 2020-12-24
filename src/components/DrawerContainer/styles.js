import { StyleSheet } from 'react-native';
import styles from '../MenuButton/styles';
import appStyles from '../../DynamicAppStyles';

const dynamicStyles = colorScheme => {
  return new StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 20,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
  });
};

export default dynamicStyles;
