import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  BackHandler,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TNTouchableIcon, IMIconButton } from '../../../truly-native';

import AppStyles from '../../../../DynamicAppStyles';
import LinearGradient from 'react-native-linear-gradient';

import TextButton from 'react-native-button';

const IMChatScreenHeader = (props) => {
  const { currentTheme, channel, navigation, headerTitle, shouldFormSubmit } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.backgroundColor,
        },
      ]}>
      <LinearGradient
        colors={currentTheme.gradientColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}>
        <View
          style={[
            styles.leftBar,
            { justifyContent: shouldFormSubmit ? 'space-between' : 'space-between'},
          ]}>
          <IMIconButton
            source={require('../../../../CoreAssets/arrow-back-icon.png')}
            tintColor={currentTheme.headerIconBackground}
            onPress={() => navigation.goBack()}
            marginRight={15}
            width={20}
            height={20}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {headerTitle}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {shouldFormSubmit ? (
            <>
            <TextButton style={{ marginRight: 12 }} onPress={props.onFormSubmit}>
              Done
            </TextButton>
            </>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
};

IMChatScreenHeader.defaultProps = {};
export default IMChatScreenHeader;

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 95 : 64,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 45 : 10,
  },
  leftBar: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    alignItems: 'center',
  },
  userIcon: {
    width: 34,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 17,
  },
});
