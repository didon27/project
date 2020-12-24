import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import amplitude from '../../../../amplitude';
import SocialIcon from '../../ui/SocialButton/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Button from 'react-native-button';
import StatusBar from '../../ui/StatusBar/StatusBar';
import Button from '../../ui/Button/Button';
import Logo from '../../ui/Logo/Logo';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import { color } from 'react-native-reanimated';

const LoginScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');

  const onPressLogin = () => {
    setLoading(true);
    authManager.loginWithEmailAndPassword(email, password).then((response) => {
      if (response.user) {
        const user = response.user;
        props.setUserData(user);
        props.navigation.navigate('MainStack', { user: user });
      } else {
        setLoading(false);
        if (response.error.includes('NotVerified')) {
          props.navigation.navigate('Verification', { appStyles, appConfig });
        } else {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      }
    });
    amplitude.getInstance().logEvent('account login');
  };

  const onFBButtonPress = () => {
    authManager
      .loginOrSignUpWithFacebook(appConfig.appIdentifier)
      .then((response) => {
        if (response.user) {
          const user = response.user;
          props.setUserData(user);
          props.navigation.navigate('MainStack', { user: user });
        } else {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      });
  };

  return (
    <View style={styles.root}>
      {/* <StatusBar appStyles={appStyles} /> */}
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <TouchableOpacity
            style={{ alignSelf: 'flex-start' }}
            onPress={() => props.navigation.goBack()}>
            <Image
              style={appStyles.styleSet[colorScheme].backArrowStyle}
              source={appStyles.iconSet.backArrow}
            />
          </TouchableOpacity>
          <Logo appStyles={appStyles} appConfig={appConfig} />
          <TextInput
            style={styles.InputContainer}
            placeholder={IMLocalized('Email')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View style={styles.forgetContainer}>
            <TextInput
              style={styles.InputContainer}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder={IMLocalized('Password')}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.floatButton}
              onPress={() =>
                props.navigation.navigate('ResetPassword', {
                  appStyles,
                  appConfig,
                })
              }>
              <Text
                style={[
                  styles.forgetText,
                  { color: appStyles.colorSet[colorScheme].mainTextColor },
                ]}>
                {IMLocalized('Forgot?')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.goToLinkContainer}>
            <Text style={styles.goToLinkText}>
              {IMLocalized("Don't have an account? ")}
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Signup', { appStyles, appConfig })
              }>
              <Text
                style={[
                  styles.goToLinkText,
                  { color: appStyles.colorSet[colorScheme].mainTextColor },
                ]}>
                {IMLocalized('Sign Up')}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            containerStyle={styles.loginButtonContainer}
            style={styles.loginButtonText}
            gradientColors={appStyles.buttonSet[colorScheme].colors}
            onPress={() => onPressLogin()}>
            {IMLocalized('Sign In')}
          </Button>
          {/*  <View style={styles.separator}>
            <View style={[styles.separatorLine]} />
            <Text style={styles.separatorText}>{IMLocalized('OR')}</Text>
            <View style={[styles.separatorLine]} />
          </View>

          {/* <Button
            containerStyle={styles.facebookContainer}
            style={styles.facebookText}
            gradientColors={appStyles.buttonSet[colorScheme].colors}
            onPress={() => onFBButtonPress()}>
            {IMLocalized('Login With Facebook')}
          </Button>
          <View style={styles.socialIcons}>
            <SocialIcon
              onPress={() => onFBButtonPress()}
              containerStyle={styles.socialIconContainer}
              gradientColors={appStyles.socialIconSet[colorScheme]['facebook']}>
              <Icon name="facebook" color="#fff" size={25}></Icon>
            </SocialIcon>
            <SocialIcon
              onPress={() => onFBButtonPress()}
              containerStyle={styles.socialIconContainer}
              gradientColors={appStyles.socialIconSet[colorScheme]['twitter']}>
              <Icon name="twitter" color="#fff" size={25}></Icon>
            </SocialIcon>
            <SocialIcon
              onPress={() => onFBButtonPress()}
              gradientColors={
                appStyles.socialIconSet[colorScheme]['google-plus']
              }
              containerStyle={styles.socialIconContainer}>
              <Icon name="google-plus" color="#fff" size={20}></Icon>
            </SocialIcon>
          </View>*/}
          {/*         {appConfig.isSMSAuthEnabled && (
            <View style={[styles.goToLinkContainer, { marginBottom: 30 }]}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Sms', {
                    isSigningUp: false,
                    appStyles,
                    appConfig,
                  })
                }>
                <Text
                  style={[
                    styles.goToLinkText,
                    { color: appStyles.colorSet[colorScheme].mainTextColor},
                  ]}>
                  {IMLocalized('Sign In')}
                </Text>
              </TouchableOpacity>
              <Text style={styles.goToLinkText}>
                {IMLocalized(' with phone number')}
              </Text>
            </View>
          )} */}

          {loading && <TNActivityIndicator appStyles={appStyles} />}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default connect(null, {
  setUserData,
})(LoginScreen);
