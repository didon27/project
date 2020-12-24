import React from 'react';
import { View, StatusBar } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

export default function StatusBarComponent(props) {
  const colorScheme = useColorScheme();
  const appStyles = props.appStyles;
  const styles = dynamicStyles(appStyles, colorScheme);

  let backgroundColor = getBackGroundColor(appStyles, colorScheme);

  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const getBackGroundColor = (appStyles, colorScheme) => {
  return appStyles.colorSet[colorScheme].mainThemeBackgroundColor;
};
