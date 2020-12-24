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
import { TNTouchableIcon, IMIconButton } from '../../../Core/truly-native';

import AppStyles from '../../../DynamicAppStyles';
import LinearGradient from 'react-native-linear-gradient';

const IMChatScreenHeader = (props) => {
  const { currentTheme, channel, navigation, title } = props;

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
        <IMIconButton
          source={require('../../../CoreAssets/arrow-back-icon.png')}
          tintColor={currentTheme.headerIconBackground}
          onPress={() => navigation.goBack()}
          marginRight={15}
          width={20}
          height={20}
        />
        <TouchableOpacity
          onPress={() =>
            onSenderProfilePicturePress && onSenderProfilePicturePress(item)
          }>
          <Image
            style={styles.userIcon}
            source={{
              uri:
                'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg',
            }}
          />
        </TouchableOpacity>
        <View style={styles.leftBar}>
          <Text style={{ color: currentTheme.mainTextColor }}>{title}</Text>
{/*          <Text style={{ color: currentTheme.mainSubtextColor, fontSize: 12 }}>
            Last seen 8:10 am
          </Text>*/}
        </View>
        {channel.participants.length == 1 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Translate</Text>
            <Switch
              style={{
                // marginRight: 15,
                transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              }}
              onValueChange={() => navigation.state.params.onTranslateSwitch()}
              value={navigation.state.params.translate}
            />
          </View>
        )}
        <IMIconButton
          source={require('../../../CoreAssets/video-camera.png')}
          tintColor={currentTheme.headerIconBackground}
          onPress={() => navigation.state.params.onVideoChat()}
          marginRight={15}
          width={18}
          height={18}
        />
        <IMIconButton
          source={require('../../../CoreAssets/call.png')}
          tintColor={currentTheme.headerIconBackground}
          onPress={() => navigation.state.params.onAudioChat()}
          marginRight={15}
          width={18}
          height={18}
        />
        <IMIconButton
          source={require('../../../CoreAssets/settings-icon.png')}
          tintColor={currentTheme.headerIconBackground}
          onPress={() => navigation.state.params.onSettingsPress()}
          marginRight={15}
          width={18}
          height={18}
        />
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  userIcon: {
    width: 34,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 17,
  },
});
