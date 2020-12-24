import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../../ui/Button/Button';
import Logo from '../../ui/Logo/Logo';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import { color } from 'react-native-reanimated';

const ResetPasswordScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');

  const forgotPassword = (Email) => {
    setLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(Email) === true) {
      firebase
        .auth()
        .sendPasswordResetEmail(Email)
        .then((user) => {
          setLoading(false);
          Alert.alert(
            'Sent message',
            'Password change code has been sent to the mail',
            [
              {
                text: 'OK',
                onPress: () =>
                  props.navigation.navigate('Login', { appStyles, appConfig }),
              },
            ],
            { cancelable: false },
          );
        })
        .catch((e) => {
          alert('Your email was not found');
          setLoading(false);
          console.log(e);
        });
    } else {
      setLoading(false);
      alert('Email is not valid');
    }
  };

  return (
    <View style={styles.root}>
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{IMLocalized('Reset Password')}</Text>
            <Text style={styles.subtitle}>{IMLocalized('Reset Text')}</Text>
          </View>
          <TextInput
            style={styles.InputContainer}
            placeholder={IMLocalized('Email')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Button
            containerStyle={styles.sentButtonContainer}
            style={styles.sentButtonText}
            gradientColors={appStyles.buttonSet[colorScheme].colors}
            onPress={() => forgotPassword(email)}>
            {IMLocalized('Sent')}
          </Button>
          {loading && <TNActivityIndicator appStyles={appStyles} />}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default connect(null, {
  setUserData,
})(ResetPasswordScreen);
