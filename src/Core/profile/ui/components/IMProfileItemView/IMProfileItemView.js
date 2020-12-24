import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import LinearGradient from 'react-native-linear-gradient';

const IMProfileItemView = (props) => {
  const { appStyles } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const rightArrowIcon = require('../../../../../CoreAssets/right-arrow.png');

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          colors={props.colors}
          style={styles.gradient}>
          <Image style={[styles.icon, props.iconStyle]} source={props.icon} />
        </LinearGradient>
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <Image style={styles.itemNavigationIcon} source={rightArrowIcon} />
    </TouchableOpacity>
  );
};

export default IMProfileItemView;
