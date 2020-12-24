import { StyleSheet } from 'react-native';
import styles from '../MenuButton/styles';
import appStyles from '../../DynamicAppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 80,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
  });
};

export default dynamicStyles;
