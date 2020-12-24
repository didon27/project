import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-dynamic-vector-icons";

import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { useColorScheme } from 'react-native-appearance';

const size = 30;

const Tab = ({ key, route, text, onPress, focus, tabIcons }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity style={styles.container} key={key} onPress={onPress}>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View style={styles.mask}>
             <Icon
              name={tabIcons[colorScheme][route.routeName].icon}
              type={tabIcons[colorScheme][route.routeName].type}
              size={size}
              color="white"
              style={styles.shadow}
            />
            <Text style={styles.text}>
              {tabIcons[colorScheme][route.routeName].name}
            </Text>
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <LinearGradient
          colors={
            focus ? tabIcons[colorScheme].focus : tabIcons[colorScheme].unFocus
          }
          style={{ flex: 1 }}
        />
      </MaskedView>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  mask: {
    // Transparent background because mask is based off alpha channel.
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    // width: 32,
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    marginTop: 5,
    lineHeight: 12,
    fontSize: 10,
    textAlign: 'center',
  },
  shadow: {
    height: 28,
    width: 28,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
