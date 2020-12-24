import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    statusBar: {
      height: appStyles.STATUSBAR_HEIGHT,
    },
  });
};

export default dynamicStyles;
