import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
// import Button from 'react-native-button';
import SocialIcon from '../../ui/SocialButton/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import StatusBar from '../../ui/StatusBar/StatusBar';
import Button from '../../ui/Button/Button';
import Logo from '../../ui/Logo/Logo';
import PhoneInput from 'react-native-phone-input';
import CodeField from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useColorScheme } from 'react-native-appearance';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import CountriesModalPicker from '../../truly-native/CountriesModalPicker/CountriesModalPicker';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import TermsOfUseView from '../components/TermsOfUseView';
import dynamicStyles from './styles';
import firebase from 'react-native-firebase';

const SmsAuthenticationScreen = (props) => {
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userAuthenticated, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [countriesPickerData, setCountriesPickerData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const myCodeInput = useRef(null);
  const phoneRef = useRef(null);

  const { isSigningUp } = props.navigation.state.params;

  useEffect(() => {
    if (phoneRef && phoneRef.current) {
      setCountriesPickerData(phoneRef.current.getPickerData());
    }
  }, [phoneRef]);

  //to handle Android auto-verification
  useEffect(() => {
    if (isSigningUp) {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; //unsubscribe on unmount
    }
  }, []);

  const onFBButtonPress = () => {
    authManager
      .loginOrSignUpWithFacebook(appConfig.appIdentifier)
      .then((response) => {
        if (response.user) {
          const user = response.user;
          props.setUserData({ user });
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

  const signInWithPhoneNumber = (userValidPhoneNumber) => {
    setLoading(true);
    authManager.sendSMSToPhoneNumber(userValidPhoneNumber).then((response) => {
      const confirmationResult = response.confirmationResult;
      if (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult.verificationId);
        setIsPhoneVisible(false);
        setLoading(false);
      } else {
        // Error; SMS not sent
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          { cancelable: false },
        );
      }
    });
  };

  const signUpWithPhoneNumber = (smsCode) => {
    const userDetails = {
      firstName,
      lastName,
      phone: phoneNumber,
      photoURI: profilePictureURL,
    };

    setLoading(true);
    authManager
      .registerWithPhoneNumber(
        userDetails,
        smsCode,
        verificationId,
        appConfig.appIdentifier,
      )
      .then((response) => {
        if (response.error) {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            { cancelable: false },
          );
        } else {
          const user = response.user;

          props.setUserData({ user });
          props.navigation.navigate('MainStack', { user: user });
        }
        setLoading(false);
      });
  };

  //handle Android Auto Verification 2
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (loading) setLoading(false);
  };

  const onPressSend = () => {
    if (phoneRef.current.isValidNumber()) {
      const userValidPhoneNumber = phoneRef.current.getValue();
      setLoading(true);
      setPhoneNumber(userValidPhoneNumber);
      if (!isSigningUp) {
        // If this is a login attempt, we first need to check that the user associated to this phone number exists
        authManager
          .retrieveUserByPhone(userValidPhoneNumber)
          .then((response) => {
            if (response.success) {
              signInWithPhoneNumber(userValidPhoneNumber);
            } else {
              setPhoneNumber(null);
              setLoading(false);
              Alert.alert(
                '',
                IMLocalized(
                  'You cannot log in. There is no account with this phone number.',
                ),
                [{ text: IMLocalized('OK') }],
                {
                  cancelable: false,
                },
              );
            }
          });
      } else {
        signInWithPhoneNumber(userValidPhoneNumber);
      }
    } else {
      Alert.alert(
        '',
        IMLocalized('Please enter a valid phone number.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
    }
  };

  const onPressFlag = () => {
    setCountryModalVisible(true);
  };

  const onPressCancelContryModalPicker = () => {
    setCountryModalVisible(false);
  };

  const onFinishCheckingCode = (newCode) => {
    setLoading(true);

    if (isSigningUp) {
      signUpWithPhoneNumber(newCode);
    } else {
      authManager.loginWithSMSCode(newCode, verificationId).then((response) => {
        if (response.error) {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            { cancelable: false },
          );
        } else {
          const user = response.user;
          props.setUserData({ user });
          props.navigation.navigate('MainStack', { user: user });
        }
        setLoading(false);
      });
    }
  };

  const phoneInputRender = () => {
    return (
      <>
        <PhoneInput
          style={styles.InputContainer}
          flagStyle={styles.flagStyle}
          textStyle={styles.phoneInputTextStyle}
          ref={phoneRef}
          onPressFlag={onPressFlag}
          offset={10}
          allowZeroAfterCountryCode
          textProps={{
            placeholder: IMLocalized('Phone number'),
            placeholderTextColor: '#aaaaaa',
          }}
        />
        {countriesPickerData && (
          <CountriesModalPicker
            data={countriesPickerData}
            appStyles={appStyles}
            onChange={(country) => {
              selectCountry(country);
            }}
            cancelText={IMLocalized('Cancel')}
            visible={countryModalVisible}
            onCancel={onPressCancelContryModalPicker}
          />
        )}
        <Button
          containerStyle={styles.sendContainer}
          style={styles.sendText}
          gradientColors={appStyles.buttonSet[colorScheme].colors}
          onPress={() => onPressSend()}>
          {IMLocalized('Send code')}
        </Button>
      </>
    );
  };

  const codeInputRender = () => {
    return (
      <>
        <CodeField
          ref={myCodeInput}
          inputPosition="full-width"
          variant="border-b"
          codeLength={6}
          size={50}
          space={10}
          keyboardType="numeric"
          cellProps={{ style: styles.input }}
          containerProps={{ style: styles.codeFieldContainer }}
          onFulfill={onFinishCheckingCode}
        />
      </>
    );
  };

  const selectCountry = (country) => {
    phoneRef.current.selectCountry(country.iso2);
  };

  const renderAsSignUpState = () => {
    return (
      <View style={{ marginTop: 10 }}>
        {/* <Text style={styles.title}>{IMLocalized('Create new account')}</Text> */}
        <TNProfilePictureSelector
          setProfilePictureURL={setProfilePictureURL}
          appStyles={appStyles}
        />

        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('First Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('Last Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        {isPhoneVisible ? phoneInputRender() : codeInputRender()}
        <View style={styles.goToLinkContainer}>
          <Text style={styles.goToLinkText}>
            {IMLocalized('Already have an account? ')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              appConfig.isSMSAuthEnabled
                ? props.navigation.navigate('Sms', {
                    isSigningUp: false,
                    appStyles,
                    appConfig,
                  })
                : props.navigation.navigate('Login', {
                    appStyles,
                    appConfig,
                  })
            }>
            <Text
              style={[
                styles.goToLinkText,
                { color: appStyles.colorSet[colorScheme].mainTextColor },
              ]}>
              {IMLocalized('Sign In')}
            </Text>
          </TouchableOpacity>
        </View>
        {/*renderSocialIcons()*/}

{/*        <View
          style={[
            styles.goToLinkContainer,
            { marginBottom: isSigningUp ? 0 : 30 },
          ]}>
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
          <Text style={styles.goToLinkText}>{IMLocalized(' with Email')}</Text>
        </View>*/}
      </View>
    );
  };

  const renderSocialIcons = () => {
    return (
      <React.Fragment>
        <View style={styles.separator}>
          <View style={[styles.separatorLine]} />
          <Text style={styles.separatorText}>{IMLocalized('OR')}</Text>
          <View style={[styles.separatorLine]} />
        </View>
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
            gradientColors={appStyles.socialIconSet[colorScheme]['google-plus']}
            containerStyle={styles.socialIconContainer}>
            <Icon name="google-plus" color="#fff" size={20}></Icon>
          </SocialIcon>
        </View>
      </React.Fragment>
    );
  };

  const renderAsLoginState = () => {
    return (
      <>
        <Logo appStyles={appStyles} appConfig={appConfig} />
        {isPhoneVisible ? phoneInputRender() : codeInputRender()}
        <View style={styles.goToLinkContainer}>
          <Text style={styles.goToLinkText}>
            {IMLocalized("Don't have an account? ")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              appConfig.isSMSAuthEnabled
                ? props.navigation.navigate('Sms', {
                    isSigningUp: true,
                    appStyles,
                    appConfig,
                  })
                : props.navigation.navigate('Signup', {
                    appStyles,
                    appConfig,
                  })
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
        {/*renderSocialIcons()*/}
{/*        <View style={[styles.goToLinkContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Login', { appStyles, appConfig })
            }>
            <Text
              style={[
                styles.goToLinkText,
                { color: appStyles.colorSet[colorScheme].mainTextColor },
              ]}>
              {IMLocalized('Sign in')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.goToLinkText}>{IMLocalized(' with Email')}</Text>
        </View>*/}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={appStyles.styleSet[colorScheme].backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>

        {isSigningUp ? renderAsSignUpState() : renderAsLoginState()}

        {isSigningUp && (
          <TermsOfUseView
            tosLink={appConfig.tosLink}
            style={styles.tos}
            textStyle={styles.tosText}
            linkStyle={styles.tosLink}
          />
        )}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData,
})(SmsAuthenticationScreen);
