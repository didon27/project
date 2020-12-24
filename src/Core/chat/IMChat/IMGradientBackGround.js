import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
const IMGradientBackGround = ({ children, normal, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={<View style={styles.mask}>{children}</View>}>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <LinearGradient
          colors={!normal ? ['#B36AE8', '#6385E6'] : ['#A4AFCF', '#A4AFCF']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </TouchableOpacity>
  );
};

export default IMGradientBackGround;

const styles = StyleSheet.create({
  container: { width: 40 },
  mask: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
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
