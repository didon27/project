import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../localization/IMLocalization';
import AppStyles from '../../../DynamicAppStyles';
import IMGradientBackGround from './IMGradientBackGround';

const assets = {
  cameraFilled: require('../assets/camera-filled.png'),
  send: require('../assets/send.png'),
  add: require('../assets/More.png'),
  file: require('../assets/gallery.png'),
  smiley: require('../assets/smiley.png'),
  microphone: require('../assets/microphone.png'),
};

function BottomInput(props) {
  const {
    item,
    value,
    onChangeText,
    onSend,
    onAddMediaPress,
    uploadProgress,
    appStyles,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const isDisabled = !value;

  return (
    <View>
      <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
      <View style={styles.inputBar}>
        <View style={styles.input}>
          <IMGradientBackGround normal={true}>
            <TouchableOpacity
              disabled={isDisabled}
              style={[styles.inputIconContainer]}>
              <Image style={styles.inputIcon} source={assets.smiley} />
            </TouchableOpacity>
          </IMGradientBackGround>

          <TextInput
            style={{
              width: '70%',
              color: colorScheme === 'dark' ? '#A3A4B3' : '#929292',
              height: Platform.OS === 'android' ? 50 : 30,
            }}
            value={value}
            multiline={true}
            placeholder={IMLocalized('Message...')}
            placeholderTextColor={
              colorScheme === 'dark' ? '#A3A4B3' : '#929292'
            }
            underlineColorAndroid="transparent"
            onChangeText={(text) => onChangeText(text)}
          />

{/*         <IMGradientBackGround normal={true}>
            <TouchableOpacity
              disabled={isDisabled}
              style={[
                styles.inputIconContainer,
                isDisabled ? { opacity: 1 } : { opacity: 1 },
              ]}>
              <Image style={styles.inputIcon} source={assets.microphone} />
            </TouchableOpacity>
          </IMGradientBackGround> */}
        </View>
        <IMGradientBackGround normal={true} onPress={onSend}>
          <TouchableOpacity
            disabled={isDisabled}
            style={[
              styles.inputIconContainer,
              isDisabled ? { opacity: 0.2 } : { opacity: 1 },
            ]}>
            <Image style={styles.inputIcon} source={assets.send} />
          </TouchableOpacity>
        </IMGradientBackGround>
        <IMGradientBackGround normal={true} onPress={onAddMediaPress}>
          <TouchableOpacity style={styles.inputIconContainer}>
            <Image style={styles.inputIcon} source={assets.cameraFilled} />
          </TouchableOpacity>
        </IMGradientBackGround>
        <IMGradientBackGround normal={true} onPress={onAddMediaPress}>
          <TouchableOpacity style={styles.inputIconContainer}>
            <Image style={styles.inputIcon} source={assets.file} />
          </TouchableOpacity>
        </IMGradientBackGround>
        <IMGradientBackGround onPress={onAddMediaPress}>
          <TouchableOpacity
            onPress={onAddMediaPress}
            style={styles.inputIconContainer}>
            <Image style={styles.inputIcon} source={assets.add} />
          </TouchableOpacity>
        </IMGradientBackGround>
      </View>
    </View>
  );
}

BottomInput.propTypes = {};

export default BottomInput;
